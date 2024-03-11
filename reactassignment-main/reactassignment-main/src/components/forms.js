import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Container, Box, TextField, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody ,Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


const FormsPage = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [apod, setApod] = useState(null);
  const [count, setCount] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [results, setResults] = useState([]);

  // Fetch APOD data for the background
  useEffect(() => {
    const fetchAPOD = async (date) => {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=fbNyjiNhuC5opvRyd9VvrAHzF9aSHrOouOfXEczs${date ? `&date=${date.format('YYYY-MM-DD')}` : ''}`);
    // const response = await fetch(` http://localhost:3030/api/nasa/apod${date ? `&date=${date.format('YYYY-MM-DD')}` : ''}`);
      const data = await response.json();
      setApod(data);
    };

    fetchAPOD(selectedDate);
  }, [selectedDate]);

  // Handlers for form submissions and input changes
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  const handleSubmitForm2 = async (e) => {
    e.preventDefault();
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=fbNyjiNhuC5opvRyd9VvrAHzF9aSHrOouOfXEczs&count=${count}`;
    // const apiUrl = `http://localhost:3030/api/nasa/apod&count=${count}`;

    try {
      const response = await axios.get(apiUrl);
      setResults(response.data); // Assuming the API returns an array of objects
    } catch (error) {
      console.error("Error fetching APOD data:", error);
      setResults([]); // Reset results or handle errors as needed
    }
  };

  
  
    const handleSubmitForm3 = async (e) => {
      e.preventDefault();
      // Ensure both dates are selected
      if (!startDate || !endDate || startDate.isAfter(endDate)) {
        alert("Please select a valid date range where start date is not after end date.");
        return;
      }
  
      const startDateFormat = startDate.format('YYYY-MM-DD');
      const endDateFormat = endDate.format('YYYY-MM-DD');
      const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=fbNyjiNhuC5opvRyd9VvrAHzF9aSHrOouOfXEczs&start_date=${startDateFormat}&end_date=${endDateFormat}`;
  
      try {
        const response = await axios.get(apiUrl);
        setResults(response.data); // Assuming the API returns an array of objects
      } catch (error) {
        console.error("Error fetching APOD data:", error);
        setResults([]); // Reset results or handle errors as needed
      }
    };

  return (
    <Box>
      {/* Background and Form1 for selecting date */}
      <Box sx={{ height: '100vh', backgroundImage: `url(${apod?.url})`, backgroundSize: 'cover', color: '#fff' }}>
        <Container style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '20px' }} >
          <Typography variant="h4" gutterBottom style={{marginTop:'5%'}}>Form 1: Select Date</Typography>
          <ThemeProvider theme={lightTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} style={{ backgroundColor: '#fff'}}>
            <DatePicker
            sx={{
                borderColor: "#fff",
                color:"white"
                }
                }
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} style={{ color: '#fff'}} />}
            />
          </LocalizationProvider>
          </ThemeProvider>
          {apod && 
          <>
          <Typography variant="subtitle1" gutterBottom>
            Title: {apod.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date: {apod.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Explanation: {apod.explanation}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Media Type: {apod.media_type}
          </Typography>
          <Typography variant="body1" gutterBottom>
            URL: <a href={apod.url}>{apod.url}</a>
          </Typography>
          {apod.hdurl && (
            <Typography variant="body1" gutterBottom>
              HD URL: <a href={apod.hdurl}>{apod.hdurl}</a>
            </Typography>
          )}
          <Typography variant="body1" gutterBottom>
            Copyright: {apod.copyright}
          </Typography>
        </>}
        </Container>
      </Box>

      {/* Forms 2 and 3 for count or date range */}
      <Box sx={{ paddingTop: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {/* Form 2 */}
        <form onSubmit={handleSubmitForm2} style={{ marginBottom: '20px' }}>
          <TextField
            label="Enter Count"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
          <Button type="submit" variant="contained">Submit Form 2</Button>
        </form>

        {/* Form 3 */}
        <form onSubmit={handleSubmitForm3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">Submit Form 3</Button>
        </form>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {results.map((apod, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              {apod.media_type === 'image' ? (
                <CardMedia
                  component="img"
                  height="140"
                  image={apod.url}
                  alt={apod.title}
                />
              ) : (
                <iframe src={apod.url} frameBorder="0" title={apod.title} width="100%" height="140" allow="encrypted-media" allowFullScreen></iframe>
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {apod.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {apod.date}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {apod.explanation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={apod.url} target="_blank">View Full</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>

      
      
    </Box>
  );
};

export default FormsPage;
