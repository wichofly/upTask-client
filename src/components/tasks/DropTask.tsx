import { useDroppable } from '@dnd-kit/core';

type DropTaskProps = {
  status: string;
};

export const DropTask = ({ status }: DropTaskProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  const style = {
    opacity: isOver ? 0.4 : undefined,
  };

  return (
    <div
      style={style}
      className="text-xs text-slate-500 font-semibold uppercase p-2 border border-dashed border-slate-300 rounded-md mt-5 grid place-content-center"
      ref={setNodeRef}
    >
      Drop Task here
    </div>
  );
};
