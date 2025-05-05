import {z} from "zod"


export const createClassBodySchema = z.object({
    title:z.string().min(3).max(30).trim(),
    description:z.string().min(3).max(30).trim(),
    location:z.string().min(3).max(30).trim(),
    date:z.coerce.date(),
    time:z.string().trim(),
    price:z.coerce.number(),
    capacity:z.coerce.number(),
    instructorName:z.string().min(3).max(30).trim(),        
    duration:z.string().trim(),
    enrolledCount:z.coerce.number().default(0),
    available:z.coerce.boolean(),
})



export const getClassesQuerySchema = z.object({
    limit:z.coerce.number().default(10),
    page:z.coerce.number().default(1),
    date:z.coerce.date().optional(),
    location:z.string().trim().optional()
})

export const deleteClassParamsSchema = z.object({
    classId:z.string().trim()
})