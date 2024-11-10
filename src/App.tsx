import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AppShellLayout from "./layout/AppShell"
import Properties from "./pages/Properties"
import Booking from "./pages/Booking"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import EachProperty from "./pages/EachProperty"

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<QueryClientProvider client={queryClient}><AppShellLayout /></QueryClientProvider>}>
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<EachProperty />} />
            <Route path="booking" element={<Booking />} />
            <Route path="*" element={<h1>404 Error</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
