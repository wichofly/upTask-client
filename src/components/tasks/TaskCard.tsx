import type { Task } from '../../types';

type TaskCardProps = {
  task: Task;
};

export const TaskCard = ({ task }: TaskCardProps) => {
  return <div>{task.name}</div>;
};
