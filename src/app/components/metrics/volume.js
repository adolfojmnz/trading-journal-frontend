const PositionVolume = (metrics) => {
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
            <p className="text-2xl font-bold">
              {metrics.average_position_volume}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Avg Position Volume Per Long Position
            </p>
            <p className="text-2xl font-bold">
              {metrics.average_position_volume_per_long_position}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Avg Position Volume Per Short Position
            </p>
            <p className="text-2xl font-bold">
              {metrics.average_position_volume_per_short_position}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Avg Position Volume Winning Trade
            </p>
            <p className="text-2xl font-bold">
              {metrics.average_position_volume_per_winning_trade}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Avg Position Volume Per Losing Trade
            </p>
            <p className="text-2xl font-bold">
              {metrics.average_position_volume_per_losing_trade}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionVolume;
