import { BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { WalletProvider } from './context/WalletContext';
import { NFTProvider } from './context/NFTContext';

function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <NFTProvider>
          <Router>
            <Layout>
              <AnimatePresence mode="wait">
                <AppRoutes />
              </AnimatePresence>
            </Layout>
          </Router>
        </NFTProvider>
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;