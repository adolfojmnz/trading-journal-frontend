import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAssetList } from '@/app/api/assets';


const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await getAssetList();
      if (!response.ok) {
        throw new Error('Error fetching assets.');
      }
      const data = await response.json();
      setAssets(data);
    } catch (error) {
      setError('Error fetching assets from the server. Try loging in first!');
    }
  };

  const handlerowClick = (tradeID) => {
    router.push(`/assets/${tradeID}`);
  }

  return (
    <div className="assets-container">
      <h2 className="page-title">Asset List</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="asset-list w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-center w-2/9">Symbol</th>
              <th className="py-2 px-4 border-b text-center w-1/9">Name</th>
              <th className="py-2 px-4 border-b text-center w-1/9">Base Currency</th>
              <th className="py-2 px-4 border-b text-center w-1/9">Quote Currency</th>
              <th className="py-2 px-4 border-b text-center w-1/9">PIP Movement</th>
            </tr>
          </thead>
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset, index) => (
                <tr onClick={() => handlerowClick(asset.id)} className="asset-list-item" key={index}>
                  <td className="py-2 px-4 border-b text-center w-1/9">{asset.symbol}</td>
                  <td className="py-2 px-4 border-b text-center w-1/9">{asset.name}</td>
                  <td className="py-2 px-4 border-b text-center w-1/9">{asset.base_currency}</td>
                  <td className="py-2 px-4 border-b text-center w-1/9">{asset.quote_currency}</td>
                  <td className="py-2 px-4 border-b text-center w-1/9">{asset.pip_decimal_position}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-assets-message py-2 px-4 text-center">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssetList;
