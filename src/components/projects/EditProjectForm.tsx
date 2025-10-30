import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import type { ProjectFormData } from '../../types';
import { useForm } from 'react-hook-form';

type EditProjectFormProps = {
  data: ProjectFormData;
};

export const EditProjectForm = ({ data }: EditProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    console.log(formData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-semibold">Edit Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill in the details below to edit the project.
        </p>

        <Link
          to="/"
          className="text-white bg-purple-400 hover:bg-purple-500 px-10 py-3 text-xl font-semibold rounded-md my-5 inline-block transition-colors"
        >
          Back To Projects
        </Link>

        <form
          onSubmit={handleSubmit(handleForm)}
          noValidate
          className="mt-10 bg-white shadow-lg p-10 rounded-md"
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Save Changes"
            className="bg-fuchsia-600 w-full p-3 text-white rounded-md uppercase font-semibold hover:bg-fuchsia-700 transition-colors cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};
