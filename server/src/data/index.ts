import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaUser = prisma.user;
export const prismaProfile = prisma.profile;
export const prismaDistricts = prisma.district;
export const prismaVaccine = prisma.vaccine;
export const prismaLocation = prisma.location;
