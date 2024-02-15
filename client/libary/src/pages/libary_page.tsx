import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Button, Typography, Grid, Container } from '@mui/material'
import { LibBookInformation, LibPublisher } from '../interfaces'
import { useNavigate } from 'react-router-dom'
import { addCopies, deleteInfo, getAllBooks } from '../Api/information'
import CopiesComponent from '../componnents/libaryPage/copiesModal'
import BookCard from '../componnents/libaryPage/bookCard'
import FiltersComponent from '../componnents/libaryPage/filteredBooks'
import { styles } from '../componnents/libaryPage/style'
import { showAlert } from '../componnents/resApiModal'
import { publisherModal } from '../componnents/libaryPage/PublisherModal'

const defaultTheme = createTheme()

export default function Album() {
  const [cards, setCards] = useState<LibBookInformation[]>([])
  const [nameFilter, setNameFilter] = useState<string>('')
  const [showModal, setShowModal] = useState<LibBookInformation | null>(null)
  const navigate = useNavigate()

  const handleOpen = (publisher: LibPublisher | null) => {
    if (publisher) {
      publisherModal({ publisher })
    }
  }

  const handleCopies = (id: string) => {
    navigate(`copies/${id}`)
  }
  const handleTaken = (id: string) => {
    navigate(`/createborrowings/${id}`)
  }
  const handleAddClick = (book: LibBookInformation) => {
    setShowModal(book)
  }

  const handleNumberInputSubmit = async (numberInput: number) => {
    const response = await addCopies({
      idBook: showModal?.id,
      copiesNumber: numberInput,
    })

    if (response?.error) {
      showAlert({ isError: true, message: 'Something went wrong!' })
    } else {
      showAlert({
        isError: false,
        message: `${numberInput} copies added successful`,
      })
    }
  }
  const handleNameFilterChange = (value: string) => {
    setNameFilter(value)
  }

  const fetchData = async () => {
    const response = await getAllBooks()
    const filteredRows = response.filter((item: LibBookInformation) => {
      return (
        item.name
          ?.toLocaleLowerCase()
          .includes(nameFilter ? nameFilter.toLocaleLowerCase() : '') ||
        item.publisher.name
          .toLocaleLowerCase()
          .toLowerCase()
          .includes(nameFilter.toLowerCase())
      )
    })
    setCards(filteredRows)
  }

  useEffect(() => {
    fetchData()
  }, [nameFilter])

  const handleDeleteClick = async (id: string) => {
    const response = await deleteInfo(id)
    if (response?.error) {
      showAlert({ isError: true, message: 'Something went wrong!' })
    } else {
      showAlert({ isError: false, message: 'Book deleted successfully' })
    }
    fetchData()
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={styles.box}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={[styles.font, styles.size]}
          >
            LIBRARY
          </Typography>
          <Box>
            <FiltersComponent
              handleNameFilterChange={handleNameFilterChange}
              nameFilter={nameFilter}
            />
            <Button
              variant="contained"
              color="primary"
              sx={[styles.button, styles.font]}
              onClick={() => navigate('/createbook')}
            >
              Add Book
            </Button>
          </Box>
        </Container>
      </Box>
      <Box sx={styles.scroll}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={3}>
            {cards.map((card: LibBookInformation) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <BookCard
                  card={card}
                  handleOpenPublisher={handleOpen}
                  handleCopies={handleCopies}
                  handleAddClick={handleAddClick}
                  handleTaken={handleTaken}
                  handleDeleteClick={handleDeleteClick}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {showModal !== null && (
        <CopiesComponent onConfirm={handleNumberInputSubmit} />
      )}
    </ThemeProvider>
  )
}
