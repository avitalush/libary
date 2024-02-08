import Button from "@mui/material/Button";
import { TextField, Typography, Paper, Container, Alert } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createReader } from "../api/reader";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { schema } from "../componnents/createReader/config";
import { FormDataReader } from "../interfaces";
import { styles } from "../componnents/createReader/style";
import  { showAlert } from "../componnents/resApiModal";





export default function CreateReader() {

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormDataReader>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormDataReader> = async (data) => {
const response=await createReader(data);
if (response?.error) {
  showAlert({ isError: true, message: "Something went wrong!" });
} else {
  showAlert({ isError: false, message: "Book created successfully" });
}
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={styles.container}
    >
      <Paper
        elevation={3}
        sx={styles.paper}
      >
        <Typography variant="h5" id="Title" sx={styles.title}>
          ADD READER
        </Typography>
    
              <form onSubmit={handleSubmit(onSubmit)}>
              {Object.keys(schema.fields).map((key)=>(
  
          <Controller
            name={key as "first_name" | "last_name" | "birth_date"}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
              {key !== 'birth_date' ? (
              <TextField
                label={key}
                variant="outlined"
                margin="normal"
                fullWidth
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
              />
              ):(
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
    <DatePicker
      onChange={(date) => field.onChange(date)}
      value={field.value}
      
      format="DD/MM/YYYY"
    />
      </DemoContainer>
              </LocalizationProvider>
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
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
