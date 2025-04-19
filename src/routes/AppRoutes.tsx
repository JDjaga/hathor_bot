import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import MyTickets from '../pages/MyTickets';
import WalletConnect from '../pages/WalletConnect';
import WalletVerification from '../pages/WalletVerification';
import WalletDashboard from '../pages/WalletDashboard';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';
import Visualization from '../pages/Visualization';

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/tickets" element={<MyTickets />} />
      <Route path="/visualization" element={<Visualization />} />
      <Route path="/wallet" element={<WalletConnect />} />
      <Route path="/wallet/verify/:walletType" element={<WalletVerification />} />
      <Route path="/wallet/dashboard" element={<WalletDashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;