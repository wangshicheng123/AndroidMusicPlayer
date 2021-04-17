/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 14:37:41
 * @LastEditTime: 2021-04-17 18:37:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Introduction/config.ts
 */

import Images from "@/assets/Images";

export const scrollConfig = [
  {
    type: "Welcome",
    imageUri: Images.welcomeImage,
    heading: "Getting Started",
    description: "Modern music player focused on streaming from free sources.",
    key: "first",
    color: "#00B0FF",
    icon: "arrow-forward",
  },
  {
    type: "Grant Access",
    imageUri: Images.filesImage,
    heading: "External Storage",
    description:
      "Serenity Needs Access to your External Storage to read your music",
    key: "second",
    color: "#F9A826",
  },
  {
    type: "Google",
    imageUri: Images.youtubeImage,
    heading: "Google Login",
    description:
      "Serenity Needs Access to your YouTube library to list playlist you have created in YouTube. (Optional)",
    key: "third",
    color: "#F50057",
    icon: "logo-youtube",
  },
  {
    type: "Ready",
    imageUri: Images.readyImage,
    heading: "Let's Go",
    description: "Introduction is over Enjoy Serenity!",
    key: "fourth",
    color: "#00BFA6",
    icon: "done-outline",
  },
];
