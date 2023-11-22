import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  requestPNLMetrics,
  requestVolumeMetrics,
  requestMetricsSummary,
  requestTotalTradesMetrics,
  requestHoldingTimeMetrics,
} from '@/app/api/metrics';

import Summary from './summary';
import profitAndLoss from './pnl';
import TotalTrades from './totals';
import HoldingTime from './holdingTime';
import PositionVolume from './volume';
import { formatTime } from './helpers';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [activeSubpage, setActiveSubpage] = useState("summary");

  useEffect(() => {
    fetchMetricsData();
  }, [activeSubpage])

  const handleSubpageChange = (subpage) => {
    setActiveSubpage(subpage);
  }

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
    };
  };

  const fetchMetricsData = async () => {
    const APIRequester = getMetricsDataRequester();
    const respons = await APIRequester();
    if (respons.ok) {
      const data = await respons.json()
      formatMetricsData(data);
    } {
      console.log("Error loading metrics")
    }
  }

  const formatMetricsData = (data) => {
    setMetrics(data);

    const holdingTime = {
      "average_holding_time": formatTime(data.average_holding_time),
      "average_holding_time_per_winning_trade": formatTime(data.average_holding_time_per_winning_trade),
      "average_holding_time_per_lossing_trade": formatTime(data.average_holding_time_per_lossing_trade),
      "average_holding_time_per_long_position": formatTime(data.average_holding_time_per_long_position),
      "average_holding_time_per_short_position": formatTime(data.average_holding_time_per_short_position),
    }

    setMetrics((prevMetricsData) => ({
      ...prevMetricsData,
      ...holdingTime,
    }));
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
    };
  };

  const renderPageTitle = () => {
    switch (activeSubpage) {
      case "summary":
        return "Metrics Summary"
      case "pnl":
        return "Profits And Losses"
      case "totals":
        return "Total Of Trades"
      case "holding-time":
        return "Holding Times"
      case "volume":
        return "Position Volume"
    };
  };

  const Sidebar = () => {
    return (
      <div className="cols-span-1 bg-white p-4 rounded shadow border">
        <h2 className="text-xl font-bold mb-2">Metrics Index</h2>
        <ul className="space-y-2">
          <li onClick={() => handleSubpageChange("summary")} className="text-black hover:text-blue-600">
            <Link href="#summary">
              {activeSubpage === "summary" ? "‣ " : ""}
              Summary
            </Link>
          </li>
          <li onClick={() => handleSubpageChange("pnl")} className="text-black hover:text-blue-600">
            <Link href="#pnl">
              {activeSubpage === "pnl" ? "‣ " : ""}
              Profit and loss
            </Link>
            </li>
          <li onClick={() => handleSubpageChange("totals")} className="text-balck hover:text-blue-600">
            <Link href="#totals">
              {activeSubpage === "totals" ? "‣ " : ""}
              Total Trades
            </Link>
          </li>
          <li onClick={() => handleSubpageChange("holding-time")} className="text-black hover:text-blue-600">
            <Link href="#holding-time">
              {activeSubpage === "holding-time" ? "‣ " : ""}
              Holding Time
            </Link>
          </li>
          <li onClick={() => handleSubpageChange("volume")} className="text-black hover:text-blue-600">
            <Link href="#volume">
              {activeSubpage === "volume" ? "‣ " : ""}
              Position Volume
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-2">{renderPageTitle()}</h1>
      <div className="grid grid-cols-7 p-6 gap-4">
        {Sidebar()}
        <div className="container col-span-5 mx-auto p-4">
          {renderSubpage()}
        </div>
      </div>
    </div>
  );
};

export default Metrics;
