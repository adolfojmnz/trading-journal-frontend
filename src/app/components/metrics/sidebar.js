import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [clicked, setClicked] = useState("summary");

  const handleClick = (index) => {
    setClicked(index);
  }

  return (
    <div className="cols-span-1 bg-white p-4 rounded shadow border">
      <h2 className="text-xl font-bold mb-2">Metrics Index</h2>
      <ul className="space-y-2">
        <li onClick={() => handleClick("summary")} className="text-black hover:text-blue-600">
          <Link href="/trades/metrics">
            {clicked === "summary" ? "‣ " : ""}
            Summary
          </Link>
        </li>
        <li onClick={() => handleClick("pnl")} className="text-black hover:text-blue-600">
          <Link href="/trades/metrics/pnl">
            {clicked === "pnl" ? "‣ " : ""}
            Profit and loss
          </Link>
          </li>
        <li onClick={() => handleClick("totals")} className="text-balck hover:text-blue-600">
          <Link href="/trades/metrics/totals">
            {clicked === "totals" ? "‣ " : ""}
            Total Trades
          </Link>
        </li>
        <li onClick={() => handleClick("holding-time")} className="text-black hover:text-blue-600">
          <Link href="/trades/metrics/holding-time">
            {clicked === "holding-time" ? "‣ " : ""}
            Holding Time
          </Link>
        </li>
        <li onClick={() => handleClick("volume")} className="text-black hover:text-blue-600">
          <Link href="/trades/metrics/volume">
            {clicked === "volume" ? "‣ " : ""}
            Position Volume
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;