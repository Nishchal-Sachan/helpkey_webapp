const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    msg:null,
    isLoading:false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          token: action.token,
          isAuthenticated: action.isAuthenticated,
          error: action.error,
          msg:action.msg,
          isLoading:false
        };
      case "AUTH_SUCCESS":
        return{
          ...state,
          token: action.token,
          isAuthenticated: action.isAuthenticated,
          isLoading:false
        }
      case "LOGIN_FAILURE":
        return {
          ...state,
          error: action.payload,
          isLoading:false
        };
  
      case "LOGOUT":
        return {
          ...state,
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        };

        case "SIGNUP":
        return {
          ...state,
          msg: action.msg,
          error: action.error,
          isLoading:false
        };
   
        case "LOADING":
          return{
            ...state,
            isLoading:true
          }
      default:
        return state;
    }
  };
  
  export default authReducer;
  