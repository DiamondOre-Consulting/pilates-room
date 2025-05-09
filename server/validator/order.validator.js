import {z} from "zod";




export const addToCartParamsSchema = z.object({
    id:z.string().trim(),
    itemType:z.string().trim(),
})