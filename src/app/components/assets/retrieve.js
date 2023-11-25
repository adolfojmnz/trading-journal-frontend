import { useState, useEffect } from "react";
import { getAssetDetails } from "@/app/api/assets";
import { useRouter } from "next/router";

const RetrieveAsset = () => {
  const [asset, setAsset] = useState(null);
  const [error, setError] = useState(null);
  const [assetID, setAssetID] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady === true) {
      setAssetID(router.query.assetID);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (assetID) {
      fetchAsset(assetID);
    }
  }, [assetID]);

  const fetchAsset = async (assetID) => {
    try {
      const response = await getAssetDetails(assetID);
      if (!response.ok) {
        throw new Error("Error fetching asset details");
      }
      const data = await response.json();
      setAsset(data);
    } catch (error) {
      setError("Error fetching asset details. You might need to log in first!");
    }
  };

  return (
    <div className="asset-container">
      <h2 className="page-title">Asset Details</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="asset-details-table w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border-b text-center w-1/9">Symbol</th>
              <th className="py-2 px-4 border-b text-center w-2/9">Name</th>
              <th className="py-2 px-4 border-b text-center w-1/9">
                Base Currency
              </th>
              <th className="py-2 px-4 border-b text-center w-1/9">
                Quote Currency
              </th>
              <th className="py-2 px-4 border-b text-center w-1/9">
                PIP Movement
              </th>
            </tr>
          </thead>
          <tbody>
            {asset !== null ? (
              <tr className="asset-item" key={asset.id}>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.symbol}
                </td>
                <td className="py-2 px-4 border-b text-center w-2/9">
                  {asset.name}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.base_currency}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.quote_currency}
                </td>
                <td className="py-2 px-4 border-b text-center w-1/9">
                  {asset.pip_decimal_position}
                </td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="no-found-message py-2 px-4 text-center"
                >
                  Asset not found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RetrieveAsset;
