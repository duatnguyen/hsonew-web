import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import LoginModal from './components/Auth/LoginModal';
import RegisterModal from './components/Auth/RegisterModal';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import DownloadPage from './pages/DownloadPage';
import PostDetail from './pages/PostDetail';
import ageRuleImg from './assets/images/age-rule.jpg';
import RankingPage from './pages/RankingPage';
import RechargePage from './pages/RechargePage';
import GiftCodePage from './pages/GiftCodePage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <div className="background"></div>
          <div className="container">
            <div className="main">
              <Header />
              <Navigation />
              <Routes>
                <Route path="/" element={<Navigate to="/trangchu" replace />} />
                <Route path="/trangchu" element={<HomePage />} />
                <Route path="/account" element={<AccountPage />} />
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
      </Router>
    </AuthProvider>
  );
};

export default App;
