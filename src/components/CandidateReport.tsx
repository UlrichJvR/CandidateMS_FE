// components/CandidateReport.tsx

import React, { useEffect, useState } from "react";
import { Candidate } from "../api/candidateService";
import { aggregateCandidatesBySkills } from "../utils/utils.ts";

interface CandidateReportProps {
  candidates: Candidate[];
}

const CandidateReport: React.FC<CandidateReportProps> = ({ candidates }) => {
  const [aggregatedData, setAggregatedData] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    const aggregated = aggregateCandidatesBySkills(candidates);
    setAggregatedData(aggregated);
  }, [candidates]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Skills Report
      </h2>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-green-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Skill</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">
              Number of Candidates
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(aggregatedData).map(([skill, count]) => (
            <tr key={skill} >
              <td className="px-4 py-2 text-sm text-gray-700">{skill}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateReport;
