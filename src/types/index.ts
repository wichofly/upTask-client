import { z } from 'zod';

// Schema for Project
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

// Schema for array of Projects in Dashboard view
export const dashboardProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
  })
);

// Type for Project based on the schema
export type Project = z.infer<typeof ProjectSchema>;

// Type for Project Form Data
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;
