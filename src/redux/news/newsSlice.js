import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload ?? [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setArticles } = newsSlice.actions;

export default newsSlice.reducer;
