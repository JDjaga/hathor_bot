import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import MyTickets from '../pages/MyTickets';
import WalletConnect from '../pages/WalletConnect';
import WalletVerification from '../pages/WalletVerification';
import WalletDashboard from '../pages/WalletDashboard';
import Settings from '../pages/Settings';
import Community from '../pages/Community';
import Gaming from '../pages/Gaming';
import Governance from '../pages/Governance';
import NotFound from '../pages/NotFound';
import Visualization from '../pages/Visualization';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/tickets" element={<MyTickets />} />
      <Route path="/wallet" element={<WalletConnect />} />
      <Route path="/wallet/verify/:walletType" element={<WalletVerification />} />
      <Route path="/wallet/dashboard" element={<WalletDashboard />} />
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/community" element={<Community />} />
      <Route path="/gaming" element={<Gaming />} />
      <Route path="/governance" element={<Governance />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;