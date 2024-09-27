import { Typography, Card, CardContent,  Paper } from '@mui/material';
import DataTable from './components/DataTable.jsx';


const App = () => {

  return (
    <Paper elevation={4} sx={{ p: 4, m: 'auto', maxWidth: '1200px' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
        Interactive Data Table
      </Typography>

      {/* Search and Action Buttons */}
    

      {/* Data Table Wrapped in a Card */}
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <DataTable />
        </CardContent>
      </Card>
    </Paper>
  );
};

export default App;
