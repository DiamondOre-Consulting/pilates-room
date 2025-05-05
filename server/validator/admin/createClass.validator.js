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