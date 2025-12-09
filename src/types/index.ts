import { z } from 'zod';

/** Auth & Users 
 -----------------  
*/

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<
  Auth,
  'name' | 'email' | 'password' | 'confirmPassword'
>;
export type RequestNewCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = Pick<Auth, 'email'>;
export type ResetPasswordForm = Pick<Auth, 'password' | 'confirmPassword'>;

export type ConfirmToken = Pick<Auth, 'token'>;

/** Users
 -----------
*/

export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({ _id: z.string() });

export type User = z.infer<typeof userSchema>;

/** Tasks 
 ------------
*/
export const taskStatusSchema = z.enum([
  'pending',
  'onHold',
  'inProgress',
  'underReview',
  'completed',
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;

export type TaskFormData = Pick<Task, 'name' | 'description'>;

/** Projects
 -------------
 */
// Schema for Project
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(),
});

// Schema for array of Projects in Dashboard view
export const dashboardProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

// Type for Project based on the schema
export type Project = z.infer<typeof ProjectSchema>;

// Type for Project Form Data
export type ProjectFormData = Pick<
  Project,
  'projectName' | 'clientName' | 'description'
>;

/** Team Members
 ----------------
*/

export const teamMemberSchema = userSchema.pick({
  name: true,
  email: true,
  _id: true,
});
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;
