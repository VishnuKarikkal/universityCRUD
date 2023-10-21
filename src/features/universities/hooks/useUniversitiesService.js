import { useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  universityList,
  filteredUniversityList,
  universitiesActions,
} from "../store";

import { getUniversityList } from "../api";

export const useUniversitiesService = () => {
  const dispatch = useAppDispatch();
  return {
    universityList: useAppSelector(universityList),
    filteredUniversityList: useAppSelector(filteredUniversityList),

    setUniversityList: useCallback(
      (data) => {
        dispatch(universitiesActions.setUniversityList(data));
      },
      [dispatch]
    ),

    setFilteredUniversityList: useCallback(
      (data) => {
        dispatch(universitiesActions.setFilteredUniversityList(data));
      },
      [dispatch]
    ),

    getUniversityList: useCallback(() => getUniversityList(), []),
  };
};
