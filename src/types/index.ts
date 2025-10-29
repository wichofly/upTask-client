import { z } from 'zod';

// Schema for Project
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

// Type for Project based on the schema
export type Project = z.infer<typeof ProjectSchema>;

// Type for Project Form Data
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;
