export const getIsRefreshingUser = state => state.auth.isRefreshingUser;

export const getIsLoggedIn = state => state.auth.isLoggedIn;

export const getUsername = state => state.auth.user.name;

export const getAuthError = state => state.auth.error;
