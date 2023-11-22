import React, { useState, useEffect } from 'react';
import { requestPNLMetrics } from '@/app/api/metrics';

import sidebar from './Sidebar';
import { formatTime } from './helpers';

const PNLMetrics = () => {
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
    const respons = await requestPNLMetrics();
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

  const profitAndLoss = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded shadow border">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-2xl font-bold">{metrics.net_profit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gross Profit</p>
              <p className="text-2xl font-bold">{metrics.gross_profit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Gross Loss</p>
              <p className="text-2xl font-bold">{metrics.gross_loss}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Largest Profit Per Trade</p>
              <p className="text-2xl font-bold">{metrics.largest_profit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Largest Loss Per Trade</p>
              <p className="text-2xl font-bold">{metrics.largest_loss}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Smallest Profit Per Trade</p>
              <p className="text-2xl font-bold">{metrics.smallest_profit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Smallest Loss Per Trade</p>
              <p className="text-2xl font-bold">{metrics.smallest_loss}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Profit Per Trade</p>
              <p className="text-2xl font-bold">{metrics.average_profit}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Loss Per Trade</p>
              <p className="text-2xl font-bold">{metrics.average_loss}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-2">Profit And Loss Metrics</h1>
      <div className="grid grid-cols-7 p-6 gap-4">

        {sidebar()}

        {/* Metrics Container */}
        <div className="container col-span-5 mx-auto p-4">
          {profitAndLoss()}
        </div>

      </div>
    </div>
  );
}

export default PNLMetrics;