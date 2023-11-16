import '../../app/styles/tradeList.css';
import TradeList from '@/app/components/trades/trade_list';


export default function TradeListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div>
          <TradeList />
        </div>
      </main>
    </div>
  );
}