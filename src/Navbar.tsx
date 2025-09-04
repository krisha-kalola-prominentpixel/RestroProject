import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <nav className="bg-amber-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-2xl font-bold tracking-wider">RestroPortal</div>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="admin"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "hover:underline hover:text-amber-300 transition-colors"
                }
              >
                Admin
              </NavLink>
            </li>
            <li>
              <NavLink
                to="staff"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "hover:underline hover:text-amber-300 transition-colors"
                }
              >
                Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="history"
                className={({ isActive }) =>
                  isActive
                    ? "underline font-semibold"
                    : "hover:underline hover:text-amber-300 transition-colors"
                }
              >
                History
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
