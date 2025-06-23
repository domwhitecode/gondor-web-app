import React, { useState, useEffect } from 'react';
import { ChevronLeft, Info, X, Check } from 'lucide-react';
import { ethers } from 'ethers';

export default function BorrowPage() {
  const [depositAmount, setDepositAmount] = useState('5401');
  const [borrowAmount, setBorrowAmount] = useState('200.16');
  const [selectedOption, setSelectedOption] = useState('NO');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [depositFocused, setDepositFocused] = useState(false);
  const [borrowFocused, setBorrowFocused] = useState(false);

  // Calculate LTV dynamically
  const calculateLTV = () => {
    const deposit = parseFloat(depositAmount) || 0;
    const borrow = parseFloat(borrowAmount) || 0;
    if (deposit === 0) return 0;
    return (borrow / deposit) * 100;
  };

  const ltvValue = calculateLTV();

  const handleLtvChange = (e) => {
    // When user moves the slider, update the borrow amount based on the new LTV
    const newLTV = parseFloat(e.target.value);
    const deposit = parseFloat(depositAmount) || 0;
    const newBorrowAmount = (deposit * newLTV) / 100;
    setBorrowAmount(newBorrowAmount.toFixed(2));
  };

  useEffect(() => {
    // Check if wallet is already connected on component mount
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      if (accounts.length > 0) {
        setWalletConnected(true);
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      if (error.code === 4001) {
        alert('Please connect your MetaMask wallet to continue.');
      } else {
        alert('Error connecting wallet. Please try again.');
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleAmountChange = (e) => {
    // Only allow numbers and remove any non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setDepositAmount(numericValue);
  };

  const handleBorrowAmountChange = (e) => {
    // Only allow numbers and remove any non-numeric characters
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    setBorrowAmount(numericValue);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-gray-900">Gondor°</h1>
            <div className="flex items-center space-x-6">
              <span className="text-gray-600">I want to...</span>
              <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
                Lend
              </button>
              <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                Borrow
              </button>
            </div>
          </div>
          <button 
            onClick={walletConnected ? disconnectWallet : connectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-medium shadow-md transition-transform transform hover:scale-105"
          >
            {isConnecting ? 'Connecting...' : walletConnected ? formatAddress(walletAddress) : 'Connect wallet'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <button className="flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to pools
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-4">Pool info</h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">📉</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">US recession in 2025?</h3>
            </div>
            
            <div className="flex items-center divide-x divide-gray-200">
              <div className="text-center pr-6">
                <div className="text-sm text-gray-500 mb-1">Total supply</div>
                <div className="text-2xl font-bold text-gray-900">$2.03M</div>
              </div>
              <div className="text-center px-6">
                <div className="text-sm text-gray-500 mb-1">Total borrowed</div>
                <div className="text-2xl font-bold text-gray-900">$0.97M</div>
              </div>
              <div className="text-center px-6">
                <div className="text-sm text-gray-500 mb-1 flex items-center justify-center">
                  Borrow rate <Info className="w-3 h-3 ml-1 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.98%</div>
              </div>
              <div className="text-center pl-6">
                <div className="text-sm text-gray-500 mb-1">Share price</div>
                <div className="text-2xl font-bold text-gray-900">¢67</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deposit and Borrow Section */}
          <div>
            <div className="flex space-x-4 mb-8">
              {/* Deposit Card */}
              <div className={`flex-1 bg-white rounded-xl shadow-sm border p-6 ${depositFocused ? 'border-blue-500' : 'border-gray-200'}`}>
                <div className="flex items-center mb-3">
                  <span className="text-sm font-medium text-gray-700">Deposit collateral</span>
                  <Info className="w-4 h-4 ml-2 text-gray-400" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 pr-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOption === 'YES' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {selectedOption === 'YES' ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                    </div>
                    <select 
                      value={selectedOption} 
                      onChange={handleOptionChange}
                      className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 appearance-none"
                    >
                      <option value="NO">NO</option>
                      <option value="YES">YES</option>
                    </select>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">$</span>
                      <input
                        type="text"
                        value={depositAmount}
                        onChange={handleAmountChange}
                        onFocus={() => setDepositFocused(true)}
                        onBlur={() => setDepositFocused(false)}
                        className="text-2xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 text-right w-20 ml-1"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-right">25.32 / 2,600 shares</div>
              </div>

              {/* Borrow Card */}
              <div className={`flex-1 bg-white rounded-xl shadow-sm border p-6 ${borrowFocused ? 'border-blue-500' : 'border-gray-200'}`}>
                <div className="text-sm font-medium text-gray-700 mb-3">Borrow</div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1 pr-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">T</span>
                    </div>
                    <span className="font-medium text-gray-700">USDT</span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-gray-900">$</span>
                      <input
                        type="text"
                        value={borrowAmount}
                        onChange={handleBorrowAmountChange}
                        onFocus={() => setBorrowFocused(true)}
                        onBlur={() => setBorrowFocused(false)}
                        className="text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 text-right w-16 ml-1"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-right">$ 199.22</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-end space-x-6">
                <div className="flex-1">
                  {/* LTV Slider */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-semibold text-gray-900">Loan to Value (LTV)</span>
                    <span className="text-2xl font-bold text-gray-900">{ltvValue.toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>Ratio of the collateral value to the borrowed value</span>
                    <span>max. 82.00%</span>
                  </div>

                  <div className="relative h-8">
                    {/* Segmented Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center h-3">
                      <div className="flex-1 h-full bg-gray-200 rounded-l-full"></div>
                      <div className="w-1.5 h-full"></div> {/* Gap */}
                      <div className="flex-1 h-full bg-gray-200"></div>
                      <div className="w-1.5 h-full"></div> {/* Gap */}
                      <div className="flex-1 h-full bg-gray-200 rounded-r-full"></div>
                    </div>

                    {/* Progress Fill */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-3 bg-blue-500 rounded-full"
                      style={{ width: `${(Math.min(ltvValue, 82) / 82) * 100}%` }}
                    ></div>
                    
                    {/* Liquidation Marker */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-px h-5 bg-blue-400"
                      style={{ left: '82%' }}
                    />

                    <input
                      type="range"
                      min="0"
                      max="82"
                      step="0.01"
                      value={Math.min(ltvValue, 82)}
                      onChange={handleLtvChange}
                      className="w-full h-full absolute top-0 left-0 appearance-none bg-transparent cursor-pointer slider"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Conservative</span>
                    <span>Moderate</span>
                    <div className="flex flex-col items-end">
                      <span>Aggressive</span>
                      <span className="text-blue-600 font-medium">82.00% Liquidation</span>
                    </div>
                  </div>
                </div>

                <button className="w-48 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-3 rounded-full font-medium shadow-md transition-transform transform hover:scale-105">
                  Borrow
                </button>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Overview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Liquidation price</span>
                <span className="font-medium text-gray-900">¢45</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Liquidation LTV</span>
                <span className="font-medium text-gray-900">50%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Current LTV</span>
                <span className="font-medium text-gray-900">33.02%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Current loan</span>
                <span className="font-medium text-gray-900">$ 552.75</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Health rate</span>
                <span className="font-medium text-green-600">3.74</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: black;
          background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 0.5 L8 15.5 M0.5 8 L15.5 8" stroke="white" stroke-width="1.5" /><path d="M2.92 2.92 L13.08 13.08 M2.92 13.08 L13.08 2.92" stroke="white" stroke-width="1.5" /></svg>');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
          cursor: pointer;
          margin-top: -1px;
          position: relative;
          z-index: 10;
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: black;
          background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 0.5 L8 15.5 M0.5 8 L15.5 8" stroke="white" stroke-width="1.5" /><path d="M2.92 2.92 L13.08 13.08 M2.92 13.08 L13.08 2.92" stroke="white" stroke-width="1.5" /></svg>');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 14px 14px;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}