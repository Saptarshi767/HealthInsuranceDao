import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ConnectWalletProvider } from './components/ConnectWallet';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import VotingPage from './pages/voting';
import FilingPage from './pages/filing';
import FeedPage from './pages/feed';
import ConnectPage from './pages/connect';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ConnectWalletProvider>
      <Router>
        <Layout>          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/voting" element={<VotingPage />} />
            <Route path="/login" element={<FilingPage />} />
            <Route path="/filing" element={<FilingPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ConnectWalletProvider>
  );
}

export default App;
