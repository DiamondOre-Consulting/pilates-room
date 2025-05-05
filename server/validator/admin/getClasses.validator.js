import {z} from "zod"



export const getClassesQuerySchema = z.object({
    limit:z.coerce.number().default(10),
    page:z.coerce.number().default(1)
})