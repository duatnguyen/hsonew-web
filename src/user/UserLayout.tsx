// src/user/UserLayout.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import LoginModal from './components/Auth/LoginModal';
import RegisterModal from './components/Auth/RegisterModal';
import ageRuleImg from './assets/images/age-rule.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import DownloadPage from './pages/DownloadPage';
import PostDetail from './pages/PostDetail';
import RankingPage from './pages/RankingPage';
import RechargePage from './pages/RechargePage';
import GiftCodePage from './pages/GiftCodePage';


const UserLayout: React.FC = () => {
    return (
        <div className="app">
            <div className="background"></div>
            <div className="container">
                <div className="main">
                    <Header />
                    <Navigation />

                    {/* Route nội bộ cho User */}
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/account/:id" element={<AccountPage />} />
                        <Route path="/download" element={<DownloadPage />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/ranking" element={<RankingPage />} />
                        <Route path="/recharge" element={<RechargePage />} />
                        <Route path="/giftcode" element={<GiftCodePage />} />
                    </Routes>

                    <footer className="footer">
                        <div className="age-rule">
                            <img src={ageRuleImg} alt="Age Rule" height="12" />
                            <span>
                                Trò chơi dành cho người chơi 12 tuổi trở lên. Chơi quá 180 phút mỗi ngày sẽ có hại cho sức khỏe
                            </span>
                        </div>
                    </footer>
                </div>
            </div>
            <LoginModal />
            <RegisterModal />
        </div>
    );
};

export default UserLayout;
