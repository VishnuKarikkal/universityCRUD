import * as yup from "yup";

import { rgxCharacter, rgxUrl } from "../../../../constants/regexConstants";

export const universityDataSchema = () =>
  yup.object().shape({
    name: yup
      .string()
      .trim()
      .required("Name is required")
      .min(10, "Minimum 10 characters required"),
    country: yup
      .string()
      .trim()
      .required("country name is required")
      .matches(rgxCharacter, "Invalid input"),
    web_page: yup
      .string()
      .trim()
      .required("web page is required")
      .matches(rgxUrl, "Invalid URL"),
  });
