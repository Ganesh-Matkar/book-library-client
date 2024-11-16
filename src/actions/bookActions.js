import axios from 'axios';

export const fetchBooks = (query = {}) => async (dispatch) => {
    try {
        dispatch({ type: 'BOOKS_REQUEST' });
        const { data } = await axios.get('http://localhost:4000/books', { params: query });
        dispatch({ type: 'BOOKS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'BOOKS_FAIL', payload: error.message });
    }
};
