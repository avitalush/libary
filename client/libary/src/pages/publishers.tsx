import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,Box,Button,Typography
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LibPublisher } from "../interfaces";
import { getAllPublishers } from "../api/publisher";
import { columns, convertData } from "../componnents/publishers/config";
import { styles } from "../componnents/publishers/style";
import ExcelDownloadButton from "../componnents/excelDown";

const PublisherTable: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const handleDelete = async (publisherId: number) => {
    try {
   
      const response: LibPublisher[] = await getAllPublishers();
      setRows(convertData(response));
    } catch (error) {
      console.error("Failed to delete publisher", error);
    }
  };
  useEffect(() => {
    const fetchDataAndSetRows = async () => {
      const response: LibPublisher[] = await getAllPublishers();
      setRows(convertData(response));
    };

    fetchDataAndSetRows();
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddReaderClick = () => {
    navigate("/createpublisher");
  };

  return (
    <>
      
        <Typography
          variant="h2"
          component="div"
          sx={styles.titleTable}
        >
          Publishers Table
        </Typography>
        <Box sx={styles.box}>
        <Button
          variant="contained"
          color="primary"
          sx={[styles.button,styles.cell]}

          onClick={handleAddReaderClick}
        >
          Add Publisher
        </Button>
        <ExcelDownloadButton />  
      </Box>
      <Paper sx={styles.paper}>
        <TableContainer sx={styles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={"center"}  sx={styles.cell}>
                            {value}
                          </TableCell>
                        );
                      })}
                            <TableCell align="center">
                        <Button variant="outlined" color="error" onClick={() => handleDelete(row.code)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
  
      </Paper>
    </>
  );
};

export default PublisherTable;
