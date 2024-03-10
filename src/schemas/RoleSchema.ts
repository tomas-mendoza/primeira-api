import { z } from 'zod';

export const createRoleSchema = z.object({
  body: z.object({
    name: z.
      string().min(3, { message: 'The name must be higher than 3 characters!' }),
    description: z.
      string().optional(),
  })
});

export const getRoleSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'The ID must be higher than or equal to 1' })
  })
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'The ID must be higher than or equal to 1' })
  }),
  body: z.object({
    name: z.
      string().min(3, { message: 'The name must be higher than 3 characters!' }),
    description: z.
      string().optional(),
  })
});