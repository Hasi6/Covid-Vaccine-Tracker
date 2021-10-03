import { prismaLocation } from '../../data';

export class LocationService {
  public static async getAllLocations() {
    try {
      return await prismaLocation.findMany({
        where: {
          toDate: {
            gte: new Date(),
          },
        },
        include: {
          district: true,
        },
      });
    } catch (err) {
      return [];
    }
  }

  public static async addLocation(data: any) {
    try {
      return await prismaLocation.create({ data });
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
