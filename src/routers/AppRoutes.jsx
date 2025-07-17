import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AccountPage from '../pages/AccountPage';
import DownloadPage from '../pages/DownloadPage';
import PostDetail from '../pages/PostDetail';
import RankingPage from '../pages/RankingPage';
import RechargePage from '../pages/RechargePage';
import GiftCodePage from '../pages/GiftCodePage';

// Admin imports
import AdminLayout from '../admin/AdminLayout';
import Dashboard from '../admin/Dashboard';
import Users from '../admin/Users';
import Characters from '../admin/Characters';
import Recharge from '../admin/Recharge';
import GiftCodes from '../admin/GiftCodes';
import Posts from '../admin/Posts';
import Downloads from '../admin/Downloads';
import Rankings from '../admin/Rankings';
import Transactions from '../admin/Transactions';
import Settings from '../admin/Settings';

const AppRoutes = () => (
    <Routes>
        {/* User routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/:id" element={<AccountPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/giftcode" element={<GiftCodePage />} />

        {/* Admin routes */}
        <Route
            path="/admin"
            element={
                <AdminRoute>
                    <AdminLayout />
                </AdminRoute>
            }
        >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="characters" element={<Characters />} />
            <Route path="recharge" element={<Recharge />} />
            <Route path="giftcodes" element={<GiftCodes />} />
            <Route path="posts" element={<Posts />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="settings" element={<Settings />} />
        </Route>
    </Routes>
);