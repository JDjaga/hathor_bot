import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { Activity, TrendingUp } from 'lucide-react';

interface TransactionData {
  timestamp: string;
  value: number;
  type: string;
}

const Visualization = () => {
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [purchaseData, setPurchaseData] = useState<TransactionData[]>([]);

  useEffect(() => {
    // Simulated WebSocket connection for real-time data
    const interval = setInterval(() => {
      // Simulate new transaction data
      const newTransaction = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.random() * 1000,
        type: Math.random() > 0.5 ? 'buy' : 'sell'
      };

      // Simulate new purchase data
      const newPurchase = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.random() * 500,
        type: 'purchase'
      };

      setTransactionData(prev => [...prev.slice(-20), newTransaction]);
      setPurchaseData(prev => [...prev.slice(-20), newPurchase]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics Visualization</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Real-time transaction and purchase analytics
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transaction Volume Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-6">
            <Activity className="text-purple-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Transaction Volume</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={transactionData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={2}
                  animationDuration={1000}
                  animationBegin={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Purchase Trends Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center mb-6">
            <TrendingUp className="text-green-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Purchase Trends</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchaseData}>
                <defs>
                  <linearGradient id="colorPurchase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip
                  cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  fill="url(#colorPurchase)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationBegin={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Visualization;