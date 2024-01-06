import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCountryDetail } from "@/app/api/country";

const CountrySingle = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (router.isReady === true) {
      fetchCountry(router.query.countryID);
    }
  }, [router.isReady]);

  const fetchCountry = async (countryID) => {
    try {
      const response = await getCountryDetail(countryID);
      if (response.ok) {
        const data = await response.json();
        setCountry(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        setErrorCode(status);
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const renderCountry = () => {
    return (
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Code</th>
            <th className="py-2 px-4 border-b text-center">Currency</th>
          </tr>
        </thead>
        <tbody>
          {country !== null ? (
            <tr key={country.id}>
              <td className="py-2 px-2 border-b text-center">
                {country.id}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {country.name}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {country.code}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {country.currency}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="py-2 px-4 text-center">
                Country Not Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">List of Countries</h2>
      {error ? (
        <div>
          <p className="text-center">{`${error}`}</p>
          {errorCode === 401 && (
            <p className="text-center">You either aren't logged or your session has expired.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-6 p-4 gap-4">
          <div className="col-span-6 border rounded">
            {renderCountry()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySingle;