import { prismaDistricts } from '../../data';

export class DistrictService {
  public static async getAllDistricts() {
    try {
      return await prismaDistricts.findMany();
    } catch (err) {
      return [];
    }
  }
}
