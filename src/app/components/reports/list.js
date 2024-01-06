import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getReports } from "@/app/api/reports";
import { getCountries } from "@/app/api/countries";
import { getIndicators } from "@/app/api/indicators";

const ReportList = () => {
  const router = useRouter();

  // For Economic Reports
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({});
  const [shouldFetchReports, setShouldFetchReports] = useState(true);

  // For Economic Indicators
  const [indicators, setIndicators] = useState(null);
  const [indicatorsError, setIndicatorsError] = useState(null);
  const [shouldFetchIndicators, setShouldFetchIndicators] = useState(true);

  // For Countries
  const [countries, setCountries] = useState(null);
  const [countriesError, setCountriesError] = useState(null);
  const [shouldFetchCountries, setShouldFetchCountries] = useState(true);

  useEffect(() => {
    if (shouldFetchReports) {
      fetchReports(filters);
      setShouldFetchReports(false);
    }
    if (shouldFetchIndicators) {
      fetchIndicators();
      setShouldFetchIndicators(false);
    }
    if (shouldFetchCountries) {
      fetchCountries();
      setShouldFetchCountries(false);
    }
  }, [shouldFetchReports, shouldFetchIndicators, shouldFetchCountries]);

  const fetchReports = async (filters) => {
    try {
      const response = await getReports(filters);
      if (response.ok) {
        const data = await response.json();
        setReports(data);
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

  const fetchIndicators = async () => {
    try {
      const response = await getIndicators({});
      if (response.ok) {
        const data = await response.json();
        setIndicators(data);
        if (data.length === 0) {
          setIndicatorsError("No indicators!");
        } else {
          const status = response.status;
          const statusText = response.statusText;
          throw new Error(`Error: ${status} ${statusText}`)
        }
      }
    } catch (error) {
      setIndicatorsError(error);
    }
  }

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

  const handlerowClick = (reportsID) => {
    router.push(`/reports/${reportsID}`);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    
    if (value === "--SELECT--") {
      updatedValue = "";
    }
    if (value === "Low") {
      updatedValue = 1;
    }
    if (value === "Medium") {
      updatedValue = 2;
    }
    if (value === "High") {
      updatedValue = 3;
    }

    setFilters((prevFiltersData) => ({
      ...prevFiltersData,
      [name]: updatedValue,
    }));
  };

  const handleApplyFilters = () => {
    setShouldFetchReports(true);
  };

  const renderReports = () => {
    return (
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Date</th>
            <th className="py-2 px-4 border-b text-center">Time</th>
            <th className="py-2 px-4 border-b text-center">Impact</th>
            <th className="py-2 px-4 border-b text-center">Country</th>
            <th className="py-2 px-4 border-b text-center">Indicator</th>
            <th className="py-2 px-4 border-b text-center">Actual</th>
            <th className="py-2 px-4 border-b text-center">Forecast</th>
            <th className="py-2 px-4 border-b text-center">Previous</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr
                key={report.id}
                className="hover:bg-[#d3d3d3]"
                onClick={() => handlerowClick(report.id)}
              >
                <td className="py-2 px-2 border-b text-center">
                  {report.id}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.name}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.datetime.split("T")[0]}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.datetime.split("T")[1].replace("Z", "")}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.impact_level === 1 ? "Low" : ""}
                  {report.impact_level === 2 ? "Medium" : ""}
                  {report.impact_level === 3 ? "High" : ""}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.economic_indicator_country}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.economic_indicator_name}
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.actual} ({report.unit})
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.forecast} ({report.unit})
                </td>
                <td className="py-2 px-2 border-b text-center">
                  {report.previous} ({report.unit})
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="py-2 px-4 text-center"
              >
                No reports were found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

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
            className="w-full p-2 border rounded focus:outline-none"
          />

          <label className="block mb-2 font-medium">Indicator</label>
          <select
            name="indicator"
            className="w-full p-2 border border-gray-300"
          >
            <option>--SELECT--</option>
            {indicators !== null ? (
              indicators.map((indicator, index) => (
                <option key={index} value={indicator.id}>
                  {indicator.name}
                </option>
              ))
            ) : (
              <>
                {indicatorsError ? (
                  <option disabled>{indicatorsError}</option>
                ) : (
                  <option disabled>Loading...</option>
                )}
              </>
            )}
          </select>
          <label className="blick mb-2 font-medium">Country</label>
          <select
            name="country"
            className="w-full p-2 border border-gray-200"
          >
            <option>--SELECT--</option>
            {countries !== null ? (
              countries.map((country, index) => (
                <option
                  key={index}
                  value={country.code}
                >
                  {country.code.toUpperCase()} - {country.name}
                </option>
              ))
            ) : (
              countriesError ? (
                <option disabled>{countriesError}</option>
              ) : (
                <option disabled>Loading...</option>
              )
            )}
          </select>
          <label className="block mb-2 font-medium">Impact</label>
          <select
            name="impact"
            className="w-full p-2 border rounded bg-white focus:outline-none">
            <option>--SELECT--</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <label className="block mb-2 font-medium">Date</label>
          <input
            type="date"
            name="date"
            className="w-full p-2 border rounded focus:outline-none"
          />
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

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">Economic Reports</h2>
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
            {renderReports()}
          </div>
          <div className="col-span-1 border rounded">
            {filtersForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;