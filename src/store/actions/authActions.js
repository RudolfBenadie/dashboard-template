const auth = (credentials) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = credentials;
    if (email && password) {
      resolve({ email, password });
    }
    else {
      reject(Error("Invalid credentials"));
    }
  });
}

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    auth(credentials)
      .then(result => {
        const authenticatedUser = { ...result };
        dispatch({ type: 'USER_LOGIN_SUCCEEDED', authenticatedUser })
      })
      .catch((err) => {
        dispatch({ type: 'USER_LOGIN_FAILED', err })
      });
  }
};

export const signOut = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'USER_LOGOUT' })
  }
};
