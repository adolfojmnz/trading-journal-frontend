import React, { useState, useEffect } from 'react';
import { requestHoldingTimeMetrics } from '@/app/api/metrics';

import sidebar from './Sidebar';
import { formatTime } from './helpers';

const HoldingTimeMetrics = () => {
  const [metrics, setMetrics] = useState({});

  const formatMetricsData = (data) => {
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
    console.log(metrics)
  }

  const fetchMetricsSummary = async () => {
    const respons = await requestHoldingTimeMetrics();
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

  const HoldingTime = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded shadow border">
          <div className="grid grid-cols-5 gap-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Overall</p>
              <p className="text-2xl font-bold">{metrics.average_holding_time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Per Winning Trade</p>
              <p className="text-2xl font-bold">{metrics.average_holding_time_per_winning_trade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Per Losing Trade</p>
              <p className="text-2xl font-bold">{metrics.average_holding_time_per_lossing_trade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Per Long Position</p>
              <p className="text-2xl font-bold">{metrics.average_holding_time_per_long_position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Per Short Position</p>
              <p className="text-2xl font-bold">{metrics.average_holding_time_per_short_position}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-2">Holding Time Metrics</h1>
      <div className="grid grid-cols-7 p-6 gap-4">

        {sidebar()}

        {/* Metrics Container */}
        <div className="container col-span-5 mx-auto p-4">
          {HoldingTime()}
        </div>

      </div>
    </div>
  );
}

export default HoldingTimeMetrics;