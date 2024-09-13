import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () =>
    useMutation({
        mutationFn: ({ username, password }) =>
            axios.post('http://localhost:3000/api/users/signin', { username, password }),
        onSuccess: (data) => {
            localStorage.setItem("userId", data.data.userId)
            localStorage.setItem("token", data.data.token)

        },
        onError: (e) => {
            console.log(e);
        }
    });

export const useSignup = () =>
    useMutation({
        mutationFn: ({ username, password }) =>
            axios.post('http://localhost:3000/api/users/signup', { username, password }),
        onSuccess: (data) => {
            console.log(data.data.message);
        },
        onError: (e) => {
            console.log(e);
        }
    });
