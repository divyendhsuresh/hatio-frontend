import { useQuery, useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../const/query";
import axiosInstance from "./axiosInstance";


export const useGetTodos = (projectId) => {
    console.log(projectId);
    return useQuery({
        queryFn: () => axiosInstance.get(`http://localhost:3000/api/project/${projectId}/todos`),
        enabled: !!projectId,
        queryKey: [QUERY_KEY.TODO, projectId],
        select: response => response.data
    })
}

export const useCreateTodo = (projectId) =>
    useMutation({
        mutationFn: ({ description, status }) => {
            return axiosInstance.post(`http://localhost:3000/api/project/todos/${projectId}`, { description, status })
        },
        onSuccess: (data) => {
            console.log(data.data);
        },
        onError: (e) => {
            console.log(e);
        }
    });

export const useUploadTodo = () =>
    useMutation({
        mutationFn: ({ projectTitle, todos }) => {
            return axiosInstance.post(`http://localhost:3000/api/gist/create-gist`, { projectTitle, todos })
        },
        onSuccess: (data) => {
            console.log(data.data);
        },
        onError: (e) => {
            console.log(e);
        }
    });

export const useDownloadTodo = () =>
    useMutation({
        mutationFn: ({ gistId }) => {
            return axiosInstance.get(`/download-gist/${gistId}`)
        },
        onSuccess: (data) => {
            console.log(data.data);
        },
        onError: (e) => {
            console.log(e);
        }
    });