import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getReports } from "@/app/api/reports";
import { getIndicatorDetail } from "@/app/api/indicators";

const IndicatorDetail = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [reportsErrorCode, setReportsErrorCode] = useState(null);
  const [indicatorErrorCode, setIndicatorErrorCode] = useState(null);
  const [reports, setReports] = useState(null);
  const [indicator, setIndicator] = useState(null);

  useEffect(() => {
    if (router.isReady === true) {
      fetchIndicator(router.query.indicatorID);
      fetchReports(router.query.indicatorID);
    }
  }, [router.isReady]);

  const fetchIndicator = async (indicatorID) => {
    try {
      const response = await getIndicatorDetail(indicatorID);
      if (response.ok) {
        const data = await response.json();
        setIndicator(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        setIndicatorErrorCode(status);
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const fetchReports = async (indicatorID) => {
    try {
      const reportsFilterBy = {"indicator": indicatorID}
      const response = await getReports(reportsFilterBy);
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        const status = response.status;
        const statusText = response.statusText;
        setIndicatorErrorCode(status);
        throw new Error(`Request failed with status: ${status} ${statusText}`);
      }
    } catch (error) {
      setError(error);
    }
  };

  const renderReports = () => {
    return (
      <table className="w-full border border-collapse mt-12">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Date</th>
            <th className="py-2 px-4 border-b text-center">Time</th>
            <th className="py-2 px-4 border-b text-center">Impact</th>
            <th className="py-2 px-4 border-b text-center">Actual</th>
            <th className="py-2 px-4 border-b text-center">Forecast</th>
            <th className="py-2 px-4 border-b text-center">Previous</th>
          </tr>
        </thead>
        <tbody>
          {reports !== null ? (
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

  const renderIndicator = () => {
    return (
      <table className="w-full border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b text-center">ID</th>
            <th className="py-2 px-4 border-b text-center">Country</th>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {indicator !== null ? (
            <tr key={indicator.id}>
              <td className="py-2 px-2 border-b text-center">
                {indicator.id}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {indicator.country_code}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {indicator.name}
              </td>
              <td className="py-2 px-2 border-b text-center">
                {indicator.description}
              </td>
            </tr>
          ) : (
          <tr>
            <td className="py-2 px-4 text-center">
              Indicator Not Found!
            </td>
          </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">Economic Indicator Details</h2>
      {error ? (
        <div>
          <p className="text-center">{`${error}`}</p>
          {indicatorErrorCode === 401 && (
            <p className="text-center">You either aren't logged or your session has expired.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-6 p-4 gap-4">
          <div className="col-span-6 border rounded">
            {renderIndicator()}
            {renderReports()}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndicatorDetail;