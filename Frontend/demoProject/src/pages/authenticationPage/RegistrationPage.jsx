import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../componets/formComponets/Button";
import InputBox from "../../componets/formComponets/InputBox";
import { registrationSchema } from "../../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { sanitizeRegistrationData } from "./../../sanitization/userInputSanitization";
import { authenticationService } from "../../services";
import { toast } from "react-toastify";


/*
In Register Function, we are using reactHookForm + Zod for validation
steps
1. get the data using reactHookForm
2. Valdiate the data using zod against RegisterSchema.
3. sanitize the data using validator
4. use authenticationService to make restapi call to server using axios, imported from user.service.js 
5. show response and navigate user
6. we are using resuable componet Button and Input 
*/
function RegistrationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data) => {
    const sanitizeData = sanitizeRegistrationData(data);
    const userData = {
      email: sanitizeData.email,
      username: sanitizeData.username,
      password: sanitizeData.password,
    };

    try {
      const response = await authenticationService.registerUser(userData);

      if (response.status === 201) {
        reset();
        navigate("/login");
        toast.success("User Accout Created");
      } else {
        toast.error("User Registration Failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors?.errors || error.message;
      console.log(errorMessage);
      toast.error(errorMessage);
      navigate("/register");
    }
  };

  return (
    <div className="landing-page bg-gradient-to-r to-blue-500 from-purple-600 ">
      <section className="flex items-center justify-center min-h-screen bg-grey-100 p-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Create Your Account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <InputBox
                {...register("username", { required: "Username is required" })}
                type="text"
                name="username"
                placeholder="Enter username"
              ></InputBox>

              {errors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

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

            <div className="relative">
              <InputBox
                {...register("confirmPassword", {
                  required: "Password is required",
                })}
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
              ></InputBox>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
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
                {isSubmitting ? "Checking..." : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have account
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrationPage;
