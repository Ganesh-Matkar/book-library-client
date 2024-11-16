import React from 'react';
import FilterBar from './components/FilterBar';
import BookList from './components/BookList';
import { Container, Typography } from '@mui/material';

const App = () => (
    <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            AI NLP-Based Book Search System
        </Typography>
        <FilterBar />
        <BookList />
    </Container>
);

export default App;
