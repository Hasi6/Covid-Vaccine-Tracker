import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user = prisma.user;
const post = prisma.post;
const profile = prisma.profile;

export default { user, post, profile };
