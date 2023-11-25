import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  requestPNLMetrics,
  requestVolumeMetrics,
  requestMetricsSummary,
  requestTotalTradesMetrics,
  requestHoldingTimeMetrics,
} from "@/app/api/metrics";

import Summary from "./summary";
import profitAndLoss from "./pnl";
import TotalTrades from "./totals";
import HoldingTime from "./holdingTime";
import PositionVolume from "./volume";
import { formatTime } from "./helpers";

const Metrics = () => {
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});
  const [filters, setFilters] = useState({});
  const [activeSubpage, setActiveSubpage] = useState("summary");
  const [shouldRefetchMetrics, setShouldFetchMetrics] = useState(true);


  useEffect(() => {
    if (shouldRefetchMetrics) {
      fetchMetricsData(filters);
      setShouldFetchMetrics(false);
    }
  }, [shouldRefetchMetrics]);

  const handleSubpageChange = (subpage) => {
    setActiveSubpage(subpage);
    setShouldFetchMetrics(true);
  };

  const getMetricsDataRequester = () => {
    switch (activeSubpage) {
      case "summary":
        return requestMetricsSummary;
      case "pnl":
        return requestPNLMetrics;
      case "totals":
        return requestTotalTradesMetrics;
      case "holding-time":
        return requestHoldingTimeMetrics;
      case "volume":
        return requestVolumeMetrics;
    }
  };

  const fetchMetricsData = async (filters) => {
    const APIRequester = getMetricsDataRequester();
    try {
      const response = await APIRequester(filters);
      if (response.ok) {
        const data = await response.json();
        formatMetricsData(data);
      } {
        const status = response.status;
        const statusText = response.statusText;
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const formatMetricsData = (data) => {
    setMetrics(data);

    const holdingTime = {
      average_holding_time: formatTime(data.average_holding_time),
      average_holding_time_per_winning_trade: formatTime(
        data.average_holding_time_per_winning_trade
      ),
      average_holding_time_per_lossing_trade: formatTime(
        data.average_holding_time_per_lossing_trade
      ),
      average_holding_time_per_long_position: formatTime(
        data.average_holding_time_per_long_position
      ),
      average_holding_time_per_short_position: formatTime(
        data.average_holding_time_per_short_position
      ),
    };

    setMetrics((prevMetricsData) => ({
      ...prevMetricsData,
      ...holdingTime,
    }));
  };

  const handleFiltersChange = (e) => {
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

  const handleApplyFiltersOnClick = () => {
    setShouldFetchMetrics(true);
  };

  const renderSubpage = () => {
    switch (activeSubpage) {
      case "summary":
        return Summary(metrics);
      case "pnl":
        return profitAndLoss(metrics);
      case "totals":
        return TotalTrades(metrics);
      case "holding-time":
        return HoldingTime(metrics);
      case "volume":
        return PositionVolume(metrics);
    }
  };

  const renderPageTitle = () => {
    switch (activeSubpage) {
      case "summary":
        return "Metrics Summary";
      case "pnl":
        return "Profits And Losses";
      case "totals":
        return "Total Of Trades";
      case "holding-time":
        return "Holding Times";
      case "volume":
        return "Position Volume";
    }
  };

  const Sidebar = () => {
    return (
      <div className="cols-span-1 p-4 border rounded shadow bg-gray-100">
        <h2 className="text-xl font-bold mb-2">Metrics Index</h2>
        <ul className="space-y-2">
          <li
            onClick={() => handleSubpageChange("summary")}
            className="text-black hover:text-blue-600"
          >
            <Link href="#summary">
              {activeSubpage === "summary" ? "‣ " : ""}
              Summary
            </Link>
          </li>
          <li
            onClick={() => handleSubpageChange("pnl")}
            className="text-black hover:text-blue-600"
          >
            <Link href="#pnl">
              {activeSubpage === "pnl" ? "‣ " : ""}
              Profit and loss
            </Link>
          </li>
          <li
            onClick={() => handleSubpageChange("totals")}
            className="text-balck hover:text-blue-600"
          >
            <Link href="#totals">
              {activeSubpage === "totals" ? "‣ " : ""}
              Total Trades
            </Link>
          </li>
          <li
            onClick={() => handleSubpageChange("holding-time")}
            className="text-black hover:text-blue-600"
          >
            <Link href="#holding-time">
              {activeSubpage === "holding-time" ? "‣ " : ""}
              Holding Time
            </Link>
          </li>
          <li
            onClick={() => handleSubpageChange("volume")}
            className="text-black hover:text-blue-600"
          >
            <Link href="#volume">
              {activeSubpage === "volume" ? "‣ " : ""}
              Position Volume
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const filtersForm = () => {
    return (
      <div className="p-4 border rounded shadow bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <form className="mb-4" onChange={handleFiltersChange}>
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
          <label className="block mb-2 font-medium">From</label>
          <input
            type="date"
            name="open_date_gte"
            placeholder="Greater than or equal to"
            className="w-full p-2 border rounded focus:outline-none"
          />
          <label className="block mb-2 font-medium">To</label>
          <input
            type="date"
            name="open_date_lte"
            className="w-full p-2 border rounded focus:outline-none"
          />
        </form>

        <button
          onClick={handleApplyFiltersOnClick}
          className="bg-[#6e8a85] text-white font-semibold p-2 rounded w-full"
        >
          Apply Filters
        </button>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl text-center font-bold">
        {renderPageTitle()}
      </h1>
      <br />

      <div className="grid grid-cols-7 gap-4">
        {Sidebar()}
        <div className="container col-span-5 mx-auto">
          {error !== null && (
            renderSubpage()
          )}
        </div>
        {filtersForm()}
      </div>

    </div>
  );
};

export default Metrics;
