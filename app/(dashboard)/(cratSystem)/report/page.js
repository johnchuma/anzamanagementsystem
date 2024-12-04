"use client";
import { useState, useEffect } from "react";
import { getReportData, getScoreData, initialData } from "@/app/controllers/crat_general_controller"; // Import updated API functions
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the table headers
// const tableHeaders = ["Sub Domain", "Score", "Report Narrative"];
const tableHeaders = ["Sub Domain",  "Report Narrative"];


const Page = () => {
  const [data, setData] = useState(initialData);
  const [scoreData, setScoreData] = useState({}); // State to hold the score data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await getReportData();
        const responseData1 = await getScoreData();
        setScoreData(responseData1); // Update scoreData with the response
        updateDataWithBackendResponse(responseData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateDataWithBackendResponse = (responseData) => {
    const updatedData = { ...data };

    responseData.forEach((responseItem) => {
      const { subDomain, score } = responseItem;

      Object.keys(updatedData).forEach((section) => {
        if (Array.isArray(updatedData[section])) {
          updatedData[section].forEach((subDomainGroup) => {
            if (subDomainGroup.subDomain === subDomain) {
              subDomainGroup.score = score;
            }
          });
        } else {
          Object.keys(updatedData[section]).forEach((subSection) => {
            if (Array.isArray(updatedData[section][subSection])) {
              updatedData[section][subSection].forEach((subDomainGroup) => {
                if (subDomainGroup.subDomain === subDomain) {
                  subDomainGroup.score = score;
                }
              });
            }
          });
        }
      });
    });

    setData(updatedData);
  };

  const renderTableHeaders = () => (
    <div className="grid grid-cols-2 border-b border-stroke py-4 px-4 dark:border-strokedark">
      {tableHeaders.map((header, index) => (
        <div key={index} className="flex items-center px-2">
          <p className="text-sm text-black dark:text-white font-semibold">{header}</p>
        </div>
      ))}
    </div>
  );

  const renderTableRows = (sectionData) => {
    return sectionData.map((item, index) => {
      const narrative = item.narrative.find((n) => n.score === item.score)?.text || "Narrative not found";
      return (
        <div className="grid grid-cols-2 border-t border-stroke py-4 px-4 dark:border-strokedark" key={index}>
          <div className="flex items-center px-2">
            <p className="text-sm text-black dark:text-white">{item.subDomain}</p>
          </div>
          {/* <div className="flex items-center px-2">
            <p className="text-sm text-black dark:text-white">{item.score}</p>
          </div> */}
          <div className="flex items-center px-2">
            <p className="text-sm text-black dark:text-white">{narrative}</p>
          </div>
        </div>
      );
    });
  };

  const cleanTitle = (title) => {
    return title.replace(/^\d+\.\s*/, "").replace(/Report\s*$/, "");
  };

  // Multi-bar chart for the 4 sections
  const renderOverallChart = () => {
    const data = {
      labels: ['Commercial', 'Financial', 'Operations', 'Legal'],
      datasets: [
        {
          label: 'Overall Score',
          data: [
            scoreData.commercial?.percentage || 0,
            scoreData.financial?.percentage || 0,
            scoreData.operations?.percentage || 0,
            scoreData.legal?.percentage || 0
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
      ]
    };

    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    };

    return <Bar data={data} options={options} />;
  };

  const renderSection = (title, sectionData) => {
    // Generate the key from the title
    const domainKey = title.toLowerCase().replace(/[^a-z]/g, "");

    // Get the score status and percentage from scoreData
    const sectionScore = scoreData[domainKey]?.percentage || 0;
    const sectionStatus = scoreData[domainKey]?.status || "Not ready";

    // Determine the status color
    const overallStatusColor = sectionStatus === "Ready" ? "text-green-500" : "text-red-500";

    return (
      <div className="mt-4 rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mb-4">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-sky-700 dark:text-white">{title}</h4>
        </div>
        <div className="grid grid-cols-2 border-t-2 border-b-2 border-stroke py-4 px-4 dark:border-strokedark">
          <div className="flex items-center px-2">
            <p className="text-sm text-black dark:text-white font-semibold">Overall {cleanTitle(title)} Readiness</p>
          </div>
          <div className="flex items-center justify-end px-2">
            <p className={`text-sm font-semibold ${overallStatusColor}`}>{sectionStatus}</p>
          </div>
        </div>
        <div>
          {Object.keys(sectionData).map((subTitle, index) => (
            <div key={index}>
              <div className="bg-gray-100 p-4 dark:bg-gray-800">
                <h5 className="text-lg font-bold text-gray-700 dark:text-gray-300">{subTitle}</h5>
                {renderTableHeaders()}
                {renderTableRows(sectionData[subTitle])}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="py-6 px-4 md:px-6 xl:px-7.5 flex justify-between items-center">
          <h4 className="text-xl font-semibold text-black dark:text-white">Business Assessment Report</h4>
        </div>
        <div className="p-4">
          {renderOverallChart()} {/* Render the multi-bar chart for the 4 sections */}
        </div>
      </div>

      {renderSection("Commercial", data.commercial)}
      {renderSection("Financial", data.financial)}
      {renderSection("Operations", data.operations)}
      {renderSection("Legal", data.legal)}
    </div>
  );
};

export default Page;