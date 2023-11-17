import '../../app/styles/tradeList.css';
import TradeRetrieveList from '@/app/components/trades/tradeRetrieveList';


export default function TradeListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div>
          <TradeRetrieveList />
        </div>
      </main>
    </div>
  );
}