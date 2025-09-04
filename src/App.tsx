import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Admin from './components/admin/Admin'
import SetOrderDetails from './components/Staff/SetOrderDetail'
import History from './components/history/History'
import Navbar from './Navbar'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navbar />,
    children: [
      { path: 'admin', element: <Admin /> },
      { path: 'staff', element: <SetOrderDetails /> },
      { path: 'history', element: <History /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
