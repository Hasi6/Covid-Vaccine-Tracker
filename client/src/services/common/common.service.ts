import axios from 'axios';
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
}
