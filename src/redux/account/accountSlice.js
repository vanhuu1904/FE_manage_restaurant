import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: {
    username: "",
    name: "",
    id: "",
  },
  groupWithRoles: {},
};

export const accountSlide = createSlice({
  name: "account",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    doLoginAction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(">>>check action account: ", action);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user;
      state.groupWithRoles = action.payload.groupWithRoles;
    },
    doGetAccountAction: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(">>>check action: ", action);
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        name: action.payload.name,
      };
      state.groupWithRoles = action.payload.groupWithRoles;
    },

    doLogoutAction: (state, action) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        username: "",
        name: "",
        groupWithRoles: {},
        id: "",
      };
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {},
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } =
  accountSlide.actions;

export default accountSlide.reducer;