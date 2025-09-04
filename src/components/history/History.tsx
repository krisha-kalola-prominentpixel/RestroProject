import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../DataStorage/Store";

function History() {
  const finishedOrders = useSelector(
    (state: RootState) => state.orders.finishedOrders
  );

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">History Panel</h2>

      {finishedOrders.length === 0 ? (
        <p className="text-amber-700">No history yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {finishedOrders.map((o, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                Table {o.tableId}
              </h3>
              <p className="text-amber-700 mb-2">
                Date: <span className="font-medium">{o.date}</span>
              </p>
              <p className="text-amber-800 font-bold mb-2">
                Total: ₹{o.total}
              </p>
              <ul className="text-amber-700 list-disc list-inside space-y-1">
                {o.items.map((item, idx) => (
                  <li key={idx}>
                    {item.dishName} × {item.qty} = ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
