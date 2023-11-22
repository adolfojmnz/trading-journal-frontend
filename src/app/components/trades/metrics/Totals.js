import React, { useState, useEffect } from 'react';
import { requestTotalTradesMetrics } from '@/app/api/metrics';

import sidebar from './Sidebar';
import { formatTime } from './helpers';

const TotalTradesMetrics = () => {
  const [metrics, setMetrics] = useState({});

  const formatMetricsData = (data) => {
    const holdingTime = {
      "average_holding_time": formatTime(data.average_holding_time),
    }

    setMetrics((prevMetricsData) => ({
      ...prevMetricsData,
      ...holdingTime,
    }));
    console.log(metrics)
  }

  const fetchMetricsSummary = async () => {
    const respons = await requestTotalTradesMetrics();
    if (respons.ok) {
      const data = await respons.json()
      setMetrics(data);
      formatMetricsData(data);
    } {
      console.log("Error loading metrics")
    }
  }

  useEffect(() => {
    fetchMetricsSummary();
  }, [])

  const TotalTrades = () => {
    return (
      <div className="gap-4">
        <div className="bg-white p-4 rounded shadow border">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Overall</p>
              <p className="text-2xl font-bold">{metrics.total_trades}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Profit</p>
              <p className="text-2xl font-bold">{metrics.total_profit_trades}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Loss</p>
              <p className="text-2xl font-bold">{metrics.total_loss_trades}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Long Positions</p>
              <p className="text-2xl font-bold">{metrics.total_long_positions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Short Positions</p>
              <p className="text-2xl font-bold">{metrics.total_short_positions}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-2">Total Trades Metrics</h1>
      <div className="grid grid-cols-7 p-6 gap-4">

        {sidebar()}

        {/* Metrics Container */}
        <div className="container col-span-5 mx-auto p-4">
          {TotalTrades()}
        </div>

      </div>
    </div>
  );
}

export default TotalTradesMetrics;