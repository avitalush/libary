import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  TextField,
  Button,
  Container,
  Paper,
  Autocomplete,
  Typography,
} from '@mui/material'
import { FormDataBook, LibPublisher } from '../interfaces'
import { getAllPublishers } from '../Api/publisher'
import { createBook } from '../Api/information'
import { showAlert } from '../componnents/resApiModal'
import { useNavigate } from 'react-router-dom'
import { fieldsForm, schema } from '../componnents/createBook/config'
import { styles } from '../componnents/createBook/style'

type NameType =
  | 'name'
  | 'author'
  | 'publicationYear'
  | 'price'
  | 'numOfCopies'
  | 'publisher'
  | 'publisher.name'
  | 'publisher.id'
  | 'publisher.address'
  | 'publisher.email'
  | 'publisher.informationBooks'

const MyForm: React.FC = () => {
  const { control, handleSubmit, formState, setValue } = useForm<FormDataBook>({
    resolver: yupResolver(schema),
  })
  const navigate = useNavigate()
  const [publishers, setPublishers] = useState<LibPublisher[]>([])
  const onSubmit: SubmitHandler<FormDataBook> = async (data) => {
    const publisherId = (data.publisher as LibPublisher)?.id || null
    const publicationDate = new Date(data.publicationYear, 0, 2)
    const response = await createBook({
      book: {
        name: data.name,
        publicationYear: publicationDate,
        author: data.author,
        publisher: publisherId,
        price: data.price,
      },
      copiesNumber: data.numOfCopies,
    })
    if (response?.error) {
      showAlert({ isError: true, message: 'Something went wrong!' })
    } else {
      showAlert({ isError: false, message: 'Book created successfully' })
      navigate('/')
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response: LibPublisher[] = await getAllPublishers()
      setPublishers(response)
    }
    fetchData()
  }, [])

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
                  {typeField === 'select' ? (
                    <Autocomplete
                      {...field}
                      id="combo-box-publisher"
                      options={publishers}
                      getOptionLabel={(option: LibPublisher | {}) =>
                        (option as LibPublisher)?.name || ''
                      }
                      onChange={(event, value) => {
                        setValue('publisher', (value as LibPublisher) || null)
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Publisher"
                          variant="outlined"
                          margin="normal"
                          fullWidth
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      label={nameField}
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      type={typeField}
                      {...field}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ''
                      }
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
  )
}

export default MyForm
