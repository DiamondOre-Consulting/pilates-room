import {z} from "zod"


export const createMembershipPackageBodySchema = z.object({
    packageName:z.string().trim(),
    validity:z.string().trim(),
    totalSessions:z.coerce.number(),
    price:z.coerce.number(),
    perSessionPrice:z.coerce.number(),
    description:z.string().trim(),
    packageType:z.enum(["monthly","quarterly","yearly"]),
    available: z.boolean().optional(),
})

export const getSingleMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})


export const deleteMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})


export const editMembershipPackageBodySchema = z.object({
    packageName:z.string().trim().optional(),
    validity:z.string().trim().optional(),
    totalSessions:z.coerce.number().optional(),
    price:z.coerce.number().optional(),
    perSessionPrice:z.coerce.number().optional(),
    description:z.string().trim().optional(),
    packageType:z.enum(["monthly","quarterly","discovery"]).optional(),
    available: z.boolean().optional(),
})

export const editMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})

export const getAllMembershipPackagesForUserQuerySchema = z.object({
    packageType:z.string().trim().optional()
})