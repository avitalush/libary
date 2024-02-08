import Button from '@mui/material/Button';
import { TextField, Typography, Paper, Container } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPublisher } from '../api/publisher';
import { schema } from '../componnents/createPublisher/config';
import { FormDataPublisher } from '../interfaces';
import { styles } from '../componnents/createPublisher/style';
import  { showAlert } from '../componnents/resApiModal';

export default function CreatePublisher() {

  const { control, handleSubmit, formState } = useForm<FormDataPublisher>({
    resolver: yupResolver(schema),
  });
 
  const onSubmit: SubmitHandler<FormDataPublisher> = async (data) => {
  
    
      const response = await createPublisher( data );
      if (response?.error) {
        showAlert({ isError: true, message: "Something went wrong!" });
      } else {
        showAlert({ isError: false, message: "Book created successfully" });
      }
  };
 
  return (
    <Container component="main" maxWidth="md" sx={styles.container}>
      <Paper elevation={3} sx={styles.paper}>
      <Typography variant="h5" id="Title" sx={styles.title}>
          ADD Publisher
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(schema.fields).map((key)=>(
                  <Controller
            name={key as "name" | "address" | "email"}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                label={key}
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ''}
              />
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


