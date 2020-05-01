const initState = {
  currentUser: null,
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGOUT':
      return {
        ...initState
      };
    case 'USER_LOGIN_SUCCEEDED':
      return {
        ...state,
        currentUser: action.authenticatedUser,
        authError: null
      };
    case 'USER_LOGIN_FAILED':
      console.log('Login failed')
      return {
        ...initState,
        authError: 'Login failed'
      };
    default:
      return state;
  }
};

export default authReducer;
