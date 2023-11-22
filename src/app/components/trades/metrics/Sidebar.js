import Link from "next/link";

export default function sidebar() {
  return (
    <div className="cols-span-1 bg-white p-4 rounded shadow border">
      <h2 className="text-xl font-bold mb-2">Metrics Index</h2>
      <ul className="space-y-2">
        <li className="text-blue-500 hover:text-black hover:text-lg">
          <Link href="/trades/metrics">‣ Summary</Link>
        </li>
        <li className="text-blue-500 hover:text-black hover:text-lg">
          <Link href="/trades/metrics/pnl">‣ Profit and loss</Link>
          </li>
        <li className="text-blue-500 hover:text-black hover:text-lg">
          <Link href="/trades/metrics/totals">‣ Total Trades</Link>
        </li>
        <li className="text-blue-500 hover:text-black hover:text-lg">
          <Link href="/trades/metrics/holding-time">‣ Holding Time</Link>
        </li>
        <li className="text-blue-500 hover:text-black hover:text-lg">
          <Link href="/trades/metrics/volume">‣ Position Volume</Link>
        </li>
      </ul>
    </div>
  );
};