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
        title:z.string().trim().optional(),
        description:z.string().trim().optional(),
    })).optional(),
    category: z.enum(['teacherTraining', 'youMayAlsoLike']),
    available: z.string().transform(val => val === "true"),
})


export const getSingleTrainingParamsSchema = z.object({
    trainingId:z.string().trim()
})

export const getAllTrainingsQuerySchema = z.object({
    category:z.string().trim().optional()
})


export const deleteTrainingParamsSchema = z.object({
    trainingId:z.string().trim()
})

