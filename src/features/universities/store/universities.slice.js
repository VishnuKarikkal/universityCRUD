// DUCKS pattern
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  universityList: { data: [], totalCount: 0 },
  filteredUniversityList: {
    data: [],
    totalCount: 20,
    currentPage: 0,
    start: 0,
    end: 20,
  },
};

// slice
export const universitiesSlice = createSlice({
  name: "universities",
  initialState,
  reducers: {
    setUniversityList: (state, action) => {
      state.universityList = action.payload;
    },
    setFilteredUniversityList: (state, action) => {
      state.filteredUniversityList = action.payload;
    },
  },
});

// Actions
export const universitiesActions = {
  setUniversityList: universitiesSlice.actions.setUniversityList,
  setFilteredUniversityList:
    universitiesSlice.actions.setFilteredUniversityList,
};

// Selectors
export const universityList = (state) => state.universities.universityList;
export const filteredUniversityList = (state) =>
  state.universities.filteredUniversityList;

// Reducer
export default universitiesSlice.reducer;
