import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { LibBookInformation, LibPublisher } from '../../interfaces';
import { buttonsConfig, cardFields } from './config';
import { styles } from './style';


const BookCard = ({
    card,
    handleOpenPublisher,
    handleCopies,
    handleAddClick,
    handleTaken
  }: {
    card: LibBookInformation;
    handleOpenPublisher: (publisher: LibPublisher | null) => void;
    handleCopies: (id: number) => void;
    handleAddClick: (book: LibBookInformation) => void;
    handleTaken: (id: number) => void;
  }) => {  return (
    <Card
      sx={[
        {backgroundColor: card.is_available ? 'initial' : 'grey'},styles.card
      ]}
    >
       <CardContent sx={{ flexGrow: 1 }}>
       {cardFields.map((field) => (
        <Typography key={field.key} gutterBottom variant="h5" component="h2" sx={styles.font}>
  {field.label}: {card[field.key] as string | number}
</Typography>

))}


    </CardContent>
      <CardActions>
  <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
    {buttonsConfig(card, handleOpenPublisher, handleCopies, handleAddClick, handleTaken).map((button, index) => (
      <Grid item key={index}>
        <Button size="small" onClick={button.onClick}  sx={styles.font}>
          {button.label}
        </Button>
      </Grid>
    ))}
  </Grid>
</CardActions>

    </Card>
  );
};

export default BookCard;
