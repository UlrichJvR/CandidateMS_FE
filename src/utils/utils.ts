import { Candidate } from "../api/candidateService";

export const aggregateCandidatesBySkills = (candidates: Candidate[]) => {
  const skillCount: Record<string, number> = {};

  candidates.forEach((candidate) => {
    candidate.skills.forEach((skill) => {
      if (skillCount[skill]) {
        skillCount[skill]++;
      } else {
        skillCount[skill] = 1;
      }
    });
  });

  return skillCount;
};
