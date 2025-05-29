import {z} from "zod"


export const createMembershipPackageBodySchema = z.object({
    packageName:z.string().trim(),
    validity:z.coerce.number(),
    totalSessions:z.coerce.number(),
    price:z.coerce.number(),
    perSessionPrice:z.coerce.number(),
    description:z.string().trim(),
    packageType:z.enum(["monthly","quarterly","discovery"]),
    available: z.boolean().optional(),
    location:z.enum(["noida", "faridabad"])
})

export const getSingleMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})


export const deleteMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})


export const editMembershipPackageBodySchema = z.object({
    packageName:z.string().trim().optional(),
    validity:z.coerce.number().optional(),
    totalSessions:z.coerce.number().optional(),
    price:z.coerce.number().optional(),
    perSessionPrice:z.coerce.number().optional(),
    description:z.string().trim().optional(),
    packageType:z.enum(["monthly","quarterly","discovery"]).optional(),
    available: z.boolean().optional(),
      location:z.enum(["noida", "faridabad"]).optional()
})

export const editMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})

export const getAllMembershipPackagesForUserQuerySchema = z.object({
    packageType:z.string().trim().optional(),
    location:z.string().trim().optional()
})


export const buyMembershipBodySchema = z.object({
    membershipPackageId:z.string().trim(),
    paymentId:z.string().trim()
})