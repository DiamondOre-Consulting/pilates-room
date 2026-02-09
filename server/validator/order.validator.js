import {date, z} from "zod";



export const createOrderParamsSchema = z.object({
    classId:z.string().trim()
})

export const createOrderBodySchema = z.object({
    date:z.coerce.date(),
})


export const deleteOrderParamsSchema = z.object({
    orderId:z.string().trim()
})


export const getSingleOrderParamsSchema = z.object({
    orderId:z.string().trim()
})


export const getAllOrdersQuerySchema = z.object({
    limit:z.coerce.number().default(10).optional(),
    page:z.coerce.number().default(1).optional(),
    date:z.coerce.date().optional(),
    search:z.string().trim().optional(),
})


