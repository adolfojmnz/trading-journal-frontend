import '../../../app/styles/tradeDetails.css';
import RetrieveTrade from '@/app/components/trades/retrieve';


export default function TradeListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div>
          <RetrieveTrade />
        </div>
      </main>
    </div>
  );
}