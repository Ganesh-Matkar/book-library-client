const initialState = {
    books: [],
    loading: false,
    error: null,
};

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKS_REQUEST':
            return { ...state, loading: true, books: [], error: null };
        case 'BOOKS_SUCCESS':
            return { ...state, loading: false, books: action.payload };
        case 'BOOKS_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default bookReducer;
