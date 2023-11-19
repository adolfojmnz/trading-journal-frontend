import '../../../app/styles/trades/retrieve.css';
import RetrieveTrade from '@/app/components/trades/retrieve';


export default function TradeDetailsPage() {
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