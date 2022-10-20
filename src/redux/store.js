import {configureStore} from "@reduxjs/toolkit";
import {postsReducer} from "./slice/PostsSlice";

 const store = configureStore({
    reducer:{
        posts:postsReducer,
    }
})


export default store

