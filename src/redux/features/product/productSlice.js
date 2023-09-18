import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentPage: 1,
  totalItems: 1,
  perPage: 10,
  keyword: "",
  category: "",
  tags: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const { products, counts } = action.payload;
      state.products = products;
      state.totalItems = counts;
    },

    setCategory: (state, action) => {
      if (state.category === action.payload) {
        return { ...state, category: "" };
      }

      return {
        ...state,
        currentPage: 1,
        category: action.payload,
        keyword: "",
        tags: [],
      };
    },

    // setTags: (state, action) => {},

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    setNextPage: (state, action) => {
      return { ...state, currentPage: state.currentPage + 1 };
    },

    setPrevPage: (state) => {
      return { ...state, currentPage: state.currentPage - 1 };
    },

    setKeyword: (state, action) => {
      return { ...state, keyword: action.payload, category: "", tags: [] };
    },
  },
});

export const {
  setProducts,
  setCategory,
  // setTags,
  setCurrentPage,
  setNextPage,
  setPrevPage,
  setKeyword,
} = productSlice.actions;

export default productSlice.reducer;
