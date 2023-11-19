import '../../app/styles/trades/list.css';
import ListTrades from '@/app/components/trades/list';


export default function TradeListPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <main>
        <div>
          <ListTrades />
        </div>
      </main>
    </div>
  );
}