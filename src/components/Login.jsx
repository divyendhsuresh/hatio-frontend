import { useState } from "react";
import { useLogin } from "../apis/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isError } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = () => {
    mutate(
      {
        username: email,
        password,
      },
      { onSuccess: () => navigate("/") },
    );
  };
  return (
    <div>
      <h1 className="text-center text-3xl">Login Here</h1>
      <div className="mt-2 flex flex-col justify-center gap-2 text-center">
        <div>
          <input
            type="text"
            className="rounded-md border-2 border-gray-300 p-1"
            placeholder="enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="password"
            className="rounded-md border-2 border-gray-300 p-1"
            placeholder="enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {isError && (
          <div className="text-sm text-red-500">Invalid email or password</div>
        )}
        <div>
          <button
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
        <div>
          <button
            className="rounded-lg bg-green-400 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-500"
            onClick={() => navigate(`/signup`)}
          >
            Create Account. Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
