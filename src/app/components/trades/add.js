import { useState, useEffect } from "react";

import { addTrade } from "@/app/api/trades";
import { getAssetList } from "@/app/api/assets";
import { getCurrentUser } from "@/app/api/accounts";

const AddTrade = () => {
  const [trade, setTrade] = useState(null);
  const [assetList, setAssetList] = useState([]);
  const [assetListError, setAssetListError] = useState(null);

  const fetchAssetList = async () => {
    const response = await getAssetList({});
    if (response.ok) {
      const data = await response.json();
      setAssetList(data);
      if (data.length === 0) {
        setAssetListError("No assets found!");
      }
    } else {
      const response_error = response.status;
      setAssetListError({ Error: response_error });
    }
  };

  useEffect(() => {
    if (assetList.length === 0 && assetListError === null) {
      fetchAssetList();
    }

    const getCurrentUserID = async () => {
      const currentUserResponse = await getCurrentUser();
      const currenUserData = await currentUserResponse.json();
      setTrade((prevTradeData) => ({
        ...prevTradeData,
        user: currenUserData.id,
      }));
    };
    getCurrentUserID();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (value === "SHORT") {
      updatedValue = "S";
    } else if (value === "LONG") {
      updatedValue = "L";
    } else if (value == "--SELECT--") {
      updatedValue = "";
    }

    setTrade((prevTradeData) => ({
      ...prevTradeData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async () => {
    const response = await addTrade(trade);

    if (!response.ok) {
      alert("Trade could not be added. Status error: ", response.status);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold mb-5">Add New Trade</h2>
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        method="POST"
        className="grid grid-cols-2 gap-4 w-full max-w-md"
      >
        <div className="mb-2">
          <label className="block font-medium mb-1">Trade Ticket</label>
          <input
            type="text"
            name="ticket"
            className="w-full p-2 border border-gray-300"
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium mb-1">Currency Pair</label>
          <select
            name="currency_pair"
            className="w-full p-2 border border-gray-300"
          >
            <option>--SELECT--</option>
            {assetList ? (
              assetList.map((asset, index) => (
                <option key={index} value={asset.id}>
                  {asset.symbol}
                </option>
              ))
            ) : (
              <div>
                {assetListError ? (
                  <option disabled>{assetListError}</option>
                ) : (
                  <option disabled>Loading...</option>
                )}
              </div>
            )}
          </select>
        </div>

        <div className="mb-2">
          <label className="block font-medium mb-1">Position Type</label>
          <select name="type" className="w-full p-2 border border-gray-300">
            <option>--SELECT--</option>
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
            defaultValue={0.01}
            type="number"
            name="volume"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Open DateTime</label>
          <input
            name="open_datetime"
            type="datetime-local"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Close DateTime</label>
          <input
            name="close_datetime"
            type="datetime-local"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Open Price</label>
          <input
            defaultValue={0.1}
            min={0}
            step={0.00001}
            type="number"
            name="open_price"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Take Profit</label>
          <input
            defaultValue={0.1}
            min={0}
            step={0.00001}
            type="number"
            name="take_profit"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Stop Loss</label>
          <input
            defaultValue={0.1}
            min={0}
            step={0.00001}
            type="number"
            name="stop_loss"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">Close Price</label>
          <input
            defaultValue={0.1}
            min={0}
            step={0.00001}
            type="number"
            name="close_price"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium mb-1">PnL</label>
          <input
            defaultValue={0.1}
            min={0}
            step={0.01}
            name="pnl"
            type="number"
            className="w-full p-2 border border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md"
          >
            Add Trade
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrade;
