import {z} from "zod"


export const createMembershipPackageBodySchema = z.object({
    packageName:z.string().trim(),
    validity:z.string().trim(),
    totalSessions:z.coerce.number(),
    price:z.coerce.number(),
    perSessionPrice:z.coerce.number(),
    description:z.string().trim(),
    packageType:z.enum(["monthly","quarterly","yearly"]),
    available: z.string().transform(val => val === "true").optional(),
})

export const getSingleMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})


export const deleteMembershipPackageParamsSchema = z.object({
    membershipPackageId:z.string().trim()
})