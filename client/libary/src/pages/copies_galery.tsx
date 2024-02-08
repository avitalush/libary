import { useState, useEffect } from 'react';
import {Grid,Box,Typography,Container} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LibBook } from '../interfaces';
import { useParams } from 'react-router-dom';
import CopyCard from '../componnents/copies_galery/copyCard';
import { styles } from '../componnents/copies_galery/style';
import { getAllCopiesByInfo } from '../api/book';

const defaultTheme = createTheme();

export default function CpiesGalery() { 
   const [copies, setCopies] = useState<LibBook[]>([]);
   const { infoId } = useParams();

  useEffect(() => {
    const fetchData = async () => {

        const response: LibBook[] = await getAllCopiesByInfo(String(infoId));
        setCopies(response);
    
    };
  
    fetchData();
  }, []);
  
  return (
    <ThemeProvider theme={defaultTheme}>
        <Box
         
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={[styles.font,styles.fontTitle]}
            >
              Copies of {copies[0]?.information.name}
            </Typography>
        
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {!!copies.length ? (
          copies.map((card: LibBook) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
            <CopyCard card={card} />
          </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center" color="text.secondary">
            No copies available.
          </Typography>
        )}
      </Grid>
    </Container>
    </ThemeProvider>
  );
}


