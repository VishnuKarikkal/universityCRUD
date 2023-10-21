import axios from "axios";

const LIST_URL = `http://universities.hipolabs.com/search?country=United+States`;

export const getUniversityList = () => axios.get(LIST_URL);
