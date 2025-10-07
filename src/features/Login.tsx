 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { setAccessToken, setOrganizationId } from "../utils/auth";
import { UserContext, type User  } from "../hooks/UserContext";

type UserInfo = {
  identifier: string;
  password: string;
};

const login = async (user: UserInfo) => {
  // API call or logic here
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log(apiBaseUrl);
  return axios.post(`${apiBaseUrl}/auth/login/`, user);
};

function Login() {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>();

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { setUser } = userContext;

  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: (data) => {
      console.log("Login success:", data);
      // console.log("Login success:", data.data.response.data.access);
      setAccessToken(data.data.response.data.access);
      setOrganizationId("1");
      const fakeUser: User = {
      name: 'Alice',
      email: 'alice@example.com',
    };
    setUser(fakeUser);
      navigation("/admin");
    },
  });

  const onSubmit: (data: UserInfo) => void = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div>
        <div className="text-lg font-bold">Sign In</div>
        <div className="text-current/70">Sign in using your registered account</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
        
          <div>
            <Input 
            placeholder="User name"
            readOnly={mutation.status === "pending"}
         
            {...register("identifier", {
              required: "Username is required",
            })}
          />
          {errors.identifier && <span className="text-xs text-red-500"><i className="fi fi-rr-exclamation mr-1"></i>{errors.identifier.message}</span>}
          </div>

        <div>
            <Input
            type={"password"}
            placeholder="Password"
            readOnly={mutation.status === "pending"}
          
            {...register("password", {
              required: "Password is required",
            })}
          />
           
          {errors.password && <span className="text-xs text-red-500"><i className="fi fi-rr-exclamation mr-1"></i>{errors.password.message}</span>}

        </div>
          <Button type="submit" disabled={mutation.status === "pending"} >
            {mutation.status === "pending" ? "Logging in..." : "Login"}{" "}
            <i className="fi fi-rr-arrow-right"></i>
          </Button>
       <Button asChild variant="link">
        <Link to="/forgot-password" className="block text-center">
          Forgot Password?
        </Link>
        </Button>

            {mutation.status === "error" && (
        <div>
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Login failed. Please try again."}
        </div>
      )}
      </form>
    
  
    </>
  );
}

export default Login;
