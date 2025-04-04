import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromLocalStorage = localStorage.getItem("user");
console.log(userFromLocalStorage);

const initialState = userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : {
      token: null,
      user: {
        email: "",
        id: "",
        name: "",
      },
    };
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_LOGIN_USER
        }`,
        credentials
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_REGISTER_USER
        }`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerCompleteUser = createAsyncThunk(
  "auth/registerCompleteUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_REGISTER_COMPLETE
        }`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const initiatePasswordReset = createAsyncThunk(
  "auth/initiatePasswordReset",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_REQUEST_PASSWORD_RESET
        }`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const otpVerifyPasswordReset = createAsyncThunk(
  "auth/otpVerifyPasswordReset",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_REGISTER_COMPLETE
        }`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const passwordReset = createAsyncThunk(
  "auth/passwordReset",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}${
          import.meta.env.VITE_API_PASSWORD_RESET
        }`,
        credentials
      );
      return response.data;
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        // Return the error message from the server
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userProfile = createAsyncThunk(
  "auth/profile",
  async (credentials) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}${
        import.meta.env.VITE_API_GET_PROFILE
      }/${credentials}`
    );
    return response.data;
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromLocalStorage ? initialState : null,
    profileDetails: {
      name: "",
      email: "",
      mobile: "",
      address: "",
      country_code: "",
    },
    status: userFromLocalStorage ? "succeeded" : "idle",
    error: null,
    registerdStep1: null,
    errCode: null,
  },
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.profileDetails = null;
      state.status = "idle";
      state.error = null;
      state.registerdStep1 = null;
      state.errCode = null;
      localStorage.removeItem("user");
    },
    closeAuthPage: (state) => {
      state.status = "idle";
      state.error = null;
      state.registerdStep1 = null;
      state.errCode = null;
      state.profileDetails = {
        name: "",
        email: "",
        mobile: "",
        address: "",
        country_code: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "registerdStep1";
        state.registerdStep1 = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.errCode = action.payload.errCode;
        state.error = action.payload.message;
      })
      .addCase(registerCompleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerCompleteUser.fulfilled, (state) => {
        state.status = "registeredUser";
        state.registerdStep1 = null;
      })
      .addCase(registerCompleteUser.rejected, (state) => {
        state.status = "failed";
        state.errCode = action.payload.errCode;
        state.error = action.payload.message;
      })
      .addCase(userProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profileDetails = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(initiatePasswordReset.pending, (state) => {
        state.status = "loading";
      })
      .addCase(initiatePasswordReset.fulfilled, (state, action) => {
        state.status = "otpGenerated";
        state.profileDetails = action.payload;
      })
      .addCase(initiatePasswordReset.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      .addCase(otpVerifyPasswordReset.pending, (state) => {
        state.status = "loading";
      })
      .addCase(otpVerifyPasswordReset.fulfilled, (state, action) => {
        state.status = "otpVerifiedResetPassword";
        state.registerdStep1 = null;
        state.error = null;
        state.errCode = null;
      })
      .addCase(otpVerifyPasswordReset.rejected, (state, action) => {
        state.status = "otpVerifyFailed";
        state.error = action.payload.message;
        state.errCode = action.payload.errCode;
      })
      .addCase(passwordReset.pending, (state) => {
        state.status = "loading";
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.status = "ResetPasswordsuccessfull";
        state.registerdStep1 = null;
        state.error = null;
        state.errCode = null;
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.status = "ResetPasswordFailed";
        state.error = action.payload.message;
        state.errCode = action.payload.errCode;
      });
  },
});

export const { Logout, closeAuthPage } = authSlice.actions;
export default authSlice.reducer;
