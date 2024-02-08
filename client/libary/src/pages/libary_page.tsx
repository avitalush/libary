import {useState,useEffect} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Box,Button,Typography,Grid,Container} from '@mui/material';
import { LibBookInformation, LibPublisher } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { addCopies, getAllBooks } from '../api/information';
import CopiesComponent from '../componnents/libaryPage/copiesModal';
import PublisherModal from '../componnents/libaryPage/publisherModal';
import BookCard from '../componnents/libaryPage/bookCard';
import FiltersComponent from '../componnents/libaryPage/filteredBooks';
import { styles } from '../componnents/libaryPage/style';
import  { showAlert } from '../componnents/resApiModal';

const defaultTheme = createTheme();

export default function Album() {
  const [cards, setCards] = useState<LibBookInformation[]>([]);
  const [open, setOpen] = useState<LibPublisher | null>(null);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [showModal, setShowModal] = useState<LibBookInformation | null >(null);;
    const navigate = useNavigate();

  const handleOpen = (publisher: LibPublisher | null) => { 
    if (publisher) {
      setOpen(publisher);
    }
  };

  const handleCopies = (id:number) => {
    navigate(`copies/${id}`)
   };
   const handleTaken = (id:number) => {
     navigate(`/createborrowings/${id}`)
    }; 
    const handleAddClick = (book:LibBookInformation) => {
      setShowModal(book);
    };
  
    const handleNumberInputSubmit = async (numberInput:number) => {
      console.log({
        idBook:showModal?.id,
       copiesNumber: numberInput,
         });
      
        const response = await addCopies({
       idBook:showModal?.id,
      copiesNumber: numberInput,
        });
        console.log({response});
        if (response?.error) {
          showAlert({ isError: true, message: "Something went wrong!" });
        } else {
          showAlert({ isError: false, message: `${numberInput} copies added successful` });
        }

     
       
        setShowModal(null);
     
    };
  const handleNameFilterChange = (value:string) => {
    setNameFilter(value);

  };

  const fetchData = async () => {
   
      const response = await getAllBooks();
      
      const filteredRows = response.filter((item:LibBookInformation) => {    
        return (
          item.name?.includes(nameFilter ? nameFilter : "") ||
          item.publisher.name.toLowerCase().includes(nameFilter.toLowerCase())
        )})
      setCards(filteredRows);

  };

 useEffect(() => {
    fetchData();
  }, [nameFilter]);

  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
          sx={[{
            bgcolor: 'background.paper',
          },styles.box]} >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={styles.font}
            > LIBRARY   </Typography>
          <Box >
            <FiltersComponent
  handleNameFilterChange={handleNameFilterChange}
  nameFilter={nameFilter}
/>
              <Button
                variant="contained"
                color="primary"
                sx={[styles.button,styles.font]}
              
                onClick={() => navigate('/createbook')}
              >
                Add Book
              </Button>
            </Box>
          </Container>
        </Box>
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
              />
            </Grid>            
            ))}
          </Grid>
        </Container>
        {open !== null&&
        <PublisherModal
        open={open}
        />}
 
      {showModal!==null&&
      <CopiesComponent
        onConfirm={handleNumberInputSubmit}
      /> 
      }
    </ThemeProvider>
  );
}
