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

export const editTrainingBodySchema = z.object({
    title:z.string().trim().optional(),
    date:z.coerce.date().optional(),
    startTime:z.string().trim().optional(),
    endTime:z.string().trim().optional(),
    location:z.string().trim().optional(),
    price:z.coerce.number().optional(), 
    description:z.string().trim().optional(),
    moreInfo:z.array(z.object({
        title:z.string().trim().optional(),
        description:z.string().trim().optional(),
        uniqueId:z.string().trim().optional(),
    })).optional(),   
    moreInfoImagesIndex:z.array(z.string().trim()).optional(),
    category: z.enum(['teacherTraining', 'youMayAlsoLike']).optional(),
    available: z.string().transform(val => val === "true").optional(),
})

export const editTrainingsParamsSchema = z.object({
    trainingId:z.string().trim()
})



