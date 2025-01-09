import apiClient from "./axios.ts";

// Candidate type definition
export interface Candidate {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  skills: string[];
  experience: string;
}

// Get all candidates
export const getCandidates = async () => {
  const response = await apiClient.get<Candidate[]>("/candidate/all");
  return response.data;
};

// Get a single candidate by ID
export const getCandidateById = async (id: string) => {
  const response = await apiClient.get<Candidate>(`/candidate/${id}`);
  return response.data;
};

// Create a new candidate
export const createCandidate = async (candidate: Omit<Candidate, "id">) => {
  const response = await apiClient.post<Candidate>("/candidate", candidate);
  return response.data;
};

// Update an existing candidate
export const updateCandidate = async (
  id: string,
  candidate: Omit<Candidate, "id">
) => {
  const response = await apiClient.put<Candidate>(
    `/candidate/${id}`,
    candidate
  );
  return response.data;
};

// Delete a candidate
export const deleteCandidate = async (id: string) => {
  const response = await apiClient.delete(`/candidate/${id}`);
  return response.data;
};
