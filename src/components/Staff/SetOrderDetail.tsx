import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../DataStorage/Store";
import {
  addOrder,
  increaseQty,
  decreaseQty,
  finishOrder,
} from "../../DataStorage/OrderSlice";
import jsPDF from "jspdf";

function SetOrderDetails() {
  const dispatch = useDispatch();
  const tables = useSelector((state: RootState) => state.tables.savedTables) || 0;
  const menu = useSelector((state: RootState) => state.menu.menu);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const finishedOrders = useSelector(
    (state: RootState) => state.orders.finishedOrders
  );

  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  const handleAddOrder = (dish: any) => {
    if (selectedTable) dispatch(addOrder({ tableId: selectedTable, dish }));
  };

  const handleDownloadInvoice = (order: any) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Invoice - Table ${order.tableId}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 20, 30);
    // let inr='₹'
    let y = 50;
    order.items.forEach((item: any, index: number) => {
      doc.text(
        `${index + 1}. ${item.dishName} x ${item.qty} = Rs. ${item.price * item.qty}`,
        20,
        y
      );
      y += 10;
    });

    doc.text(`--------------------------`, 20, y);
    y += 10;
    doc.text(`Total: Rs. ${order.total}`, 20, y);

    doc.save(`invoice_table_${order.tableId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Staff Panel</h2>

      <div className="mb-6 flex items-center gap-4">
        <label className="text-lg font-semibold text-amber-800">Select Table:</label>
        <select
          value={selectedTable || ""}
          onChange={(e) => setSelectedTable(Number(e.target.value))}
          className="p-2 rounded-lg bg-amber-100 border border-amber-400 focus:ring-2 focus:ring-amber-300"
        >
          <option value="">-- Select Table --</option>
          {Array.from({ length: tables }, (_, i) => i + 1).map((tableId) => (
            <option key={tableId} value={tableId}>
              Table {tableId}
            </option>
          ))}
        </select>
      </div>

      {selectedTable && (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-amber-100 p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">Menu</h3>
            <ul className="space-y-2">
              {menu.map((dish) => (
                <li
                  key={dish.id}
                  className="flex justify-between items-center p-2 bg-amber-200 rounded-lg hover:bg-amber-300 transition"
                >
                  <span>{dish.dishName} - ₹{dish.price}</span>
                  <button
                    onClick={() => handleAddOrder(dish)}
                    className="bg-amber-800 text-amber-50 px-3 py-1 rounded-lg hover:bg-amber-900 transition"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 bg-amber-100 p-4 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Orders for Table {selectedTable}
            </h3>
            <ul className="space-y-2">
              {(orders[selectedTable] || []).map((o) => (
                <li
                  key={o.id}
                  className="flex justify-between items-center p-2 bg-amber-200 rounded-lg hover:bg-amber-300 transition"
                >
                  <span>{o.dishName} - ₹{o.price} × {o.qty}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQty({ tableId: selectedTable, dishId: o.id })
                        )
                      }
                      className="bg-green-600 px-2 py-1 rounded hover:bg-green-700 text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQty({ tableId: selectedTable, dishId: o.id })
                        )
                      }
                      className="bg-red-600 px-2 py-1 rounded hover:bg-red-700 text-white"
                    >
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-bold text-amber-900">
              Total: ₹{(orders[selectedTable] || []).reduce((sum, item) => sum + item.price * item.qty, 0)}
            </p>
            <button
              onClick={() => dispatch(finishOrder(selectedTable))}
              className="mt-3 bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 rounded-lg shadow"
            >
              Finish Order
            </button>
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-amber-900 mb-3">Finished Orders</h3>
        <ul className="space-y-2">
          {finishedOrders.map((order, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center p-3 bg-amber-200 rounded-lg shadow hover:bg-amber-300 transition"
            >
              <span>
                Table {order.tableId} | Total: ₹{order.total} | {order.date}
              </span>
              <button
                onClick={() => handleDownloadInvoice(order)}
                className="bg-amber-900 px-3 py-1 rounded hover:bg-amber-800 text-white"
              >
                Download Invoice
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SetOrderDetails;
