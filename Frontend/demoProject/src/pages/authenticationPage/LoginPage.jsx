import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../componets/formComponets/Button";
import InputBox from "../../componets/formComponets/InputBox";
import { loginSchema } from "../../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sanitizeLoginData } from "../../sanitization/userInputSanitization.js";
import { authenticationService } from "./../../services";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authenticationSlice.js";
import { toast } from "react-toastify";

/*
In Login Function, we are using reactHookForm + Zod for validation
steps
1. get the data using reactHookForm
2. Valdiate the data using zod against loginSchema.
3. sanitize the data using validator
4. use authenticationService to make restapi call to server using axios, imported from user.service.js 
5. show response , change the state in store and navigate user
6. we are using resuable componet Button and Input 
*/
function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // sanitize the data, then make axios request and show proper response msg
  const onSubmit = async (data) => {
    const sanitizeData = sanitizeLoginData(data);

    try {
      const response = await authenticationService.loginUser(sanitizeData);

      if (response.status === 200) {
        const user = response?.data.data.loggedUser._id;
        dispatch(login(user));
        // console.log("User logged In Successfull");
        navigate("/protect/landingpage");
        toast.success("User Login Success");

      } else if (response.status === 401) {
        toast.error("User Credential Not Match");
        //console.log("User Credential Not Match");
        navigate("/login");
      } else {
        toast.error("User Credential Not Match");
        // console.log("Try Again");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.errors || error.message;
      toast.error(errorMessage);
      //console.log(errorMessage);
      navigate("/login");
    }
  };

  return (
    <div className="landing-page bg-gradient-to-r from-blue-500 to-purple-600 ">
      <section className="flex items-center justify-center min-h-screen bg-grey-100 p-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Welcome Back! 👋
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <InputBox
                {...register("email", { required: "Email is required" })}
                type="text"
                name="email"
                placeholder="Enter Email Address"
              ></InputBox>

              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <InputBox
                {...register("password", { required: "Password is required" })}
                type="password"
                name="password"
                placeholder="Enter Password"
              ></InputBox>

              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                bgColor="bg-blue-600"
                textColor="text-white"
                className="w-full"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
