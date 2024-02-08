
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LibBook } from '../../interfaces';
import { cardInfoConfig } from './config';
import { styles } from './style';

const CopyCard = ({ card }: { card: LibBook }) => (
<Card sx={{ ...styles.card }}>
  <CardContent sx={{ flexGrow: 1 }}>
    {cardInfoConfig.map((item, index) => (
      <Typography key={index} style={styles.font}>
        {item.label}: {typeof item.transform === 'function' ? item.transform(card[item.key]) : card[item.key]}
      </Typography>
    ))}
  </CardContent>
</Card>

);

export default CopyCard;
