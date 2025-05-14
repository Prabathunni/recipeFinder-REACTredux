import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from '../Redux/Slice/recipeSlice'



export const store = configureStore({
    reducer: {
        recipes: recipeReducer,
    },
});


