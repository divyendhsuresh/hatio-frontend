import { useParams } from "react-router";
import { useState } from "react";
import { useCreateTodo, useGetTodos, useUploadTodo } from "../../apis/useTodos";
import { useGetProjectDetails } from "../../apis/useProject";
import TodoCard from "./TodoCard";
import { QUERY_KEY } from "../../const/query";
import queryClient from "../../utils";

const Project = () => {
  const [todo, setTodo] = useState("");
  const [gistLink, setGistLink] = useState("");
  const { projectId } = useParams();
  const { mutate } = useCreateTodo(projectId);
  const { mutate: uploadTodo } = useUploadTodo();

  const { data: project } = useGetProjectDetails(projectId);

  const handleExportGist = () => {
    uploadTodo(
      {
        projectTitle: project?.title,
        todos: project?.todos.map((todo) => ({
          title: todo.description,
          completed: todo.status === "completed",
        })),
      },
      {
        onSuccess: (data) => {
          console.log(data.data);
          setGistLink(data.data.gistUrl);
        },
        onError: (e) => console.log(e),
      },
    );
  };

  const handleSubmit = () => {
    mutate(
      { description: todo, status: "pending" },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEY.TODO, projectId]);
          setTitle("");
        },
        onError: (e) => console.log(e),
      },
    );
  };
  console.log(gistLink);
  return (
    <div>
      <h1 className="text-center text-3xl">{project?.title}</h1>
      <div className="mt-2 flex flex-col justify-center gap-2 text-center">
        <div className="flex flex-col">
          <div className="flex justify-center gap-2">
            <input
              type="text"
              className="rounded-md border-2 border-gray-300 p-1"
              placeholder="Enter Todo Description"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
              onClick={handleSubmit}
            >
              Add Todo
            </button>
            <button
              className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
              onClick={handleExportGist}
            >
              Generate report
            </button>
          </div>
          {gistLink && (
            <a
              target="_blank"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              href={gistLink}
            >
              {" "}
              Click here to see the report
            </a>
          )}
          <TodoCard projectId={projectId} />
        </div>
      </div>
    </div>
  );
};

export default Project;
