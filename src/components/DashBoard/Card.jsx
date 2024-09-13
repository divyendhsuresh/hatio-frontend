import { useNavigate } from "react-router";
import { useDeleteProject } from "../../apis/useProject";

const Card = ({ project }) => {
  const navigate = useNavigate();
  const { mutate } = useDeleteProject();

  const handleDelete = () => {
    mutate(project.id);
  };

  const projectId = project.id;

  const formattedDate = new Date(project.createdDate)
    .toISOString()
    .split("T")[0];

  return (
    <div className="mt-2 rounded-lg border-2 p-2">
      <p>{project.title}</p>
      <p>{formattedDate}</p>
      <div className="flex justify-center gap-2">
        <button
          className="rounded-lg bg-blue-700 p-2 text-sm font-medium text-white hover:bg-blue-800"
          onClick={() => navigate(`/project/${projectId}`)}
        >
          Go to ToDo list of {project.title}
        </button>
        <button
          className="rounded-lg bg-red-700 p-2 text-sm font-medium text-white hover:bg-red-800"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Card;
