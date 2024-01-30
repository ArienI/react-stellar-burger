const accountData = {
  user: {
    email: null,
    password: null,
  },
  isLoggedIn: false,
};

function authenticationReducer(state = accountData, action) {
  switch (action.type) {
    default:
      return state;
  }
};

export { authenticationReducer };
