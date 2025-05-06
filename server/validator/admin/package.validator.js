import {z} from "zod"

export const createPackageBodySchema =  z.object({
    
    title:z.string().trim(),
    sessionInfo:z.string().trim(),
    price:z.coerce.number(),
    description:z.string().trim(),
    available: z.string().transform(val => val === "true"),

})