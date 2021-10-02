import { prismaVaccine } from '../../data';

export class VaccineService {
  public static async getAllVaccines() {
    try {
      return await prismaVaccine.findMany();
    } catch (err) {
      return [];
    }
  }
}
