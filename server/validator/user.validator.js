import {z} from "zod";


export const getAllUsersQuerySchema = z.object({
    limit:z.coerce.number().default(10).optional(),
    page:z.coerce.number().default(1).optional(),
    fullName:z.string().trim().optional(),
    email:z.string().trim().optional(),
})