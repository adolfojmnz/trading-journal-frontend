import '../../../app/styles/tradeDetails.css';
import TradeRetrieveDetails from '@/app/components/trades/tradeRetrieve';


export default function TradeListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div>
          <TradeRetrieveDetails />
        </div>
      </main>
    </div>
  );
}