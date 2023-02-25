import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import {
  AuthenticatePayload,
  AuthObject,
  AuthState,
  ChangeEmailPayload,
  ResetPasswordPayload,
  RegisterInvitationPayload,
  ReceiveInvitationResponse,
  ReceiveInvitationPayload,
} from "../../types";
import { authAPI, invitationAPI } from "../apiRoutes";

export const receiveInvitation = createAsyncThunk(
  "auth/receiveInvitation",
  async ({ accessToken, cb }: ReceiveInvitationPayload) => {
    const { data } = await axios.get(
      invitationAPI(`?accessToken=${accessToken}`)
    );
    const response = data as ReceiveInvitationResponse;
    cb(response);
    return response.userId;
  }
);

export const registerInvitation = createAsyncThunk(
  "auth/registerInvitation",
  async (body: RegisterInvitationPayload) => {
    await axios.put(authAPI(`/register`), body);
    const { data } = await axios.get(authAPI(`/me`), { withCredentials: true });
    return data as AuthObject;
  }
);

export const resendInvitation = createAsyncThunk(
  "auth/resendInvitation",
  async (userId: number) => {
    const { data } = await axios.put(invitationAPI(`/refresh/${userId}`));
    return data;
  }
);

export const updateNotifications = createAsyncThunk(
  "auth/updateNotifications",
  async (status: string) => {
    const { data } = await axios.put(
      `/api/users/notifications?status=${status}`
    );
    return data;
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ password, userId }: ResetPasswordPayload) => {
    await axios.put(`/auth/password-reset/${userId}`, { password });
  }
);

export const requestReset = createAsyncThunk(
  "auth/requestReset",
  async (email: string) => {
    await axios.post(`/auth/request-reset`, { email });
  }
);

export const receiveToken = createAsyncThunk(
  "auth/receiveToken",
  async (accessToken: string) => {
    const { data } = await axios.get(`/auth/tokens?accessToken=${accessToken}`);
    return data;
  }
);
export const me = createAsyncThunk("auth/me", async () => {
  const { data } = await axios.get("/auth/me", { withCredentials: true });
  return data as AuthObject;
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ email, password }: AuthenticatePayload) => {
    await axios.post(`/auth/login`, { email, password });
    const { data } = await axios.get("/auth/me", { withCredentials: true });
    return data as AuthObject;
  }
);

export const reset = createAsyncThunk("auth/reset", async () => {
  await axios.delete("/auth/logout");
});

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async ({ userId, email, password }: ChangeEmailPayload) => {
    await axios.put(`/api/users/changeEmail/${userId}`, { email, password });
  }
);

const INIT_STATE: AuthState = {
  auth: {},
  redirectPath: undefined,
  id: null,
  validatingInvitation: true,
  validatingToken: true,
  validToken: false,
  resetPasswordSuccessful: false,
  requestedPasswordReset: false,
  validInvitation: null,
  loggedIn: false,
  preCheck: false,
  isLoading: false,
  hasError: false,
};
//Slice
/////////////////////////////////////////////////////////////
const authSlice = createSlice({
  name: "auth",
  initialState: INIT_STATE,
  reducers: {
    resetRequestPassword(state, action) {
      return { ...state, requestedPasswordReset: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.preCheck = true;
        state.validInvitation = null;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(me.rejected, (state, action) => {
        state.preCheck = true;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.preCheck = true;
        state.validInvitation = null;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state = INIT_STATE;
        if (action.error.message === "Request failed with status code 403") {
          alert("Your account has been suspended");
        } else {
          alert("Incorrect Email and/or Password");
        }
      })
      .addCase(reset.fulfilled, (state, action) => {
        state = INIT_STATE;
      })
      .addCase(receiveInvitation.pending, (state, action) => {
        state.validatingInvitation = true;
        state.validInvitation = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(receiveInvitation.fulfilled, (state, action) => {
        state.id = action.payload;
        state.validatingInvitation = false;
        state.validInvitation = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(receiveInvitation.rejected, (state, action) => {
        state.validatingInvitation = false;
        state.validInvitation = false;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(resendInvitation.fulfilled, (state, action) => {
        Swal.fire("Success", "Invitation has been resent.", "success");

        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(resendInvitation.rejected, (state, action) => {
        alert("Something went wrong");
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(registerInvitation.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.validInvitation = null;
        state.preCheck = true;
        state.isLoading = false;
        state.hasError = false;
        // history.push("/");
        window.location.reload();
      })
      .addCase(registerInvitation.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(receiveToken.pending, (state, action) => {
        state.validatingToken = true;
        state.validToken = false;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(receiveToken.fulfilled, (state, action) => {
        state.validatingToken = false;
        state.id = action.payload;
        state.validToken = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(receiveToken.rejected, (state, action) => {
        state.validatingToken = false;
        state.validToken = false;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(requestReset.rejected, (state, action) => {
        alert("Email not registered with user account");
        state.requestedPasswordReset = true;
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(requestReset.fulfilled, (state, action) => {
        alert("Email has been sent");
        state.requestedPasswordReset = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        alert("Password has been reset");
        state.resetPasswordSuccessful = true;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(changeEmail.rejected, (state, action) => {
        alert("Password Incorrect");
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        alert("Email has been reset");
        state.isLoading = false;
        state.hasError = false;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { resetRequestPassword } = authSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default authSlice.reducer;
