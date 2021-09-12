import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const prismaUser = prisma.user;
export const prismaProfile = prisma.profile;
