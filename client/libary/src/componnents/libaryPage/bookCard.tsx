import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { LibBookInformation, LibPublisher } from '../../interfaces'
import { buttonsConfig, cardFields } from './config'
import { styles } from './style'

const BookCard = ({
  card,
  handleOpenPublisher,
  handleCopies,
  handleAddClick,
  handleTaken,
  handleDeleteClick,
}: {
  card: LibBookInformation
  handleOpenPublisher: (publisher: LibPublisher | null) => void
  handleCopies: (id: string) => void
  handleAddClick: (book: LibBookInformation) => void
  handleTaken: (id: string) => void
  handleDeleteClick: (id: string) => void
}) => {
  return (
    <Card
      sx={[
        { backgroundColor: card.isAvailable ? 'initial' : 'rgb(179,158,112)' },
        styles.card,
      ]}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {cardFields.map((field) => (
          <Typography
            key={field.key}
            gutterBottom
            variant="h5"
            component="h2"
            sx={styles.font}
          >
            {field.label}:{' '}
            {field.key === 'publicationYear'
              ? new Date(card['publicationYear']).toLocaleDateString('en-US', {
                  year: 'numeric',
                })
              : (card[field.key] as string | number)}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Grid container spacing={1} sx={{ justifyContent: 'center' }}>
          {buttonsConfig(
            card,
            handleOpenPublisher,
            handleCopies,
            handleAddClick,
            handleTaken,
            handleDeleteClick,
          ).map((button, index) => (
            <Grid item key={index}>
              <Button
                size="small"
                onClick={button.onClick}
                sx={styles.font}
                color="primary"
              >
                {button.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardActions>
    </Card>
  )
}

export default BookCard
