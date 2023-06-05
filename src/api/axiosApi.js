import { axiosIntance } from "../lib/fetchAPI";

export const getMealsRequest = () => {
  return axiosIntance.get("/foods");
};

export const getBasketRequest = () => {
  return axiosIntance.get("/basket");
};

export const postItemsRequest = (payload) => {
  return axiosIntance.post(`/foods/${payload.id}/addToBasket`, {
    amount: payload.amount,
  });
};

export const incrementRequest = (payload) => {
  return axiosIntance.put(`/basketItem/${payload.id}/update`, {
    amount: payload.amount + 1,
  });
};

export const decrementRequest = (payload) => {
  return axiosIntance.put(`/basketItem/${payload.id}/update`, {
    amount: payload.amount,
  });
};

export const deleteRequest = (payload) => {
  return axiosIntance.delete(`/basketItem/${payload.id}/delete`);
};
