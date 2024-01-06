import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAssetList } from "@/app/api/assets";

const AssetList = () => {
  const router = useRouter();
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [errorCode, setErrorCode] = useState(null);
  const [shouldFetchAssets, setShouldFetchAssets] = useState(true);

  useEffect(() => {
    if (shouldFetchAssets) {
      fetchAssets(filters);
      setShouldFetchAssets(false);
    }
  }, [shouldFetchAssets]);

  const fetchAssets = async (filters) => {
    try {
      const response = await getAssetList(filters);
      if (response.ok) {
        const data = await response.json();
        setAssets(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        setErrorCode(status);
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleFiltersFormChange = (e) => {
    const { name, value} = e.target;
    let updatedValue = value;

    if (value === "--SELECT--") {
      updatedValue = "";
    }

    setFilters((prevAssetData) => ({
      ...prevAssetData,
      [name]: updatedValue,
    }));
  };

  const handleApplyFilters = () => {
    setShouldFetchAssets(true);
  };

  const handlerowClick = (tradeID) => {
    router.push(`/assets/${tradeID}`);
  };

  const assetTable = () => {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center w-1/9">Index</th>
            <th className="py-2 px-4 border-b text-center w-2/9">Symbol</th>
            <th className="py-2 px-4 border-b text-center w-1/9">Name</th>
            <th className="py-2 px-4 border-b text-center w-1/9">
              Base Currency
            </th>
            <th className="py-2 px-4 border-b text-center w-1/9">
              Quote Currency
            </th>
            <th className="py-2 px-4 border-b text-center w-1/9">
              PIP Movement
            </th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset, index) => (
              <tr
                key={index}
                className="hover:bg-[#d3d3d3]"
                onClick={() => handlerowClick(asset.id)}
              >
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {index}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.symbol}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.name}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.base_currency_symbol}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.quote_currency_symbol}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.pip_decimal_position}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="no-assets-message py-2 px-4 text-center"
              >
                No assets found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const filtersForm = () => {
    return (
      <div className="p-4 border rounded shadow bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <form onChange={handleFiltersFormChange}>
          <label className="block mb-2 font-medium">Symbol Contains</label>
          <input
            type="text"
            name="symbol"
            placeholder="Currency or currency pair"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">Base Currency</label>
          <input
            type="text"
            name="base_currency_symbol"
            placeholder="Search by base currency"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">Quote Currency</label>
          <input
            type="text"
            name="quote_currency_symbol"
            placeholder="Search by quote currency"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">PIP Movement</label>
          <select
            name="pip_decimal_position"
            className="w-full p-2 border rounded bg-white focus:outline-none">
            <option>--SELECT--</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </form>
        <button
          onClick={handleApplyFilters}
          className="bg-[#6e8a85] text-white font-semibold mt-4 p-2  rounded w-full"
        >
          Apply Filters
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">Asset List</h2>
      {error ? (
        <div>
          <p className="text-center">{`${error}`}</p>
          {errorCode === 401 && (
            <p className="text-center">You either aren't logged or your session has expired.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-6 p-4 gap-4">
          <div className="col-span-5 border rounded">
            {assetTable()}
          </div>
          <div className="col-span-1">
            {filtersForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
