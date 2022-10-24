import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { COLLECTION, columns, PAGE_OPTIONS } from "./constants";
import { Button } from "@material-ui/core";
import CustomModal from "./CustomModal";
import { StyledUserList } from "../StyledApp";
import Header from "./header";
import SearchBar from "material-ui-search-bar";
function UserList(props) {
  const [userList, setUserList] = useState([]);
  const [openModal, setopenModal] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [filteredRows, setFilteredRows] = useState(userList);
  const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, COLLECTION));
    const querydocs = querySnapshot.docs;
    const userData = querydocs.map((doc) => {
      let docData = doc._document.data.value.mapValue.fields;
      let userObj = {};
      if (docData) {
        Object.keys(docData).forEach((key) => {
          [userObj[key]] = Object.values(docData[key]);
        });
      }
      return userObj;
    });
    setUserList(userData);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  useEffect(() => {
    setFilteredRows(userList);
  }, [userList]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const actionButton = (data) => {
    return (
      <Button className="buttonAction" onClick={() => setopenModal(data)}>
        view
      </Button>
    );
  };
  const filterSearch = (val) => {
    val
      ? setFilteredRows(
          userList.filter(
            (user) =>
              user.email.toLowerCase().includes(val) ||
              user.name.toLowerCase().includes(val)
          )
        )
      : setFilteredRows(userList);
  };
  const usernameImg = (name, image) => {
    return (
      <div
        className="user-avatar-container"
      >
        <Avatar
          src={image}
          className="user-avatar"
        ></Avatar>
        <span className="">{name}</span>
      </div>
    );
  };
  return (
    <>
      <Paper sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
        <Header user={props?.user} />
        {userList ? (
          <StyledUserList>
            <CustomModal open={openModal} setOpen={setopenModal} />
            <SearchBar
              value={search}
              onChange={(val) => {
                setSearch(val);
                filterSearch(val.toLowerCase());
              }}
              onRequestSearch={filterSearch}
              onCancelSearch={() => setFilteredRows(userList)}
              className="searchbar"
            />
            <TableContainer className="contianerTable">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className="textMulish">
                  {filteredRows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.email}
                        >
                          {columns.map((column) => {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "action"
                                  ? actionButton(row)
                                  : column.id === "name"
                                  ? usernameImg(row?.name, row?.image)
                                  : row[column.id]}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={PAGE_OPTIONS}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </StyledUserList>
        ) : (
          <></>
        )}
      </Paper>
    </>
  );
}

export default UserList;
