import React, { useEffect, useState } from 'react';
import { getTradeList } from '@/app/api/trades';


const TradeList = () => {
  const [trades, setTrades] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await getTradeList();
      if (!response.ok) {
        throw new Error('Error fetching trades');
      }
      const data = await response.json();
      setTrades(data);
    } catch (error) {
      setError('Error fetching trades from the server. Try loging in first!');
    }
  };

  return (
    <div className="trade-list-container">
      <h2 className="trade-list-title">Trade List</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="trade-list w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-left w-1/9">Ticket</th>
              <th className="py-2 px-4 border-b text-left w-2/9">Currency Pair</th>
              <th className="py-2 px-4 border-b text-left w-1/9">Type</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Open DateTime</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Close DateTime</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Open Price</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Take Profit</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Stop Loss</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Close Price</th>
              <th className="py-2 px-4 border-b text-right w-1/9">Volume</th>
              <th className="py-2 px-4 border-b text-right w-1/9">PnL</th>
            </tr>
          </thead>
          <tbody>
            {trades.length > 0 ? (
              trades.map((trade, index) => (
                <tr className="trade-list-item" key={index}>
                  <td className="py-2 px-4 border-b text-left w-1/9">{trade.ticket}</td>
                  <td className="py-2 px-4 border-b text-left w-2/9">{trade.currency_pair}</td>
                  <td className="py-2 px-4 border-b text-left w-1/9">{trade.type === "S" ? "Short" : "Long"}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.open_datetime}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.close_datetime}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.open_price}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.take_profit}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.stop_loss}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.close_price}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.volume}</td>
                  <td className="py-2 px-4 border-b text-right w-1/9">{trade.pnl}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-trades-message py-2 px-4 text-center">
                  No trades found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TradeList;