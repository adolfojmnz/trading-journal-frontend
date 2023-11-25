import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { updateTrade, getTradeDetail } from "@/app/api/trades";
import Link from "next/link";

export default function EditTrade() {
  const [trade, setTrade] = useState(null);
  const [error, setError] = useState(null);
  const [tradeID, setTradeID] = useState(null);

  const router = useRouter();

  const fetchTrade = async (tradeID) => {
    try {
      const response = await getTradeDetail(tradeID);
      if (!response.ok) {
        throw new Error("Trade could not be fetched.");
      } else {
        const tradeData = await response.json();
        setTrade(tradeData);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (router.isReady === true) {
      setTradeID(router.query.tradeID);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (tradeID) {
      fetchTrade(tradeID);
    }
  }, [tradeID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (value === "SHORT") {
      updatedValue = "S";
    } else if (value === "LONG") {
      updatedValue = "L";
    }

    setTrade((prevTradeData) => ({
      ...prevTradeData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async () => {
    const response = await updateTrade(tradeID, trade);

    if (!response.ok) {
      alert("Error updating the trade data.");
    } else {
      window.location.href = `/trades/${tradeID}`;
    }
  };

  if (error) {
    return (
      <div className="fex flex-col justify-center items-center">
        Error fetching the requested trade.
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="fex flex-col justify-center items-center">Loading...</div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-5">Update Trade</h2>
      <form
        method="PATCH"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 w-full max-w-md"
      >
        <div className="mb-2">
          <label className="block font-medium mb-1">Trade Ticket</label>
          <input
            min={1}
            type="number"
            name="ticket"
            onChange={handleChange}
            defaultValue={trade.ticket}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Currency Pair</label>
          <input
            min={1}
            type="number"
            name="currency_pair"
            onChange={handleChange}
            defaultValue={trade.currency_pair}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Position Type</label>
          <select
            name="type"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            defaultValue={trade.type === "S" ? "SHORT" : "LONG"}
          >
            <option>SHORT</option>
            <option>LONG</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Position Volume</label>
          <input
            max={100}
            min={0.01}
            step={0.01}
            type="number"
            name="volume"
            onChange={handleChange}
            defaultValue={trade.volume}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Open DateTime</label>
          <input
            id="open-datetime"
            name="open_datetime"
            type="datetime-local"
            onChange={handleChange}
            defaultValue={trade.open_datetime.replace("Z", "")}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Close DateTime</label>
          <input
            id="close-datetime"
            name="close_datetime"
            type="datetime-local"
            onChange={handleChange}
            defaultValue={trade.close_datetime.replace("Z", "")}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Open Price</label>
          <input
            min={0}
            step={0.00001}
            type="number"
            name="open_price"
            onChange={handleChange}
            defaultValue={trade.open_price}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Take Profit</label>
          <input
            min={0}
            step={0.00001}
            type="number"
            name="take_profit"
            onChange={handleChange}
            defaultValue={trade.take_profit}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Stop Loss</label>
          <input
            min={0}
            step={0.00001}
            type="number"
            name="stop_loss"
            onChange={handleChange}
            defaultValue={trade.stop_loss}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Close Price</label>
          <input
            min={0}
            step={0.00001}
            type="number"
            name="close_price"
            onChange={handleChange}
            defaultValue={trade.close_price}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">PnL</label>
          <input
            name="pnl"
            type="number"
            step={0.01}
            onChange={handleChange}
            defaultValue={trade.pnl}
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
          >
            Save
          </button>{" "}
          <span> </span>
          <Link href={`/trades/${tradeID}`}>
            <button
              type="text"
              className="bg-gray-500 text-white font-medium px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
