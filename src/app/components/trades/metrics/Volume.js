import React, { useState, useEffect } from 'react';
import { requestVolumeMetrics } from '@/app/api/metrics';

import sidebar from './Sidebar';
import { formatTime } from './helpers';

const PositionVolumeMetrics = () => {
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
    const respons = await requestVolumeMetrics();
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

  const PositionVolume = () => {
    return (
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-4 rounded shadow border">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm text-gray-500">Min Position volume</p>
              <p className="text-2xl font-bold">{metrics.min_position_volume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Max Position Volume</p>
              <p className="text-2xl font-bold">{metrics.max_position_volume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Position Volume</p>
              <p className="text-2xl font-bold">{metrics.average_position_volume}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Position Volume Per Long Position</p>
              <p className="text-2xl font-bold">{metrics.average_position_volume_per_long_position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Position Volume Per Short Position</p>
              <p className="text-2xl font-bold">{metrics.average_position_volume_per_short_position}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Position Volume Winning Trade</p>
              <p className="text-2xl font-bold">{metrics.average_position_volume_per_winning_trade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Position Volume Per Losing Trade</p>
              <p className="text-2xl font-bold">{metrics.average_position_volume_per_losing_trade}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl text-center font-bold mb-2">Position Volume Metrics</h1>
      <div className="grid grid-cols-7 p-6 gap-4">

        {sidebar()}

        {/* Metrics Container */}
        <div className="container col-span-5 mx-auto p-4">
          {PositionVolume()}
        </div>

      </div>
    </div>
  );
}

export default PositionVolumeMetrics;