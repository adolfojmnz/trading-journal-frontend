import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getReportDetail } from "@/app/api/reports";

const ReportSingle = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (router.isReady === true) {
      fetchReport(router.query.reportID);
    }
  }, [router.isReady]);

  const fetchReport = async (reportID) => {
    try {
      const response = await getReportDetail(reportID);
      if (response.ok) {
        const data = await response.json();
        setReport(data);
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

  const renderReport = () => {
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
          {report !== null ? (
            <tr key={report.id}>
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
          ) : (
            <tr>
              <td className="py-2 px-4 text-center">
                Report Not Found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  return (
    <div className="w-full">
      <h2 className="font-semibold text-2xl text-center p-4">Economic Reports</h2>
      {error ? (
        <div>
          <p className="text-center">{`${error}`}</p>
          {errorCode === 401 && (
            <p className="text-center">
              You either aren't logged or your session has expired.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-6 p-4 gap-4">
          <div className="col-span-6 border rounded">
            {renderReport()}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSingle;