import {z} from 'zod'

export const createUserByAdminBodySchema = z.object({
    firstName:z.string().min(3).max(30),
    lastName:z.string().min(3).max(30),
    email:z.string().email(),
    password:z.string().min(6).max(20),
    phoneNumber:z.string().min(12).max(12),
    birthDate:z.coerce.date()
})

export const addMembershipByAdminParamsSchema = z.object({
    userId:z.string().trim(),
    membershipPackageId:z.string().trim()
})