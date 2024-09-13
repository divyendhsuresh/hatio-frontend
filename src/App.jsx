import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import Project from "./components/Project";

function App() {
  useEffect(() => {
    axios.interceptors.response.use(undefined, (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("userId");
        window.location.pathname = "/login";
        toast.error("Unauthorized, please login");
      }

      return Promise.reject(error);
    });
  }, []);

  return (
    <div className="p-2 h-screen">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<DashBoard />} />
            <Route path="/project/:projectId" element={<Project />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
