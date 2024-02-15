import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteReader, getAllReaders } from '../Api/reader'
import { columns, convertData } from '../componnents/readersTable/config'
import { styles } from '../componnents/readersTable/style'
import showAlert from '../componnents/resApiModal'
import { LibReader, RowReader } from '../interfaces'

const ReaderTable: React.FC = () => {
  const [rows, setRows] = useState<RowReader[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [nameFilter, setNameFilter] = useState<string>('')

  const navigate = useNavigate()
  const fetchDataAndSetRows = async () => {
    const response = await getAllReaders()
    const filteredReaders = response.filter(
      (reader: LibReader) =>
        reader.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        reader.lastName.toLowerCase().includes(nameFilter.toLowerCase()),
    )
    setRows(convertData(filteredReaders))
  }

  useEffect(() => {
    fetchDataAndSetRows()
  }, [nameFilter])

  const handleDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string,
  ) => {
    event.stopPropagation()
    const response = await deleteReader(id)
    if (response?.error) {
      showAlert({ isError: true, message: 'Something went wrong!' })
    } else {
      showAlert({ isError: false, message: 'Reader deleted successfully' })
    }
    fetchDataAndSetRows()
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClick = (
    event: React.MouseEvent<HTMLTableRowElement>,
    readerId: string,
  ) => {
    event.stopPropagation()
    navigate(`/borrowings/${readerId}`)
  }

  const handleAddReaderClick = () => {
    navigate('/createreader')
  }

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNameFilter(event.target.value)
  }

  return (
    <>
      <Box sx={styles.box}>
        <Typography variant="h2" component="div" sx={styles.titleTable}>
          {' '}
          Readers Table
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={[styles.button, styles.cell]}
        onClick={handleAddReaderClick}
      >
        {' '}
        Add Reader
      </Button>
      <Box sx={styles.box}>
        <TextField
          label="Filter by Name"
          variant="outlined"
          size="small"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </Box>
      <Paper sx={styles.paper}>
        <TableContainer sx={styles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={'center'}
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
                .map((row: RowReader) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={(event) => handleClick(event, row.code)}
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="center"
                      >
                        {column.id === 'code'
                          ? row.code
                          : column.id === 'Frist_Name'
                            ? row.Frist_Name
                            : column.id === 'Last_Name'
                              ? row.Last_Name
                              : column.id === 'Age'
                                ? row.Age
                                : ''}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => handleDelete(e, row.code)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
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
  )
}
export default ReaderTable
