import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { fetchBooks } from '../actions/bookActions';
import { Box, CircularProgress, Typography, Avatar } from '@mui/material';
import moment from 'moment';

const BookList = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.bookState);

    useEffect(() => {
        dispatch(fetchBooks());
    }, []);

    const columns = [
        {
            name: 'coverImage', label: 'Cover Image', options: {
                customBodyRender: (value, tableMeta) => {
                    return <Avatar alt={tableMeta.rowData[1]} src={value} />;
                },

            }
        },
        { name: 'title', label: 'Title' },
        { name: 'author', label: 'Author' },
        { name: 'genre', label: 'Genre' },
        { name: 'rating', label: 'Rating' },
        {
            name: 'publishedDate', label: 'Published Date', options: {
                customBodyRender: (value) => {
                    return moment(value).format("MMMM DD, YYYY");
                },

            }
        },
    ];

    const options = {
        filter: false,
        download: false,
        print: false,
        viewColumns: false,
        responsive: 'standard',
        selectableRows: 'none',
        search: false,
        sort: false,
        textLabels: {
            body: {
                noMatch: loading ? <CircularProgress /> : "Sorry, no matching records found",
            }
        }
    };

    if (error) return <Typography color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ marginTop: '30px' }}>
            <MUIDataTable
                title={'Book List'}
                data={books}
                columns={columns}
                options={options}
            />
        </Box>
    );
};

export default BookList;
