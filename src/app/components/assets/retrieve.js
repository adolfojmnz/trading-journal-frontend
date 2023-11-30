import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getAssetDetails } from "@/app/api/assets";
import { requestAssetMetrics } from "@/app/api/metrics";

const RetrieveAsset = () => {
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState(null);
  const [assetID, setAssetID] = useState(null);
  const [metricsData, setMetricsData] = useState({});
  const [metricsError, setMetricsError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      setAssetID(router.query.assetID);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (assetID) {
      fetchAsset(assetID);
      fetchAssetMetrics(assetID);
      console.log(metricsData);
    }
  }, [assetID]);

  const fetchAsset = async (assetID) => {
    try {
      const response = await getAssetDetails(assetID);
      if (!response.ok) {
        throw new Error("Error fetching asset details");
      }
      const data = await response.json();
      setAsset(data);
    } catch (error) {
      setError("Error fetching asset details. You might need to log in first!");
    }
  };

  const fetchAssetMetrics = async (assetID) => {
    try {
      const response = await requestAssetMetrics(assetID);
      if (response.ok) {
        const data = await response.json();
        setMetricsData(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setMetricsError(error);
    }
  };

  const renderMetrics = (metrics) => {
    if (metrics.total_trades === 0 || metrics.total_trades === undefined) {
      return (
        <p className="text-lg text-left pl-4">
          You haven't traded this asset, therefore, it's metrics are not available.
        </p>
      );
    }

    return (
      <div className="gap-4 rounded text-center mt-2">
        <h4 className="text-lg text-left ml-8 mb-2 pt-2">Total Trades</h4>
        <div className="grid grid-cols-5 gap-8 ml-8 mr-8">
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Overal</p>
            <p className="text-2xl font-semibold">{metrics.total_trades}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Profit Trades</p>
            <p className="text-2xl font-semibold">{metrics.total_profit_trades}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Loss Trades</p>
            <p className="text-2xl font-semibold">{metrics.total_loss_trades}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Short Trades</p>
            <p className="text-2xl font-semibold">{metrics.total_short_trades}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Long Trades</p>
            <p className="text-2xl font-semibold">{metrics.total_long_trades}</p>
          </div>
        </div>
        <h4 className="text-lg text-left ml-8 mt-8 mb-2">Profit and Loss</h4>
        <div className="grid grid-cols-7 gap-8 ml-8 mr-8">
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="text-2xl font-semibold">{metrics.net_profit}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Gross Profit</p>
            <p className="text-2xl font-semibold">{metrics.gross_profit}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Gross Loss</p>
            <p className="text-2xl font-semibold">{metrics.gross_loss}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Largest Profit</p>
            <p className="text-2xl font-semibold">{metrics.largest_profit}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Largest Loss</p>
            <p className="text-2xl font-semibold">{metrics.largest_loss}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Avg Profit Per Trade</p>
            <p className="text-2xl font-semibold">{metrics.avg_profit_per_trade}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Avg Loss Per Trade</p>
            <p className="text-2xl font-semibold">{metrics.avg_loss_per_trade}</p>
          </div>
        </div>
        <h4 className="text-lg text-left ml-8 mt-8 mb-2">Avg Holding Time</h4>
        <div className="grid grid-cols-5 gap-8 mb-8 ml-8 mr-8 pb-8">
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Overall</p>
            <p className="text-2xl font-semibold">{formatTime(metrics.avg_holding_time)}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Per Long Trade</p>
            <p className="text-2xl font-semibold">{formatTime(metrics.avg_holding_time_per_long_trade)}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Per Short Trade</p>
            <p className="text-2xl font-semibold">{formatTime(metrics.avg_holding_time_per_short_trade)}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Per Profit Trade</p>
            <p className="text-2xl font-semibold">{formatTime(metrics.avg_holding_time_per_profit_trade)}</p>
          </div>
          <div className="shadow rounded-full border bg-gray-50">
            <p className="text-sm text-gray-500">Per Loss Trade</p>
            <p className="text-2xl font-semibold">{formatTime(metrics.avg_holding_time_per_loss_trade)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="asset-container">
      <h2 className="page-title">Asset Details</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="w-full">
          <table className="asset-details-table w-full border-collapse border">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-center w-1/9">Symbol</th>
                <th className="py-2 px-4 border-b text-center w-2/9">Name</th>
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
              {asset !== null ? (
                <tr className="" key={asset.id}>
                  <td className="py-2 px-4 border-b text-center w-1/9">
                    {asset.symbol}
                  </td>
                  <td className="py-2 px-4 border-b text-center w-2/9">
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
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="no-found-message py-2 px-4 text-center"
                  >
                    Asset not found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pt-4">
            <h3 className="justify-center mt-4 text-lg font-semibold">Metrics</h3>
            {metricsError !== null ? (
              <p>{metricsError}</p>
            ) : (
              renderMetrics(metricsData)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RetrieveAsset;

export function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  var formattedTime = padZero(hours) + ':' + padZero(minutes) + ':' + padZero(Math.floor(remainingSeconds));
  return formattedTime;
}

function padZero(number) {
  return (number < 10 ? '0' : '') + number;
}