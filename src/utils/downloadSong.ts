/*
 * @Author: wangshicheng
 * @Date: 2021-04-19 10:10:12
 * @LastEditTime: 2021-04-19 16:30:59
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲文件下载
 * @FilePath: /MusicProject/src/utils/downloadSong.ts
 */
import RNFS from "react-native-fs";

/**
 * @description: 获取歌曲下载进度
 * @param {any} progressData
 * @return {*}
 */
const getDownloadFileProgress = (progressData: any) => {
  const percentage =
    ((100 * progressData.bytesWritten) / progressData.contentLength) | 0;
  const text = `Progress ${percentage}%`;
  console.log("download file progress: ", text);
};

/**
 * @description: 处理歌曲下载
 * @param {string} url
 * @param {string} filePath
 * @return {*}
 */
export const download = (url: string, filePath: string) => {
  const { promise } = RNFS.downloadFile({
    fromUrl: url,
    toFile: filePath,
    progress: (progressData) => getDownloadFileProgress(progressData),
  });
  return promise;
};

/**
 * @description: 检查文件夹路径是否存在
 * @param {*} async
 * @return {*}
 */
export const checkFolderPath = async (folderPath: string) => {
  try {
    const isPresent = await RNFS.exists(folderPath);
    if (!isPresent) {
      await RNFS.mkdir(folderPath);
    }
  } catch (error) {
    console.log("checkFolderPath", error);
  }
};
