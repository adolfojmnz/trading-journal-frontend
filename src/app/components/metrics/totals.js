const TotalTrades = (metrics) => {
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
            <p className="text-2xl font-bold">
              {metrics.total_short_positions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalTrades;
