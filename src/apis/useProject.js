import { useMutation, useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "../const/query";
import queryClient from "../utils";
import axiosInstance from "./axiosInstance";

export const useCreateProject = () =>
    useMutation({
        mutationFn: ({ title }) => {
            const userId = localStorage.getItem('userId')
            console.log(userId);
            return axiosInstance.post('http://localhost:3000/api/project', { title, userId })
        },
        onSuccess: (data) => {
            console.log(data.data);
        },
        onError: (e) => {
            console.log(e);
        }
    });

export const useGetAllProject = () => {
    const userId = localStorage.getItem('userId');
    return useQuery({
        queryFn: () => {
            return axiosInstance.get('http://localhost:3000/api/project', { params: { userId } })
        },
        queryKey: [QUERY_KEY.PROJECT, userId],
        select: (data) => data.data
    })
}

export const useDeleteProject = () => useMutation({
    mutationFn: (projectId) => axiosInstance.delete(`http://localhost:3000/api/project/${projectId}`),
    onSuccess: () => queryClient.invalidateQueries([QUERY_KEY.PROJECT])
});

export const useGetProjectDetails = (projectId) => useQuery({
    queryFn: () => {
        return axiosInstance.get(`http://localhost:3000/api/project/projects/${projectId}`)
    },
    queryKey: [QUERY_KEY.PROJECT_DETAILS, projectId],
    select: (data) => data.data
})