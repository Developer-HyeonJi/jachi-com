import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import BudgetPage from './pages/BudgetPage'
import ShoppingPage from './pages/ShoppingPage'
import SchedulePage from './pages/SchedulePage'
import CommunityPage from './pages/CommunityPage'
import EmergencyPage from './pages/EmergencyPage'
import ItemsPage from './pages/ItemsPage'
import CalendarPage from './pages/CalendarPage'
import ManualPage from './pages/ManualPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'

import './App.css'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/shopping" element={<ShoppingPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/items" element={<ItemsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/manual" element={<ManualPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Layout>
    )
}

export default App
