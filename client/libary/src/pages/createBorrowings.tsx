import React, { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete, Paper, Container } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { LibBookInformation, LibReader } from '../interfaces';
import { useParams } from 'react-router-dom';
import { createBorrow } from '../api/borrowing';
import { getAllBooks } from '../api/information';
import { getAllReaders } from '../api/reader';
import { styles } from '../componnents/createBorrowings/style';
import  { showAlert } from '../componnents/resApiModal';

export default function CreateBorrowings() {
  const [readers, setReaders] = useState<LibReader[]>([]);
  const [selectedBook, setSelectedBook] = useState<LibBookInformation | null>(null);
  const [formData, setFormData] = useState<{ Reader?: LibReader; Book?: LibBookInformation }>({});
  const { bookId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
    
        const responseReaders = await getAllReaders();
        setReaders(responseReaders);
      
        const response = await getAllBooks();
        const selectedBookFromServer = response.find((b: LibBookInformation) => b.id !== undefined && String(b.id) === bookId);
        setSelectedBook(selectedBookFromServer);
        handleChangeValue("Book", selectedBookFromServer);
    
    };

    fetchData();
  }, []);

  const handleChangeValue = (name: string, value: LibReader | null | LibBookInformation) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const borrowData = {
      book_id: formData.Book?.id,
      reader_id: formData.Reader?.id
    };
    const response = await createBorrow(borrowData);
    if (response.error) {
      showAlert({ isError: true, message: "Something went wrong!" });
    } else {
      showAlert({ isError: false, message: "Borrow created successfully" });
    }
  };
  ;

  return (
    <Container component="main" maxWidth="md" sx={styles.continer}>
      <Paper elevation={3} sx={styles.paper}>
        <form onSubmit={onSubmit}>
          <Typography variant="h5" id="Title" sx={styles.title}>
            BORROWINGS
          </Typography>

          <Autocomplete
            disablePortal
            id="combo-box-reader"
            options={readers}
            value={formData.Reader}
            onChange={(e, value) => handleChangeValue("Reader", value)}
            getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
            renderInput={(params) => <TextField {...params} label="Reader" sx={styles.autocomplete} />}
          />
          <TextField
            label="Book"
            value={selectedBook?.name || ''}
            disabled
            sx={styles.autocomplete} 
          />

          <Box sx={styles.button}>
            <Button type="submit" variant="contained" color="primary">
              Create Borrowings
            </Button>
          </Box>

        </form>
      </Paper>
    </Container>
  );
}
