import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AppShellLayout from "./layout/AppShell"
import Properties from "./pages/Properties"
import Booking from "./pages/Booking"

function App() {
  return (
    <>
      {/* Routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<AppShellLayout />} >
            <Route path="properties" element={<Properties />} />
            <Route path="booking" element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
