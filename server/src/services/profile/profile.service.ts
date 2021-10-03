import { prismaProfile, prismaUser } from '../../data';

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

  public static async getProfileByNIC(NIC: string) {
    try {
      return await prismaUser.findUnique({
        where: {
          NIC,
        },
        include: {
          profile: {
            include: {
              district: true,
              vaccine: true,
            },
          },
        },
      });
    } catch (err) {
      return null;
    }
  }

  public static async updateProfileDetails(NIC: string, status: boolean) {
    try {
      return await prismaUser.update({
        where: {
          NIC,
        },
        data: {
          profile: {
            update: {
              vaccinateConfirm: status,
            },
          },
        },
      });
    } catch (err) {
      return null;
    }
  }
}
