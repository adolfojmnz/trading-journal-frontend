const HoldingTime = (metrics) => {
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
            <p className="text-2xl font-bold">
              {metrics.average_holding_time_per_winning_trade}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Per Losing Trade</p>
            <p className="text-2xl font-bold">
              {metrics.average_holding_time_per_lossing_trade}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Per Long Position</p>
            <p className="text-2xl font-bold">
              {metrics.average_holding_time_per_long_position}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Per Short Position</p>
            <p className="text-2xl font-bold">
              {metrics.average_holding_time_per_short_position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingTime;
