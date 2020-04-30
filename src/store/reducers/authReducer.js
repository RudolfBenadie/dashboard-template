const initState = {
  currentUser: null,
  users: {},
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER_LOGIN_SUCCEEDED':
      return {
        ...state,
        currentUser: action.currentUser,
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
