import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTradeList } from "@/app/api/trades";

const ListTrades = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [trades, setTrades] = useState([]);
  const [filters, setFilters] = useState({});
  const [shoudlFetchTrades, setShouldFetchTrades] = useState(true);
  const [selectedFormOption, setSelectedFormOption] = useState("elemental");


  useEffect(() => {
    if (shoudlFetchTrades) {
      fetchTrades(filters);
      setShouldFetchTrades(false);
    }
  }, [shoudlFetchTrades]);

  const fetchTrades = async (filters) => {
    try {
      const response = await getTradeList(filters);
      if (response.ok) {
        const data = await response.json();
        setTrades(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (value === "SHORT") {
      updatedValue = "S";
    } else if (value === "LONG") {
      updatedValue = "L";
    } else if (value == "--SELECT--") {
      updatedValue = "";
    }

    setFilters((prevTradeData) => ({
      ...prevTradeData,
      [name]: updatedValue,
    }));
  };

  const handlerowClick = (tradeID) => {
    router.push(`/trades/${tradeID}`);
  };

  const handleApplyFiltersClickOn = () => {
    setShouldFetchTrades(true);
  };

  const handleSelectFormChange = (event) => {
    setSelectedFormOption(event.target.value);
    setFilters({});
  };

  const tradesTableHead = () => {
    return (
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b text-center w-1/9">Index</th>
          <th className="py-2 px-4 border-b text-center w-1/9">Ticket</th>
          <th className="py-2 px-4 border-b text-center w-2/9">
            Currency Pair
          </th>
          <th className="py-2 px-4 border-b text-center w-1/9">Type</th>
          <th className="py-2 px-4 border-b text-center w-1/9">
            Open DateTime
          </th>
          <th className="py-2 px-4 border-b text-center w-1/9">
            Close DateTime
          </th>
          <th className="py-2 px-4 border-b text-center w-1/9">Open Price</th>
          <th className="py-2 px-4 border-b text-center w-1/9">Take Profit</th>
          <th className="py-2 px-4 border-b text-center w-1/9">Stop Loss</th>
          <th className="py-2 px-4 border-b text-center w-1/9">Close Price</th>
          <th className="py-2 px-4 border-b text-center w-1/9">Volume</th>
          <th className="py-2 px-4 border-b text-center w-1/9">PnL</th>
        </tr>
      </thead>
    );
  };

  const tradesTableBody = () => {
    return (
      <tbody>
        {trades.length > 0 ? (
          trades.map((trade, index) => (
            <tr
              key={index}
              className="hover:bg-[#d3d3d3]"
              onClick={() => handlerowClick(trade.id)}
            >
              <td className="py-2 px-4 border-b text-center w-1/9">{index}</td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.ticket}
              </td>
              <td className="py-2 px-4 border-b text-center w-2/9">
                {trade.currency_pair}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.type === "S" ? "Short" : "Long"}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {formatDateTime(trade.open_datetime)}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {formatDateTime(trade.close_datetime)}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.open_price}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.take_profit}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.stop_loss}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.close_price}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.volume}
              </td>
              <td className="py-2 px-4 border-b text-center w-1/9">
                {trade.pnl}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={12} className="py-2 px-4 text-center w-1/9">
              No trades found.
            </td>
          </tr>
        )}
      </tbody>
    );
  };

  const formSelect = () => {
    return (
      <form className="mb-4">
        <label className="block mb-2 font-medium"></label>
        <select
          value={selectedFormOption}
          onChange={handleSelectFormChange}
          className="w-full p-2 border rounded focus:outline-none"
        >
          <option value="elemental">Elemental Form</option>
          <option value="advanced">Advanced Form</option>
        </select>
      </form>
    );
  };

  const commomFilterForm = () => {
    return (
      <>
        <label className="block mb-2 font-medium">Asset</label>
        <input
          type="text"
          name="asset"
          placeholder="Currency or Currency Pair"
          className="w-full p-2 border rounded focus:outline-none"
        />
        <label className="block mb-2 font-medium">Type</label>
        <select
          name="type"
          className="w-full p-2 border rounded bg-white focus:outline-none">
          <option>--SELECT--</option>
          <option>SHORT</option>
          <option>LONG</option>
        </select>
        <label className="block mb-2 font-medium">Open date from</label>
        <input
          type="date"
          name="open_date_gte"
          placeholder="Greater than or equal to"
          className="w-full p-2 border rounded focus:outline-none"
        />
        <label className="block mb-2 font-medium">Open date to</label>
        <input
          type="date"
          name="open_date_lte"
          className="w-full p-2 border rounded focus:outline-none"
        />
        <label className="block mb-2 font-medium">PNL from</label>
        <input
          name="pnl_gte"
          type="number"
          placeholder="Greater than or qual to"
          className="w-full p-2 border rounded focus:outline-none"
        />
        <label className="block mb-2 font-medium">PNL to</label>
        <input
          type="number"
          name="pnl_lte"
          placeholder="Less than or qual to"
          className="w-full p-2 border rounded focus:outline-none"
        />
      </>
    );
  };

  const elementalFilterForm = () => {
    return (
      <div className="p-4 border rounded shadow bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        {formSelect()}
        <form className="mb-4" onChange={handleFormChange}>
          {commomFilterForm()}
        </form>
      </div>
    );
  }

  const advancedFilterForm = () => {
    return (
      <div className="p-4 border rounded shadow bg-gray-100">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>
        {formSelect()}
        <form className="mb-4" onChange={handleFormChange}>
          {commomFilterForm()}
          <label className="block mb-2 font-medium">Volume from</label>
          <input
            max={100}
            min={0.01}
            step={0.01}
            type="number"
            name="volume_gte"
            placeholder="Greater than or equal to"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">Volume to</label>
          <input
            max={100}
            min={0.01}
            step={0.01}
            type="number"
            name="volume_lte"
            placeholder="Less than or equal to"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">Close date from</label>
          <input
            type="date"
            name="close_date_gte"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">Close date to</label>
          <input
            type="date"
            name="close_date_lte"
            className="w-full p-2 border rounded focus:outline-none"
          />
        </form>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-bold">Trade List</h2>
      <br />
      {error ? (
        <p className="text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-5 border rounded">
            <table className="trade-list w-full border-collapse">
              {tradesTableHead()}
              {tradesTableBody()}
            </table>
          </div>

          <div className="p-4">
            {selectedFormOption === "elemental" && (
              elementalFilterForm()
            )}

            {selectedFormOption === "advanced" && (
              advancedFilterForm()
            )}

            <button
              onClick={handleApplyFiltersClickOn}
              className="bg-[#6e8a85] text-white font-semibold p-2 rounded w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListTrades;

const formatDateTime = (datetimeStr) => {
  return datetimeStr.replace("T", " ").replace("Z", "");
};
