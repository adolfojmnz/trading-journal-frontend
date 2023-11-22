const profitAndLoss = (metrics) => {
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

export default profitAndLoss;