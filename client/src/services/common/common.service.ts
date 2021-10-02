import axios from 'axios';
import http from '../http/http.service';
export class CommonService {
  public static getGreeting() {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      return 'Good Morning';
    }
    if (curHr < 18) {
      return 'Good Afternoon';
    }
    {
      return 'Good Evening';
    }
  }

  public static async getCovidDetails() {
    try {
      const res = await axios.get('https://www.hpb.health.gov.lk/api/get-current-statistical');
      if (res?.data?.data) {
        const data = res?.data?.data;
        return {
          localDeaths: data?.local_deaths,
          globalDeaths: data?.global_deaths,
          localCases: data?.local_total_cases,
          globalCases: data?.global_total_cases,
        };
      }
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async getAllDistricts() {
    try {
      const res = await http.get('/districts');
      if (res?.data?.data) {
        const data = res?.data?.data;
        return data;
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  public static async getAllVaccines() {
    try {
      const res = await http.get('/vaccine');
      if (res?.data?.data) {
        const data = res?.data?.data;

        return data?.map((da: any) => ({ ...da, En: da?.title }));
      }
      return [];
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}
