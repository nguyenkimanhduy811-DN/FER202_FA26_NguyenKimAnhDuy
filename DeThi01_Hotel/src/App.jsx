import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RoomProvider } from './context/RoomContext'
import AppNavbar from './components/AppNavbar'
import AppFooter from './components/AppFooter'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoomProvider>
          <div className="d-flex flex-column min-vh-100">
            <AppNavbar />
            <main className="flex-grow-1 container py-4">
              <AppRoutes />
            </main>
            <AppFooter />
          </div>
        </RoomProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
