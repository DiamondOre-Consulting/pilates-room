import {z} from "zod";



export const createOrderParamsSchema = z.object({
    classId:z.string().trim()
})

export const createOrderBodySchema = z.object({
    date:z.coerce.date(),
})



