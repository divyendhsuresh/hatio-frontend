import { useNavigate } from "react-router";
import { useDeleteProject } from "../../apis/useProject";
import { useGetTodos } from "../../apis/useTodos";

const TodoCard = ({ projectId }) => {
  const navigate = useNavigate();
  const { data } = useGetTodos(projectId);

  return (
    <div>
      {data?.map((datas) => (
        <div key={datas.id} className="mt-2 rounded-lg border-2 p-2">
          <p>{datas.description}</p>
          <p>{datas.status}</p>
          <p>{datas.updatedDate}</p>
          <p>{datas.createdDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;
