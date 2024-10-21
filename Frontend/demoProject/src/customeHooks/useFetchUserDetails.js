import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/authenticationSlice.js";
import authenticationService from "../services/user.service.js";




/*
We dont want to store user sensitive data in Localstorage or sessionStorage. we wanted to store
data in state. In this hook, it will only get user data if user is authenticated and then update the store. or if store has user data, then it wont make new server request.
This is to prevent XSS attack
This Hook can be used to check authentication and get current logged User details by decoding Jwt Token at server. This ensure user data is safe.
*/
const useFetchUserDetails = () => {
  const dispatch = useDispatch();

  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const user = useSelector((state) => state.auth.user);

  const fetchUserDetails = async () => {
    try {
      const response = await authenticationService.fetchUserDetails();
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUserDetails();
    }
  }, [isAuthenticated, user, dispatch]);

  return { user };
};

export default useFetchUserDetails;
