import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../../api/candidateService.ts";

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

interface CandidateState {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidateState = {
  candidates: [],
  loading: false,
  error: null,
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async () => {
    const response = await getCandidates();
    return response;
  }
);

export const addNewCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (candidate: Omit<Candidate, "id">) => {
    const response = await createCandidate(candidate);
    return response;
  }
);

export const updateCandidateById = createAsyncThunk(
  "candidates/updateCandidate",
  async (payload: { id: string; candidate: Omit<Candidate, "id"> }) => {
    const response = await updateCandidate(payload.id, payload.candidate);
    return response;
  }
);

export const removeCandidateById = createAsyncThunk(
  "candidates/removeCandidate",
  async (id: string) => {
    await deleteCandidate(id);
    return id;
  }
);

// Redux slice
const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    setCandidates: (state, action: PayloadAction<Candidate[]>) => {
      state.candidates = action.payload;
    },
    addCandidate: (state, action: PayloadAction<Candidate>) => {
      state.candidates.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling the fetchCandidates actions
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCandidates.fulfilled,
        (state, action: PayloadAction<Candidate[]>) => {
          state.loading = false;
          state.candidates = action.payload;
        }
      )
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candidates";
      })
      // Handling the addNewCandidate actions
      .addCase(
        addNewCandidate.fulfilled,
        (state, action: PayloadAction<Candidate>) => {
          state.candidates.push(action.payload);
        }
      )
      // Handling the updateCandidate actions
      .addCase(
        updateCandidateById.fulfilled,
        (state, action: PayloadAction<Candidate>) => {
          const index = state.candidates.findIndex(
            (candidate) => candidate.id === action.payload.id
          );
          if (index !== -1) {
            state.candidates[index] = action.payload; // Update candidate in state
          }
        }
      )
      // Handling the removeCandidate actions
      .addCase(
        removeCandidateById.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.candidates = state.candidates.filter(
            (candidate) => candidate.id !== action.payload
          );
        }
      );
  },
});

export const { addCandidate, setCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;
