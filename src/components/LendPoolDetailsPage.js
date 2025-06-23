import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import bscLogo from '../bnb-chain-binance-smart-chain-logo.png';
import Jazzicon from 'react-jazzicon';

export default function LendPoolDetailsPage() {
  const navigate = useNavigate();
  const { poolId } = useParams();
  // Placeholder values for demonstration
  const walletAddress = '0x87d0...B005';
  const walletBalance = 2035.66;
  const [depositAmount, setDepositAmount] = useState('');
  const depositValue = 199.22;
  const apy = 6.92;
  const projectedEarnings = 13.84;

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <button onClick={() => navigate('/lend')} className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <span className="w-4 h-4 mr-1">&#8592;</span>
          Back to pools
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Pool info: {decodeURIComponent(poolId)}</h2>
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{decodeURIComponent(poolId)}</h3>
            </div>
            <div className="flex items-center divide-x divide-gray-200">
              <div className="text-center pr-6">
                <div className="text-sm text-gray-500 mb-1">Total supply</div>
                <div className="text-2xl font-bold text-gray-900">$2.03M</div>
              </div>
              <div className="text-center px-6">
                <div className="text-sm text-gray-500 mb-1">Supply APY</div>
                <div className="text-2xl font-bold text-gray-900">6.92%</div>
              </div>
              <div className="text-center pl-6">
                <div className="text-sm text-gray-500 mb-1">Utilization rate</div>
                <div className="text-2xl font-bold text-gray-900">88.89%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Lend & Earn Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Lend & Earn</h3>
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              {/* Wallet balance */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-700 font-medium">Your wallet balance</span>
                <span className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-base font-medium">
                  <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-sm font-bold">T</span>
                  </span>
                  {walletBalance}
                </span>
              </div>
              {/* Deposit card */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 pr-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <span className="font-medium text-gray-700">USDT</span>
                  </div>
                  <div className="text-right flex items-center">
                    <span className="text-2xl font-bold text-gray-900">$</span>
                    <input
                      type="text"
                      value={depositAmount}
                      onChange={e => setDepositAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 text-right w-24 ml-1"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                {/* Percentage buttons */}
                <div className="flex space-x-2 mt-4">
                  {['25%', '50%', '75%', 'MAX'].map((label) => (
                    <button
                      key={label}
                      className="flex-1 bg-blue-100 text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-200 transition"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Deposit stats */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">Deposit value</span>
                  <span className="font-medium text-gray-900">${depositValue}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500">APY</span>
                  <span className="font-medium text-gray-900">{apy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Projected Earnings / Year (USD)</span>
                  <span className="font-medium text-gray-900">{projectedEarnings}</span>
                </div>
              </div>
              <button className="w-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-full font-medium shadow-md transition-transform transform hover:scale-105">
                Deposit
              </button>
            </div>
          </div>

          {/* Supply Overview Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Supply overview</h3>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Total supply</div>
                  <div className="text-2xl font-bold text-gray-900">$2.03M</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Total borrowed</div>
                  <div className="text-2xl font-bold text-gray-900">6.92%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Available liquidity</div>
                  <div className="text-2xl font-bold text-gray-900">88.89%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Borrow APR</div>
                  <div className="text-2xl font-bold text-gray-900">8.89%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Liquidation penalty</div>
                  <div className="text-2xl font-bold text-gray-900">88.89%</div>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-gray-900">Supply APY</span>
                  <span className="text-2xl font-bold text-gray-900">6.92%</span>
                </div>
                {/* Chart placeholder */}
                <div className="bg-blue-50 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-blue-400 font-medium">[Chart Placeholder]</span>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button className="px-4 py-1 rounded-lg bg-blue-100 text-blue-600 font-medium">1 week</button>
                  <button className="px-4 py-1 rounded-lg bg-blue-100 text-blue-600 font-medium">1 month</button>
                  <button className="px-4 py-1 rounded-lg bg-blue-500 text-white font-medium">1 year</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 