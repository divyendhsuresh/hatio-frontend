import { useCreateProject, useGetAllProject } from "../../apis/useProject";
import { useState } from "react";
import queryClient from "../../utils";
import { QUERY_KEY } from "../../const/query";
import Card from "./Card";

const DashBoard = () => {
  const [title, setTitle] = useState("");
  const { mutate } = useCreateProject();
  const { data: projects } = useGetAllProject();

  const handleSubmit = () => {
    mutate(
      { title },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([QUERY_KEY.PROJECT]);
          setTitle("");
        },
        onError: (e) => console.log(e),
      },
    );
  };

  return (
    <div>
      <h1 className="text-center text-3xl">Your projects</h1>
      <div className="mt-2 flex flex-col justify-center gap-2 text-center">
        <div>
          <div className="flex justify-center gap-2">
            <input
              type="text"
              className="rounded-md border-2 border-gray-300 p-1"
              placeholder="Enter project name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="rounded-md bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800"
              onClick={handleSubmit}
            >
              Add project
            </button>
          </div>
          {projects?.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
