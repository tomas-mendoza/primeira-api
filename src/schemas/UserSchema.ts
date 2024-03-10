import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.
      string().min(3, { message: 'The name must be higher than 3 characters!' }),
    age: z.
      number().int({ message: 'The age must be a integer!' }),
    cpf: z.
      string().refine((value) => value.match(/^\d{3}\d{3}\d{3}\d{2}$/g), { message: 'The CPF must be valid!' })
  })
});

export const getUserSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'The ID must be higher than or equal to 1' })
  })
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'The ID must be higher than or equal to 1' })
  }),
  body: z.object({
    name: z.
      string().min(3, { message: 'The name must be higher than 3 characters!' }).optional(),
    age: z.
      number().int({ message: 'The age must be a integer!' }).optional(),
    cpf: z.
      string().refine((value) => value.match(/^\d{3}\d{3}\d{3}\d{2}$/g), { message: 'The CPF must be valid!' }).optional()
  })
});