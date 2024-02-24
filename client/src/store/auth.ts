import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '@/types/user';

export interface AuthState {
  isLoggedIn: boolean;
  user: IUser;
  accessToken: string;
}

/*
 * TODO: Update with profile
 * auth.user - for websockets (imperative code -> only getState)
 */

const userInitialState = {
  id: 0,
  idRole: 0,
  name: '',
  email: '',
  posts: [],
};

export const authInitialState: AuthState = {
  isLoggedIn: false,
  user: userInitialState,
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setUser: (state: AuthState, { payload }: PayloadAction<IUser | undefined>) => {
      state.user = payload?.id ? payload : userInitialState;
    },
    setToken: (state: AuthState, { payload }: PayloadAction<string>) => {
      state.accessToken = payload;
      state.isLoggedIn = true;
    },
    logout: () => authInitialState,
  },
});

export default authSlice.reducer;

export const { setToken, logout, setUser } = authSlice.actions;

// Selectors
export const selectAuth = ({ auth }: RootState) => auth;
export const selectIsLoggedIn = ({ auth }: RootState) => auth.isLoggedIn;
export const selectUser = ({ auth }: RootState) => auth.user;
export const selectUserId = ({ auth }: RootState) => auth.user.id;
export const selectUserRole = ({ auth }: RootState) => auth.user.idRole;
