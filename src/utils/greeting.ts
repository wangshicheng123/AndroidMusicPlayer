/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 11:20:09
 * @LastEditTime: 2021-04-18 11:28:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/utils/greeting.ts
 */

interface IGetGreetingTime {
  currentTime: Date;
}
export const getGreetingTime = (
  params: IGetGreetingTime = { currentTime: new Date() }
) => {
  const { currentTime } = params;
  const currentHour = currentTime.getHours();
  const splitAfternoon = 12;
  const splitEvening = 15;
  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    return "Good afternoon";
  } else if (currentHour < splitAfternoon) {
    return "Good morning";
  } else {
    return "Goog evening";
  }
};
