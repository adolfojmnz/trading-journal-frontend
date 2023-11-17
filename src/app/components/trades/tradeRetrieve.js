import { useState, useEffect } from "react";
import { getTradeDetail } from "@/app/api/trades";
import { useRouter } from 'next/router';


const TradeRetrieveDetails = () => {
  const router = useRouter();
  const [trade, setTrade] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.query.tradeID) {
      return;
    }
    fetchTrade(router.query.tradeID);
  }, []);

  const fetchTrade = async (tradeID) => {
    try {
      const response = await getTradeDetail(tradeID);
      if (!response.ok) {
        throw new Error('Error fetching trade details');
      }
      const data = await response.json()
      setTrade(data);
    } catch (error) {
      setError('Error fetching trade details. You might need to log in first!')
    }
  };

  return (
    <div className="trade-container">
      <h2 className="page-title">Trade Details</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="trade-details-table w-full border-collapse">
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
            {trade !== null ? (
              <tr className="trade-item" key={trade.id}>
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
            ) : (
              <tr>
                <td colSpan="9" className="no-found-message py-2 px-4 text-center">
                  Trade not found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TradeRetrieveDetails;
