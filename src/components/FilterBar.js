import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Button,
    Grid,
    Fade,
    Select,
    MenuItem,
    InputLabel,
    IconButton,
    Tooltip,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../actions/bookActions';

const FilterCard = () => {
    const [searchType, setSearchType] = useState('ai');
    const [question, setQuestion] = useState('');
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [showFilters, setShowFilters] = useState(false);
    const dispatch = useDispatch();

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
        setQuestion('');
        setTitle('');
        setGenre('');
        setAuthor('');
        setRating('');
        setSortBy('rating');
    };

    const applyFilters = () => {
        if (searchType === 'ai') {
            dispatch(fetchBooks({ question }));
        } else if (searchType === 'manual') {
            dispatch(fetchBooks({ title, genre, author, rating, sortBy }));
        }
    };

    const resetFilters = () => {
        dispatch(fetchBooks());
        if (searchType === 'ai') {
            setQuestion('');
        } else if (searchType === 'manual') {
            setTitle('');
            setGenre('');
            setAuthor('');
            setRating('');
            setSortBy('rating');
        }
    }

    return (
        <Card
            sx={{
                margin: 'auto',
                padding: '15px',
                boxShadow: 4,
                borderRadius: 4,
                backgroundColor: '#f9f9f9',
                position: 'relative',
            }}
        >
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <FormLabel component="legend" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                        Filters
                    </FormLabel>
                    <Tooltip title={showFilters ? 'Collapse Filters' : 'Expand Filters'}>
                        <IconButton onClick={() => setShowFilters((prev) => !prev)}>
                            {showFilters ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Tooltip>
                </Box>
                {showFilters && <>
                    <Box>
                        <FormControl component="fieldset" fullWidth>
                            <RadioGroup
                                row
                                value={searchType}
                                onChange={handleSearchTypeChange}
                                sx={{ justifyContent: 'center', marginY: '10px' }}
                            >
                                <FormControlLabel
                                    value="ai"
                                    control={<Radio />}
                                    label="AI Search"
                                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                                />
                                <FormControlLabel
                                    value="manual"
                                    control={<Radio />}
                                    label="Manual Search"
                                    sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                                />
                            </RadioGroup>
                        </FormControl>

                        {/* AI Search */}
                        {searchType === 'ai' && (
                            <Fade in={searchType === 'ai'} timeout={300}>
                                <Box sx={{ marginBottom: '10px' }}>
                                    <TextField
                                        label="Ask AI for Recommendations"
                                        placeholder="e.g., What are some top-rated Fantasy books?"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            borderRadius: '8px',
                                            backgroundColor: '#fff',
                                            marginBottom: '15px',
                                        }}
                                    />
                                </Box>
                            </Fade>
                        )}

                        {/* Manual Search */}
                        {searchType === 'manual' && (
                            <Fade in={searchType === 'manual'} timeout={300}>
                                <Box>
                                    <Grid container spacing={2} justifyContent="center">
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                label="Title"
                                                placeholder="Book Title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fff',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                label="Genre"
                                                placeholder="e.g., Fantasy, Thriller"
                                                value={genre}
                                                onChange={(e) => setGenre(e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fff',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                label="Author"
                                                placeholder="Author Name"
                                                value={author}
                                                onChange={(e) => setAuthor(e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fff',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <TextField
                                                label="Rating"
                                                placeholder="Min Rating (e.g., 4.5)"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                fullWidth
                                                variant="outlined"
                                                type="number"
                                                sx={{
                                                    borderRadius: '8px',
                                                    backgroundColor: '#fff',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <FormControl fullWidth>
                                                <InputLabel id="sortBy">Sort By</InputLabel>
                                                <Select
                                                    labelId="sortBy"
                                                    id="sortBy-select"
                                                    value={sortBy}
                                                    label="Sort By"
                                                    onChange={(e) => setSortBy(e.target.value)}
                                                    fullWidth
                                                    sx={{
                                                        backgroundColor: '#fff',
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <MenuItem value="rating">Rating</MenuItem>
                                                    <MenuItem value="publishedDate">Published Date</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Fade>
                        )}
                    </Box>

                    {/* Filter Action Buttons */}
                    <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={applyFilters}
                                    fullWidth
                                    sx={{
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        borderRadius: '25px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': { backgroundColor: '#FF4081' },
                                    }}
                                >
                                    Apply Filters
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={resetFilters}
                                    fullWidth
                                    sx={{
                                        paddingTop: '10px',
                                        paddingBottom: '10px',
                                        borderRadius: '25px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        '&:hover': { backgroundColor: '#FF4081' },
                                    }}
                                >
                                    Reset Filters
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </>}
            </CardContent>
        </Card>
    );
};

export default FilterCard;
