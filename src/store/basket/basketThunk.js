import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  decrementRequest,
  deleteRequest,
  getBasketRequest,
  incrementRequest,
  postItemsRequest,
} from "../../api/axiosApi";

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getBasketRequest();
      return response.data.data.items;
    } catch (error) {
      return rejectWithValue(
        error?.response?.message || "Something went wrong!"
      );
    }
  }
);

export const addItem = createAsyncThunk(
  "basket/addItem",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await postItemsRequest(payload);

      dispatch(getBasket());

      return await response.items;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const incrementFood = createAsyncThunk(
  "basket/increment",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await incrementRequest(payload);
      dispatch(getBasket());
      return await response;
    } catch (error) {
      rejectWithValue(error?.response?.message || "Something went wrong!");
    }
  }
);

export const decrementFood = createAsyncThunk(
  "basket/decrement",
  async (payload, { rejectWithValue, dispatch }) => {
    if (payload.amount !== 0) {
      try {
        const response = await decrementRequest(payload);
        dispatch(getBasket());

        return response;
      } catch (error) {
        rejectWithValue(error?.response?.message || "Something went wrong!");
      }
    } else {
      try {
        const response = await deleteRequest(payload);

        dispatch(getBasket());

        return response;
      } catch (error) {
        rejectWithValue(error?.response?.message || "Something went wrong!");
      }
    }
  }
);
