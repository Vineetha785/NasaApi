// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody ,Grid} from '@mui/material';

const AboutPage = () => {
  const [apod, setApod] = useState(null);

  useEffect(() => {
    const fetchAPOD = async () => {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=fbNyjiNhuC5opvRyd9VvrAHzF9aSHrOouOfXEczs`;
        // const apiUrl = ` http://localhost:3030/api/nasa/apod`;
  
        try {
          const response = await axios.get(apiUrl);
          setApod(response.data); // Assuming the API returns an array of objects
        } catch (error) {
          console.error("Error fetching APOD data:", error);
        }
    //   setApod(data);
    };

    fetchAPOD();
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <Typography variant="h4" gutterBottom>
        APOD: Astronomy Picture of the Day
      </Typography>
      <Typography paragraph>
        One of the most popular websites at NASA is the Astronomy Picture of the Day. This website is one of the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video. This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications. Moreover, it helps with discoverability of relevant imagery.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ maxWidth: 650, margin: 'auto', padding: '20px' }}>
                {apod && (
                <TableContainer>
                    <Table>
                    <TableHead>
                        <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell component="th" scope="row">Title</TableCell>
                        <TableCell align="right">{apod.title}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">{apod.date}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Explanation</TableCell>
                        <TableCell align="right">{apod.explanation}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Media Type</TableCell>
                        <TableCell align="right">{apod.media_type}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>URL</TableCell>
                        <TableCell align="right"><a href={apod.url} target="_blank" rel="noopener noreferrer">Link</a></TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
                )}
            </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {apod && (
            <Paper elevation={3} style={{ padding: '20px', maxWidth: '100%', maxHeight: '500px', overflow: 'hidden' }}>
              {apod.media_type === 'image' ? (
                <img src={apod.url} alt={apod.title} style={{ maxWidth: '100%', height: 'auto' }} />
              ) : (
                <iframe title={apod.title} src={apod.url} frameBorder="0" style={{ maxWidth: '100%', height: '500px' }} allow="encrypted-media" allowFullScreen></iframe>
              )}
            </Paper>
          )}
        </Grid>
      </Grid>
      <Paper>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
    <Table aria-label="APOD API parameters table">
      <TableHead>
        <TableRow>
          <TableCell>Parameter</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Default</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>date</TableCell>
          <TableCell>YYYY-MM-DD</TableCell>
          <TableCell><em>today</em></TableCell>
          <TableCell>The date of the APOD image to retrieve</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>start_date</TableCell>
          <TableCell>YYYY-MM-DD</TableCell>
          <TableCell>none</TableCell>
          <TableCell>The start of a date range, when requesting date for a range of dates. Cannot be used with <code>date</code>.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>end_date</TableCell>
          <TableCell>YYYY-MM-DD</TableCell>
          <TableCell><em>today</em></TableCell>
          <TableCell>The end of the date range, when used with <code>start_date</code>.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>count</TableCell>
          <TableCell>int</TableCell>
          <TableCell>none</TableCell>
          <TableCell>If this is specified then <code>count</code> randomly chosen images will be returned. Cannot be used with <code>date</code> or <code>start_date</code> and <code>end_date</code>.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>thumbs</TableCell>
          <TableCell>bool</TableCell>
          <TableCell>False</TableCell>
          <TableCell>Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>api_key</TableCell>
          <TableCell>string</TableCell>
          <TableCell>DEMO_KEY</TableCell>
          <TableCell>api.nasa.gov key for expanded usage</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
      </Paper>
    </div>
  );
};

export default AboutPage;
