import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../DataStorage/Store";
import { setTables, saveTables, resetTables } from "../../DataStorage/TabelSlice";
import { addDish, editDish, removeDish } from "../../DataStorage/MenuSlice";

function AdminPage() {
  const dispatch = useDispatch();
  const tables = useSelector((state: RootState) => state.tables.tables);
  const savedTables = useSelector((state: RootState) => state.tables.savedTables);
  const menu = useSelector((state: RootState) => state.menu.menu);

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Starters");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddDish = () => {
    if (!dishName || !price) return;

    if (editingId !== null) {
      dispatch(
        editDish({
          id: editingId,
          updatedDish: { dishName, description, price: parseFloat(price), category, available: true },
        })
      );
      setEditingId(null);
    } else {
      dispatch(addDish({ dishName, description, price, category, available: true }));
    }

    setDishName("");
    setDescription("");
    setPrice("");
    setCategory("Starters");
  };

  const handleEdit = (dish: any) => {
    setDishName(dish.dishName);
    setDescription(dish.description);
    setPrice(dish.price.toString());
    setCategory(dish.category);
    setEditingId(dish.id);
  };

  const handleDelete = (id: number | null) => {
    dispatch(removeDish(id));
  };

  const handleEditCancel=()=>{
    setDishName("");
    setDescription("");
    setPrice("");
    setCategory("Starters");
    setEditingId(null)
  }

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h2 className="text-3xl font-bold text-amber-900 mb-6">Admin Panel</h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">Set Tables</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={tables}
            onChange={(e) => dispatch(setTables(e.target.value))}
            className="border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Number of Tables"
          />
          <button
            onClick={() => dispatch(saveTables())}
            className="px-4 py-2 bg-amber-900 text-white rounded hover:bg-amber-700 transition"
          >
            Save Tables
          </button>
          <button
            onClick={() => dispatch(resetTables())}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
          >
            Reset
          </button>
        </div>
        {savedTables !== null && (
          <p className="mt-2 text-amber-700 font-medium">Saved tables: {savedTables}</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">
          {editingId !== null ? "Edit Dish" : "Add Dish"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Dish Name"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-amber-300 rounded px-3 py-2 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-amber-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option>Starters</option>
            <option>Main Course</option>
            <option>Desserts</option>
            <option>Drinks</option>
          </select>
        </div>
        <button
          onClick={handleAddDish}
          className="mt-4 px-6 py-2 bg-amber-900 text-white rounded hover:bg-amber-700 transition"
        >
          {editingId !== null ? "Update Dish" : "Add Dish"}
        </button>

        <button onClick={handleEditCancel}
        style={editingId?{display:"block"}:{display:"none"}}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition">
            Cancel
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-amber-800 mb-4">Menu</h3>
        {menu.length === 0 ? (
          <p className="text-amber-700">No dishes yet</p>
        ) : (
          <ul className="space-y-2">
            {menu.map((dish) => (
              <li
                key={dish.id}
                className="flex justify-between items-center p-3 bg-amber-100 rounded-lg shadow hover:bg-amber-200 transition"
              >
                <div>
                  <p className="font-semibold text-amber-900">{dish.dishName}</p>
                  <p className="text-amber-700">{dish.description}</p>
                  <p className="text-amber-800 font-medium">₹{dish.price} ({dish.category})</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(dish)}
                    className="px-3 py-1 bg-amber-900 text-white rounded hover:bg-amber-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    style={!editingId?{display:"block"}:{display:"none"}}
                    onClick={() => handleDelete(dish.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
