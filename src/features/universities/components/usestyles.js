import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  input_fields: {
    display: "flex",
  },
  textField: {
    width: "30%",
  },
  form_button: {
    "&:hover": {
      borderColor: "#0062cc",
      boxShadow: "none",
    },
  },
  table: {
    maxWidth: "90%",
  },
  custom_snackbar: {
    top: "1rem",
    right: "1rem",
    zIndex: "1302",
  },
}));
export default useStyles;
