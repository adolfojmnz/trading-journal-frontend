import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCountries } from "@/app/api/countries";
import { getIndicators } from "@/app/api/indicators";
import { getCurrencies } from "@/app/api/currencies";

const IndicatorList = () => {
  const router = useRouter();

  // For Economic Indicators
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [errorCode, setErrorCode] = useState(null);
  const [indicators, setIndicatos] = useState([]);
  const [shouldFetchIndicators, setShouldFetchIndicators] = useState(true);

  // For Countries
  const [countries, setCountries] = useState(null);
  const [countriesError, setCountriesError] = useState(null);
  const [shouldFetchCountries, setShouldFetchCountries] = useState(true);

  // For Currencies
  const [currencies, setCurrencies] = useState(null);
  const [currenciesError, setCurrenciesError] = useState(null);
  const [shouldFetchCurrencies, setShouldFetchCurrencies] = useState(true);

  useEffect(() => {
    if (shouldFetchIndicators) {
      fetchIndicators(filters);
      setShouldFetchIndicators(false);
    }
    if (shouldFetchCountries) {
      fetchCountries({});
      setShouldFetchCountries(false);
    }
    if (shouldFetchCurrencies) {
      fetchCurrencies({});
      setShouldFetchCurrencies(false);
    }
  }, [shouldFetchIndicators, shouldFetchCountries, shouldFetchCurrencies]);

  const fetchIndicators = async (filters) => {
    try {
      const response = await getIndicators(filters);
      if (response.ok) {
        const data = await response.json();
        setIndicatos(data);
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

  const fetchCountries = async () => {
    try {
      const response = await getCountries({});
      if (response.ok) {
        const data = await response.json();
        setCountries(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        throw new Error(`Error: ${status} ${statusText}`);
      }
    } catch (error) {
      setCountriesError(error);
    }
  }

  const fetchCurrencies = async () => {
    try {
      const response = await getCurrencies({});
      if (response.ok) {
        const data = await response.json();
        setCurrencies(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        throw new Error(`Error: ${status} ${statusText}`);
      }
    } catch (error) {
      setCurrenciesError(error);
    }
  }

  const handlerowClick = (indicatorID) => {
    router.push(`/indicators/${indicatorID}`);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    
    if (value === "--SELECT--") {
      updatedValue = "";
    }

    setFilters((prevFiltersData) => ({
      ...prevFiltersData,
      [name]: updatedValue,
    }));
  };

  const handleApplyFilters = () => {
    setShouldFetchIndicators(true);
  };

  const filtersForm = () => {
    return (
      <div className="p-4 border rounded shadow bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>
        <form className="mb-4" onChange={handleFormChange}>
          <label className="block mb-2 font-medium">Name</label>
          <input
            type="text"
            name="name"
            placeholder="E.g. Foreign Bond"
            className="w-full p-2 border rounded focus:outline-none mb-2"
          />

          <label className="block mb-2 font-medium">Country</label>
          <select
            name="country"
            className="w-full p-2 border border-gray-300 mb-2"
          >
            <option>--SELECT--</option>
            {countries !== null ? (
              countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.code.toUpperCase()} - {country.name}
                </option>
              ))
            ) : (
              <>
                {countriesError ? (
                  <option disabled>{countriesError}</option>
                ) : (
                  <option disabled>Loading...</option>
                )}
              </>
            )}
          </select>
          <label className="blick mb-2 font-medium">Currency</label>
          <select
            name="currency"
            className="w-full p-2 border border-gray-200 mb-2"
          >
            <option>--SELECT--</option>
            {currencies !== null ? (
              currencies.map((currency, index) => (
                <option
                  key={index}
                  value={currency.id}
                >
                  {currency.symbol.toUpperCase()}
                </option>
              ))
            ) : (
              currenciesError ? (
                <option disabled>{currenciesError}</option>
              ) : (
                <option disabled>Loading...</option>
              )
            )}
          </select>
        </form>
        <button
          onClick={handleApplyFilters}
          className="bg-[#6e8a85] text-white font-semibold p-2 rounded w-full"
        >
          Apply Filters
        </button>
      </div>
    )
  }

  const renderIndicators = () => {
    return (
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Country</th>
            <th className="py-2 px-4 border-b text-center">Currency</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
          </tr>
        </thead>
        <tbody>
          {indicators.length > 0 ? (
            indicators.map((indicator) => (
              <tr
                key={indicator.id}
                className="hover:bg-[#d3d3d3]"
                onClick={() => handlerowClick(indicator.id)}
              >
                <td className="py-2 px-2 border-b text-center">
                  {indicator.id}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {indicator.country_code.toUpperCase()}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {indicator.currency_symbol.toUpperCase()}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {indicator.name}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="py-2 px-4 text-center"
              >
                No indicators were found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">Economic Indicators</h2>
      {error ? (
        <div>
          <p className="text-center">{`${error}`}</p>
          {errorCode === 401 && (
            <p className="text-center">You either aren't logged or your session has expired.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-6 p-4 gap-4">
          <div className="col-span-5 border rounded">
            {renderIndicators()}
          </div>
          <div className="col-span-1 border rounded">
            {filtersForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndicatorList;