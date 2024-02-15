import * as React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Typography,
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { LibBorrowing } from '../interfaces'
import {
  columns,
  convertData,
} from '../componnents/borrowings_reader_table/config'
import FiltersComponent from '../componnents/borrowings_reader_table/navFilter'
import { styles } from '../componnents/borrowings_reader_table/style'
import SweetAlertComponent from '../componnents/returnModal'
import { returnBook } from '../Api/borrowing'
import { getBorrowingsByReader } from '../Api/reader'

const ReaderBorrowingsTable = () => {
  const [rows, setRows] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [bookToReturn, setBookToReturn] = useState<number | null>(null)
  const [filters, setFilters] = useState({
    searchBorrowDate: null,
    searchBookName: '',
    displayAll: false,
  })
  const { readerId = null } = useParams()
  const fetchDataAndSetRows = async () => {
    const response = await getBorrowingsByReader(readerId)

    const filteredRows: LibBorrowing[] = response.filter(
      (item: LibBorrowing) => {
        const borrowDate =
          item.borrowDate instanceof Date
            ? item.borrowDate
            : new Date(item.borrowDate)
        const formattedBorrowDate = borrowDate
          ? borrowDate.toISOString().slice(0, 10)
          : ''

        const formattedSearchDate = filters.searchBorrowDate
          ? new Date(
              new Date(filters.searchBorrowDate).getTime() +
                24 * 60 * 60 * 1000,
            )
              .toISOString()
              .slice(0, 10)
          : ''

        return (
          (formattedBorrowDate === formattedSearchDate ||
            !formattedSearchDate) &&
          item.book?.information.name
            ?.toLowerCase()
            .includes(filters.searchBookName.toLowerCase())
        )
      },
    )

    setRows(convertData(filteredRows))
  }

  useEffect(() => {
    fetchDataAndSetRows()
  }, [readerId, filters])

  const returnBorrow = async (borrowingId: string) => {
    await returnBook(borrowingId)
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

  const handleRowClick = (row: number) => {
    setBookToReturn(row)
  }

  const handleCloseModal = (res: boolean) => {
    if (res && typeof bookToReturn === 'string') {
      returnBorrow(bookToReturn)
    }

    setBookToReturn(null)
  }
  const handleChangeValue = (
    name: string,
    value: Date | null | boolean | string,
  ) => {
    setFilters((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h2" component="div" sx={styles.titleTable}>
          Borrowings Table
        </Typography>
      </Box>
      <FiltersComponent
        handleChangeValue={handleChangeValue}
        filterObject={filters}
      />
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
                .map((row) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    onClick={
                      row.Return_date === ''
                        ? () => {
                            handleRowClick(row.code)
                          }
                        : undefined
                    }
                  >
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={'center'}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
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
      {bookToReturn !== null && (
        <SweetAlertComponent
          onConfirm={() => {
            handleCloseModal(true)
          }}
          onCancel={() => {
            handleCloseModal(false)
          }}
        />
      )}
    </>
  )
}
export default ReaderBorrowingsTable
