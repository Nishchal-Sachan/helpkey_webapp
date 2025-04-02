import axios from "axios";

const  loginSuccess= (token,msg,error,isAuthenticated)=>
{
  return {type:"LOGIN_SUCCESS",token:token,msg:msg,error:error,isAuthenticated:isAuthenticated}
}

const isLoading =()=>
{
  return {type:"LOADING",isLoading:true};
}

export const loginUser = (email, password) => async (dispatch) => {
   dispatch(isLoading());
  try {
    const response = await axios.post("https://helpkeyapi.onrender.com/api/login", {
      email,
      password,
    });

    const { token, msg, error ,isAuthenticated} = response.data; // Assuming API returns token & user info
    localStorage.setItem("token", token);
    // Save token in localStorage (optional for persistence)
console.log(token, msg, error);

    // Dispatch login success action
   
    dispatch(loginSuccess(token, msg,error,isAuthenticated ));
    
  } catch (error) {
    //dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};

export const signUpUser = (error,msg) =>{
return {type:"SIGNUP",error:error,msg:msg};
}

  
 export const signUpAction= (formData)=>async (dispatch)=>
  {
    dispatch(isLoading());
    console.log("in action")
    try {
      const response = await axios.post("https://helpkeyapi.onrender.com/api/signup", {
        name:formData.name,
        email:formData.email,
        password:formData.password
      })
  console.log(response.data)
      const { error,msg } = response.data; // Assuming API returns token & user
       dispatch(signUpUser(error,msg))
    } catch (error) {
      //dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
};

const  authSuccess= (token,isAuthenticated)=>
  {
    return {type:"AUTH_SUCCESS",token:token,isAuthenticated:isAuthenticated}
  }
  
  export const authUser = () => async (dispatch) => {
    dispatch(isLoading());
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("https://helpkeyapi.onrender.com/api/authuser", {
       token: token,
      });
  
      const {isAuthenticated} = response.data; // Assuming API returns token & user info
      // Dispatch login success action
      console.log(isAuthenticated,token,"Auth Action")
      dispatch(authSuccess(token,isAuthenticated ));  

    } catch (error) {
      //dispatch(loginFailure(error.response?.data?.message || "Login failed"));
    }
  };

  export const logOut =(dispatch)=>
  {
 // dispatch(isLoading());
  localStorage.setItem("token", '');
  return{type:"LOGOUT"}

  }
  

