const Summary = (metrics) => {
  return (
    <div className="grid gap-2 bg-gray-50 p-4 rounded shadow border">
      <h3 className="text-lg font-bold mb-2 text-left">PNL</h3>
      <div className="grid grid-cols-3 gap-2 text-center shadow">
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
      </div> <br />
      <h3 className="text-lg font-bold mb-2 text-left">PNL Average</h3>
      <div className="grid grid-cols-2 gap-2 text-center shadow">
        <div>
          <p className="text-sm text-gray-500">Average Profit Per Trade</p>
          <p className="text-2xl font-bold">{metrics.average_profit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Loss Per Trade</p>
          <p className="text-2xl font-bold">{metrics.average_loss}</p>
        </div>
      </div> <br />
      <h3 className="text-lg font-bold mb-2 text-left">PNL Percentange</h3>
      <div className="grid grid-cols-2 gap-2 text-center shadow">
        <div>
          <p className="text-sm text-gray-500">Percentage Profit Trades</p>
          <p className="text-2xl font-bold">
            {metrics.percentage_profit_trades}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Percentage Loss Trades</p>
          <p className="text-2xl font-bold">
            {metrics.percentage_loss_trades}
          </p>
        </div>
      </div> <br />
      <h3 className="text-lg font-bold mb-2 text-left">Total Trades</h3>
      <div className="grid grid-cols-3 gap-2 text-center shadow">
        <div>
          <p className="text-sm text-gray-500">Total Trades</p>
          <p className="text-2xl font-bold">{metrics.total_trades}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Profit Trades</p>
          <p className="text-2xl font-bold">
            {metrics.total_profit_trades}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Loss Trades</p>
          <p className="text-2xl font-bold">{metrics.total_loss_trades}</p>
        </div>
      </div> <br />
      <h3 className="text-lg font-bold mb-2 text-left">Duration & Volume</h3>
      <div className="grid grid-cols-2 gap-2 text-center shadow">
        <div>
          <p className="text-sm text-gray-500">Average Holding Time</p>
          <p className="text-2xl font-bold">
            {metrics.average_holding_time}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Position Volume</p>
          <p className="text-2xl font-bold">
            {metrics.average_position_volume}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
