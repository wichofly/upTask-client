import { Fragment } from 'react/jsx-runtime';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import type { TaskProject } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../api/TaskAPI';
import { toast } from 'react-toastify';
import { useDraggable } from '@dnd-kit/core';

type TaskCardProps = {
  task: TaskProject;
  managerCanEdit: boolean;
};

export const TaskCard = ({ task, managerCanEdit }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="p-5 bg-white border border-slate-300 flex justify-between gap-3 rounded-md"
    >
      <div className="min-w-0 flex flex-col gap-y-4">
        <button
          type="button"
          className="text-xl font-semibold text-slate-600 text-left cursor-pointer"
          onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
        >
          {task.name}
        </button>
        <p
          {...listeners}
          {...attributes}
          className="text-slate-500 cursor-grabbing"
        >
          {task.description}
        </p>
      </div>

      <div className="flex shrink-0 gap-x-6">
        <Menu as="div" className="relative flex-none">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 cursor-pointer">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </MenuButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <MenuItem>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                  onClick={() =>
                    navigate(location.pathname + `?viewTask=${task._id}`)
                  }
                >
                  View Task
                </button>
              </MenuItem>
              {managerCanEdit && (
                <>
                  <MenuItem>
                    <button
                      onClick={() =>
                        navigate(location.pathname + `?editTask=${task._id}`)
                      }
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                    >
                      Edit Task
                    </button>
                  </MenuItem>

                  <MenuItem>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer"
                      onClick={() => mutate({ projectId, taskId: task._id })}
                    >
                      Delete Task
                    </button>
                  </MenuItem>
                </>
              )}
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};
