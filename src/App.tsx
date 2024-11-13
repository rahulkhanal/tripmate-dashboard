import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import AppShellLayout from "./layout/AppShell"
import Properties from "./pages/Properties"
import Booking from "./pages/Booking"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import EachProperty from "./pages/EachProperty"
import PropertyLogin from "./pages/PropertyLogin"
import OwnerAppShellLayout from "./layout/PwnerAppShell"
import UserSetting from "./pages/UserSetting"
import { Notifications } from "@mantine/notifications"
import Amenities from "./pages/Amenities"
import RatingPage from "./pages/Rating"

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <Notifications/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QueryClientProvider client={queryClient}><Login /></QueryClientProvider>} />
          <Route path="/loginaspropertyowner" element={<QueryClientProvider client={queryClient}><PropertyLogin /></QueryClientProvider>} />
          <Route path="/dashboard" element={<QueryClientProvider client={queryClient}><AppShellLayout /></QueryClientProvider>}>
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<EachProperty />} />
            <Route path="booking" element={<Booking />} />
            <Route path="user-setting" element={<UserSetting />} />
          </Route>
          <Route path="/property" element={<QueryClientProvider client={queryClient}><OwnerAppShellLayout /></QueryClientProvider>}>
            <Route path="booking" element={<Booking />} />
            <Route path="user-setting" element={<UserSetting />} />
            <Route path="amenety" element={<Amenities />} />
            <Route path="rating" element={<RatingPage />} />
          </Route>
          <Route path="*" element={<h1>404 Error</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
