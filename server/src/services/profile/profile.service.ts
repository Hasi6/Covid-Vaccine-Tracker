import { prismaProfile } from '../../data';

export class ProfileService {
  public static async addProfile(data: any) {
    try {
      const profile = await prismaProfile.findUnique({ where: { userId: data?.userId } });
      if (!profile) {
        return await prismaProfile.create({
          data,
        });
      }
      return await this.updateProfile(profile?.id, data);
    } catch (err) {
      return [];
    }
  }

  public static async updateProfile(id: number, data: any) {
    try {
      return await prismaProfile.update({
        data,
        where: {
          id,
        },
      });
    } catch (err) {
      return [];
    }
  }

  public static async getProfile(userId: number) {
    try {
      return await prismaProfile.findUnique({
        where: {
          userId,
        },
      });
    } catch (err) {
      return null;
    }
  }
}
