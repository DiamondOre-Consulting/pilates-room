import {z} from "zod"

export const createTrainingBodySchema = z.object({
    title:z.string().trim(),
    date:z.coerce.date(),
    startTime:z.string().trim(),
    endTime:z.string().trim(),
    location:z.string().trim(),
    price:z.coerce.number(), 
    description:z.string().trim(),
    moreInfo:z.array(z.object({
        title:z.string().trim(),
        description:z.string().trim(),
    })).optional(),
    category: z.enum(['teacherTraining', 'youMayAlsoLike']),
    available: z.string().transform(val => val === "true"),
})

