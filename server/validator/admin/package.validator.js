import {z} from "zod"

export const createPackageBodySchema =  z.object({
    
    title:z.string().trim(),
    sessionInfo:z.string().trim(),
    price:z.coerce.number(),
    description:z.string().trim(),
    available: z.string().transform(val => val === "true"),

})


export const getAllPackagesQuerySchema = z.object({
    limit:z.coerce.number().default(10).optional(),
    page:z.coerce.number().default(1).optional(),
})


export const getSinglePackageParamsSchema = z.object({
    packageId:z.string().trim()
})