import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/material/CircularProgress";

import useStyles from "../usestyles";

import {
  TableBody,
  Grid,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableHead,
  Paper,
  TablePagination,
  Typography,
  Tooltip,
  TableSortLabel,
} from "@mui/material";

import { useUniversitiesService } from "../../hooks";

const AddOrEditData = React.lazy(() => import("../AddOrEditData"));

const List = () => {
  const classes = useStyles();

  const {
    universityList,
    filteredUniversityList,
    getUniversityList,
    setUniversityList,
    setFilteredUniversityList,
  } = useUniversitiesService();

  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState({});
  const [orderBy, setOrderBy] = useState("");

  const fetchAllUniversityData = () => {
    setLoading(true);
    getUniversityList()
      .then((res) => {
        if (res?.data?.length) {
          setUniversityList({ data: res.data, totalCount: res.data.length });

          setFilteredUniversityList({
            data: res.data.filter((_, index) => index < 20),
            totalCount: 20,
            currentPage: 0,
            start: 0,
            end: 20,
          });

          alert("Data fetched successfully!");
        }
      })
      .catch(() => {
        alert("Error fetching data!");
      })
      .finally(() => setLoading(false));
  };

  const getRandomBackgroundColor = () => {
    const randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });

    setBackgroundColor(randomColor);
  };

  useEffect(() => {
    fetchAllUniversityData();

    getRandomBackgroundColor();
  }, []);

  const arrangeListData = (listData) => {
    setUniversityList({ data: listData, totalCount: listData?.length });

    const currentPageData = filteredUniversityList;

    setFilteredUniversityList({
      data: listData?.filter(
        (_, index) =>
          index >= currentPageData?.start && index < currentPageData.end
      ),
      totalCount: 20,
      currentPage: currentPageData?.currentPage,
      start: currentPageData?.start,
      end: currentPageData?.end,
    });
  };

  const sortList = (list, sortOrder) => {
    return list?.sort((a, b) => {
      if (sortOrder === "asc") {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      } else {
        if (a.name > b.name) return -1;
        if (a.name < b.name) return 1;
        return 0;
      }
    });
  };

  const applySortFilterOnData = (sortOrder, filterParams) => {
    setLoading(true);
    const list = universityList?.data ? [...universityList.data] : [];

    if (sortOrder) {
      const sortedList = sortList(list, sortOrder);

      arrangeListData(sortedList);
    }

    setLoading(false);
  };

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleUpdate = (universityData) => {
    setSelectedCollege(universityData);
    setIsEdit(true);
  };

  const handleClose = () => {
    setIsAdd(false);
    setIsEdit(false);
    setSelectedCollege({});
    setOrderBy("");
  };

  const paginateUniversityData = (pageNum) => {
    const startIndex = pageNum * 20;
    const endIndex = (pageNum + 1) * 20;

    if (universityList?.data?.length) {
      const newPageData = universityList.data.filter(
        (_, index) => index >= startIndex && index < endIndex
      );

      setFilteredUniversityList({
        data: newPageData,
        totalCount: 20,
        currentPage: pageNum,
        start: startIndex,
        end: endIndex,
      });
    }
  };

  const handleSort = () => {
    if (orderBy === "asc") {
      setOrderBy("desc");
      applySortFilterOnData("desc", []);
    } else {
      setOrderBy("asc");
      applySortFilterOnData("asc", []);
    }
  };

  const handlePageChange = (_, page) => {
    if (page >= 0 && page <= 100) {
      paginateUniversityData(page);
    }
  };

  const renderListData = () => {
    if (filteredUniversityList?.data?.length) {
      return (
        <Grid
          container
          className={classes.input_fields}
          justifyContent={"center"}
        >
          <Grid item paddingBottom={1}>
            <Typography variant="h4" fontWeight={500}>
              College List
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer className={classes.table} component={Paper}>
              <Table
                stickyHeader
                sx={{ minWidth: 800, overflowX: "scroll" }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center">
                      <TableSortLabel
                        active={orderBy !== ""}
                        direction={orderBy}
                        onClick={() => {
                          handleSort();
                        }}
                      >
                        <Typography
                          variant="body1"
                          fontStyle={"italic"}
                          fontWeight={500}
                        >
                          Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontStyle={"italic"}
                        fontWeight={500}
                      >
                        Country
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontStyle={"italic"}
                        fontWeight={500}
                      >
                        Webpages
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontStyle={"italic"}
                        fontWeight={500}
                      >
                        Edit
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUniversityList?.data?.length > 0 ? (
                    filteredUniversityList?.data?.map((obj) => (
                      <TableRow key={obj?.name}>
                        <TableCell align="center">{obj?.name}</TableCell>
                        <TableCell align="center">{obj?.country}</TableCell>
                        <TableCell align="center">
                          {obj?.web_pages?.map((pageName) => pageName)}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleUpdate(obj)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[20]}
                rowsPerPage={20}
                component="div"
                count={universityList?.totalCount ?? 0}
                page={filteredUniversityList?.currentPage}
                onPageChange={handlePageChange}
              />
            </TableContainer>
          </Grid>
        </Grid>
      );
    }

    return null;
  };

  const getAddNewButton = () => {
    if (!isEdit && !isAdd && !loading) {
      return (
        <Grid item height={"50vh"} display={"flex"} alignItems={"end"}>
          <Tooltip title="Add New">
            <IconButton
              sx={{
                border: "3px solid grey",
                backgroundColor: "darkgoldenrod",
              }}
              onClick={() => handleAdd()}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      );
    }

    return null;
  };

  const renderAddOrEditComponent = () => (
    <AddOrEditData
      isEdit={isEdit}
      selectedData={selectedCollege}
      onClose={() => {
        handleClose();
      }}
    />
  );

  const renderListOrOtherComponents = () => {
    if (loading) {
      return <CircularProgress />;
    } else {
      if (!isEdit && !isAdd) {
        return renderListData();
      }
      return renderAddOrEditComponent();
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: backgroundColor,
        minHeight: "96vh",
        borderRadius: "8px",
      }}
      padding={1}
      alignItems={"center"}
    >
      <Grid container>
        <Grid item xs={11}>
          {renderListOrOtherComponents()}
        </Grid>

        {getAddNewButton()}
      </Grid>
    </Grid>
  );
};

export default List;
