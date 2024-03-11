import React from 'react';
import { Container, Typography, Link, Box } from '@mui/material';

const LinksPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Useful Links
      </Typography>
      <Box marginTop={2}>
        <Typography variant="h6">Source Code 1:</Typography>
        <Link href="https://github.com/Vineetha785/NasaApi/" target="_blank" rel="noopener">
        https://github.com/Vineetha785/NasaApi/
        </Link>
      </Box>
      <Box marginTop={2}>
        <Typography variant="h6">Source Code 2:</Typography>
        <Link href="https://github.com/Vineetha785/reactassignment" target="_blank" rel="noopener">
        https://github.com/Vineetha785/reactassignment
        </Link>
      </Box>
      <Box marginTop={2}>
        <Typography variant="h6">NASA Open API Documentation:</Typography>
        <Link href="https://api.nasa.gov" target="_blank" rel="noopener">
          https://api.nasa.gov
        </Link>
      </Box>
    </Container>
  );
};

export default LinksPage;
