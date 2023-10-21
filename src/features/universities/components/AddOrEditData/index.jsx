import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { universityDataSchema } from "./schema";
import { yupResolver } from "@hookform/resolvers/yup";
import useStyles from "../usestyles";
import { useUniversitiesService } from "../../hooks";

const AddOrEditData = ({ isEdit, selectedData, onClose }) => {
  const classes = useStyles();

  const { universityList, setUniversityList, setFilteredUniversityList } =
    useUniversitiesService();

  const { handleSubmit, control, setValue } = useForm({
    reValidateMode: "onBlur",
    mode: "all",
    resolver: yupResolver(universityDataSchema()),
  });

  useEffect(() => {
    if (isEdit) {
      setValue("name", selectedData?.name);
      setValue("country", selectedData?.country);
      setValue("web_page", selectedData?.web_pages?.[0]);
    }
  }, []);

  const clearFields = () => {
    setValue("name", "");
    setValue("country", "");
    setValue("web_page", "");
  };

  const isCollegeExists = (newCollege) => {
    if (universityList?.data?.length) {
      if (
        universityList.data.filter(
          (college) => college?.name === newCollege?.name
        )?.length
      )
        return true;
    }
    return false;
  };

  const addNewCollege = (universityListData, newCollegeData) => {
    universityListData = [newCollegeData, ...universityListData];

    setUniversityList({
      data: universityListData,
      totalCount: universityListData.length,
    });

    setFilteredUniversityList({
      data: universityListData.filter((_, index) => index < 20),
      totalCount: 20,
      currentPage: 0,
      start: 0,
      end: 20,
    });
    clearFields();
    alert("College added!");
  };

  const updateCollege = (universityListData, updatedCollegeData) => {
    const newList = universityListData?.map((college) =>
      college?.name === selectedData?.name
        ? {
            name: updatedCollegeData?.name,
            country: updatedCollegeData?.country,
            web_pages: updatedCollegeData?.web_pages,
          }
        : college
    );

    setUniversityList({
      data: newList,
      totalCount: universityListData.length,
    });

    setFilteredUniversityList({
      data: newList.filter((_, index) => index < 20),
      totalCount: 20,
      currentPage: 0,
      start: 0,
      end: 20,
    });

    clearFields();
    onClose();
    alert("College updated!");
  };

  const onSubmit = (data) => {
    const newCollegeData = {
      name: data.name,
      country: data.country,
      web_pages: [data.web_page],
    };

    let universityListData = universityList.data;

    if (universityListData) {
      if (isCollegeExists(newCollegeData)) {
        alert("College exists!");
      } else {
        if (isEdit) {
          updateCollege(universityListData, newCollegeData);
        } else {
          addNewCollege(universityListData, newCollegeData);
        }
      }
    }
  };

  return (
    <>
      <Typography variant="h5">
        {isEdit ? "Edit College" : "Add New College"}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          className={classes.input_fields}
          justifyContent={"center"}
          spacing={3}
          padding={1}
        >
          <Grid item xs={12}>
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={value}
                  name="Name"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
                  className={classes.textField}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="country"
                  variant="outlined"
                  value={value}
                  name="Salary"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
                  className={classes.textField}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="web_page"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="outlined-basic"
                  label="Web page"
                  variant="outlined"
                  value={value}
                  name="Age"
                  onChange={onChange}
                  error={error}
                  helperText={error?.message ? error.message : ""}
                  className={classes.textField}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              varient="contained"
              sx={{ border: "1px solid lightgrey" }}
              className={classes.form_button}
            >
              {isEdit ? "Update" : "Submit"}
            </Button>
            <Button
              varient="contained"
              className={classes.form_button}
              onClick={onClose}
              sx={{ border: "1px solid lightgrey" }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddOrEditData;
