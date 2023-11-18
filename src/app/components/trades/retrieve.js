import { useState, useEffect } from "react";
import { getTradeDetail, deleteTrade } from "@/app/api/trades";
import { useRouter } from 'next/router';
import Link from "next/link";


const RetrieveTrade = () => {
  const [trade, setTrade] = useState(null);
  const [error, setError] = useState(null);
  const [tradeID, setTradeID] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      setTradeID(router.query.tradeID);
    }
  }, [router.isReady])

  useEffect(() => {
    if (tradeID) {
      fetchTrade(tradeID);
    }
  }, [tradeID])

  // Retrieve Trade
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

  // Delete Trade
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDeleteTrade = async () => {
    const response = await deleteTrade(tradeID);
    if (!response.ok) {
      alert('Trade could not be deleted.')
    } else {
      window.location.href ="/trades";
    }
    handleClose();
  };

  // Rendered Page
  return (
    <div className="trade-container">
      <h2 className="page-title">Trade Details</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="justify-center items-center">
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
          <div className="col-span-2">
            <Link href={`/trades/${tradeID}/edit`}>
              <button type="submit" className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md">
                Edit Trade
              </button>
            </Link>

            <button onClick={handleOpen} className="bg-red-500 text-white font-bold py-2 px-4 rounded">
              Delete Trade
            </button>
            {isOpen && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 bg-white rounded p-4">
                <h2 className="text-lg font-bold">Are you sure you want to delete this trade?</h2>
                <p className="text-sm">This action cannot be undone.</p>

                <div className="flex justify-end mt-4">
                  <button onClick={handleClose} className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">No</button>
                  <button onClick={handleDeleteTrade} className="bg-red-500 text-white font-bold py-2 px-4 rounded">Yes</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RetrieveTrade;
