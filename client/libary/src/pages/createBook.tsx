import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Container, Paper, Autocomplete, Typography } from '@mui/material';
import { FormDataBook, LibPublisher } from '../interfaces';
import { getAllPublishers } from '../api/publisher';
import { createBook } from '../api/information';
import { styles } from '../componnents/createBook/style';
import { fieldsForm, schema } from '../componnents/createBook/config';
import { showAlert } from '../componnents/resApiModal';
type NameType = "name" | "author" | "publication_year" | "price"|"numOfCopies" | "publisher" | "publisher.name" | "publisher.id" | "publisher.address" | "publisher.email" | "publisher.information_books" ;

const MyForm: React.FC = () => {
  const { control, handleSubmit, formState,setValue } = useForm<FormDataBook>({
    resolver: yupResolver(schema),
  });
  const [publishers, setPublishers] = useState<LibPublisher[]>([]);
  const onSubmit: SubmitHandler<FormDataBook> = async (data) => {

    
       const publisherId = (data.publisher as LibPublisher)?.id || null;
      const response = await createBook({
            book: {
              name: data.name,
              publication_year: data.publication_year,
              author: data.author,
              publisher: publisherId,
               price:data.price
            },
            copiesNumber: data.numOfCopies,
          });
          if (response?.error) {
            showAlert({ isError: true, message: "Something went wrong!" });
          } else {
            showAlert({ isError: false, message: "Book created successfully" });
          }
  };
  useEffect(() => {
    const fetchData = async () => {
      
        const response: LibPublisher[] = await getAllPublishers();
        setPublishers(response);
      
    };
  
    fetchData();
  }, []);
  
  return (
    <Container component="main" maxWidth="md" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
      <Typography variant="h5" id="Title" sx={styles.title}>
          ADD BOOK
        </Typography>
   
        <form onSubmit={handleSubmit(onSubmit)}>
        {fieldsForm.map(({ nameField, typeField }) => (
  <Controller
    key={nameField}
    name={nameField as NameType}
    control={control}
    render={({ field, fieldState }) => (
      <>
        {typeField !== 'select' ? (
          <TextField
            label={nameField}
            variant="outlined"
            margin="normal"
            fullWidth
            type={typeField}
            {...field}
            error={!!fieldState.error}
            helperText={fieldState.error ? fieldState.error.message : ''}
          />
        ):(
          <Autocomplete
          {...field}
          id="combo-box-publisher"
          options={publishers}
          getOptionLabel={(option: LibPublisher | {}) => (option as LibPublisher)?.name || ''}
          onChange={(event, value) => {
            setValue('publisher', (value as LibPublisher) || null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Publisher"
            />
          )}
        />
        )}
        
      </>
    )}
  />
))}  
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={styles.button}
            disabled={formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default MyForm;
