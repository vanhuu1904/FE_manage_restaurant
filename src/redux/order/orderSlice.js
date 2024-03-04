import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

// carts = [
//     {quatity: 1, foodID: '1', detail: {foodID: 1, name: 'a'}},
//     {quatity: 3, foodID: '2', detail: {foodID: 2, name: 'b'}}
// ]
const initialState = {
  carts: [],
};

export const orderSlide = createSlice({
  name: "order",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doAddFoodAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      console.log(">>>check item: ", item);

      let isExistIndex = carts.findIndex((c) => c.foodID === item.foodID);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity =
          carts[isExistIndex].quantity + item.quantity;
      } else {
        carts.push({
          quantity: item.quantity,
          foodID: item.foodID,
          detail: item.detail,
        });
      }
      //   update redux
      state.carts = carts;
      message.success("Sản phẩm đã được thêm vào Giỏ hàng");
    },
    doUpdateCartAction: (state, action) => {
      let carts = state.carts;
      const item = action.payload;
      let isExistIndex = carts.findIndex((c) => c.foodID === item.foodID);
      if (isExistIndex > -1) {
        carts[isExistIndex].quantity = item.quantity;
      } else {
        carts.push({
          quantity: item.quantity,
          foodID: item.foodID,
          detail: item.detail,
        });
      }
      state.carts = carts;
    },
    doDeleteItemCartAction: (state, action) => {
      state.carts = state.carts.filter(
        (c) => c.foodID !== action.payload.foodID
      );
    },
    doResetCartAction: (state, action) => {
      state.carts = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const {
  doAddFoodAction,
  doUpdateCartAction,
  doDeleteItemCartAction,
  doResetCartAction,
} = orderSlide.actions;

export default orderSlide.reducer;
