import React, { useState, useEffect } from 'react'
import {
  Button,
  TextField,
  Autocomplete,
  Paper,
  Container,
} from '@mui/material'
import { Box, Typography } from '@mui/material'
import { LibBookInformation, LibReader } from '../interfaces'
import { useParams, useNavigate } from 'react-router-dom'
import { createBorrow } from '../Api/borrowing'
import { getAllBooks } from '../Api/information'
import { getAllReaders } from '../Api/reader'
import { styles } from '../componnents/createBorrowings/style'
import { showAlert } from '../componnents/resApiModal'

export default function CreateBorrowings() {
  const [readers, setReaders] = useState<LibReader[]>([])
  const [selectedBook, setSelectedBook] = useState<LibBookInformation | null>(
    null,
  )
  const [formData, setFormData] = useState<{
    Reader?: LibReader
    Book?: LibBookInformation
  }>({})
  const { bookId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const responseReaders = await getAllReaders()
      setReaders(responseReaders)

      const response = await getAllBooks()
      const selectedBookFromServer = response.find(
        (b: LibBookInformation) =>
          b.id !== undefined && String(b.id) === bookId,
      )
      setSelectedBook(selectedBookFromServer)
      handleChangeValue('Book', selectedBookFromServer)
    }

    fetchData()
  }, [])

  const handleChangeValue = (
    name: string,
    value: LibReader | null | LibBookInformation,
  ) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const borrowData = {
      book: formData.Book?.id,
      reader: formData.Reader?.id,
    }
    const response = await createBorrow(borrowData)
    if (response.error) {
      showAlert({ isError: true, message: 'Something went wrong!' })
    } else {
      showAlert({ isError: false, message: 'Borrow created successfully' })
      navigate('/borrowings')
    }
  }
  return (
    <Container component="main" maxWidth="md" sx={styles.continer}>
      <Paper elevation={3} sx={styles.paper}>
        <form onSubmit={onSubmit}>
          <Typography variant="h5" id="Title" sx={styles.title}>
            BORROWING
          </Typography>

          <Autocomplete
            disablePortal
            id="combo-box-reader"
            options={readers}
            value={formData.Reader}
            onChange={(e, value) => handleChangeValue('Reader', value)}
            getOptionLabel={(option) =>
              option.firstName + ' ' + option.lastName
            }
            renderInput={(params) => (
              <TextField {...params} label="Reader" sx={styles.autocomplete} />
            )}
          />
          <TextField
            label="Book"
            value={selectedBook?.name || ''}
            disabled
            fullWidth
            sx={styles.autocomplete}
          />

          <Box sx={styles.button}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Borrowings
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
