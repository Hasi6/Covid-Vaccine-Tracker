import { prismaLocation } from '../../data';

export class LocationService {
  public static async getAllLocations() {
    try {
      return await prismaLocation.findMany({
        where: {
          toDate: {
            lt: new Date(),
          },
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
      return [];
    }
  }
}
