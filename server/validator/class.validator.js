import {z} from "zod"


export const createClassBodySchema = z.object({
    title:z.string().trim(),
    description:z.string().trim(),
    location:z.string().trim(),
    weeks: z
    .array(
    z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
     ),
    time:z.string().trim(),
    price:z.coerce.number(),
    capacity:z.coerce.number(),
    instructorName:z.string().trim(),        
    duration:z.string().trim(),
    enrolledCount:z.coerce.number().default(0),
    available: z.string().transform(val => val === "true"),
})



export const getClassesQuerySchema = z.object({
    limit:z.coerce.number().default(10).optional(),
    page:z.coerce.number().default(1).optional(),
    date:z.coerce.date().optional().optional(),
    location:z.string().trim().optional()
})

export const deleteClassParamsSchema = z.object({
    classId:z.string().trim()
})

export const editClassBodySchema = z.object({

    title:z.string().trim().optional(),
    description:z.string().trim().optional(),
    location:z.string().trim().optional(),
    weeks: z
    .array(
    z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])
    ).optional(),
    time:z.string().trim().optional(),
    price:z.coerce.number().optional(),
    capacity:z.coerce.number().optional(),
    instructorName:z.string().trim().optional(),        
    duration:z.string().trim().optional(),
    enrolledCount:z.coerce.number().optional(),
    available: z.string().transform(val => val === "true").optional(),
    
})


export const editClassParamsSchema = z.object({
    classId:z.string().trim()
})  