import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {logInsert} from './reportSlice'
export const getBooks = createAsyncThunk('book/getBooks' , async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try{
        const res = await fetch('http://localhost:3005/books');
        const data = await res.json();
        return data;
    }catch (error) {
        return rejectWithValue(error.message) ;
    }


})


export const insertBooks = createAsyncThunk('book/insertBooks' , async (bookData, thunkAPI) => {
        const {rejectWithValue , getState , dispatch} = thunkAPI;

    try{
        bookData.userName = getState().auth.name;
        dispatch(deleteBook({id: 6}))
        const res = await fetch('http://localhost:3005/books' ,{
            method :'POST',
            body: JSON.stringify(bookData) ,
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        const data = await res.json();
        dispatch(logInsert({name:'insertBook' , status: 'success'}))
        return data;
    }catch (error) {
        dispatch(logInsert({name:'insertBook' , status: 'faild'}))
        return rejectWithValue(error.message) ;
    }
})


export const deleteBook = createAsyncThunk('book/deleteBook' , async (item, thunkAPI) =>{

    const {rejectWithValue} = thunkAPI;

    try{
        await fetch(`http://localhost:3005/books/${item.id}` ,{
            method :'DELETE',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        return item;
    }catch (error) {
        return rejectWithValue(error.message) ;
    }
})



const bookSlice = createSlice({
    name:"book",
    initialState:{books : [] , isLoading : false , error : null},
    extraReducers:{
        [getBooks.pending] : (state , action) =>{
            state.isLoading = true;
            state.error = null;
        
        },
        [getBooks.fulfilled] : (state , action) =>{
           state.isLoading = false;
           state.books = action.payload;
        },
        [getBooks.rejected] : (state , action) =>{
           state.isLoading = false;
           state.error = action.payload;
        },


        //insert
        [insertBooks.pending] : (state , action) =>{
            state.isLoading = true;
            state.error = null;
        
        },
        [insertBooks.fulfilled] : (state , action) =>{
           state.isLoading = false;
           state.books.push(action.payload);
        },
        [insertBooks.rejected] : (state , action) =>{
           state.isLoading = false;
           state.error = action.payload
        },

        //delete

        [deleteBook.pending] : (state , action) =>{
            state.isLoading = true;
            state.error = null;
        
        },
        [deleteBook.fulfilled] : (state , action) =>{
           state.isLoading = false;
           state.books = state.books.filter((el) => el.id !== action.payload.id);
           console.log(action.payload)
        },
        [deleteBook.rejected] : (state , action) =>{
           state.isLoading = false;
           state.error = action.payload;
        },
    }
})
export default bookSlice.reducer;