
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




// api data fetching //ASync thunk 
export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes',async () =>{
    const response = await axios.get('https://dummyjson.com/recipes');
    return response.data.recipes; //only returning the array of dummy api
});


const recipeSlice = createSlice({
    name:'recipes',
    initialState:{
        data:[],
        loading:false,
        error:null,
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchRecipes.pending, (state) =>{
            state.loading = true;
            state.error = null
        })
        .addCase(fetchRecipes.fulfilled, (state,action) =>{
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchRecipes.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message;
        });
    },

})

export default recipeSlice.reducer;