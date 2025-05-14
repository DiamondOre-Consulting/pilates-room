import {z} from "zod";



export const createOrderParamsSchema = z.object({
    classId:z.string().trim()
})



