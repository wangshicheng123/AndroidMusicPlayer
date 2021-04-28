/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:32:38
 * @LastEditTime: 2021-04-27 22:26:42
 * @LastEditors: Please set LastEditors
 * @Description: 音乐-item歌曲信息
 * @FilePath: /MusicProject/src/components/Track/index.tsx
 */
import React from "react";
import { IconButton, List, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import ActiveSongIcon from "../ActiveSongIcon/index";
import DefaultImage from "../DefaultImage/index";
import { ISongItem } from "@/interface/index";

interface IProps {
  songData: ISongItem;
  active: boolean;
  handelSongPlay: (songId?: number) => void;
  handleSongDownload?: () => void;
}

const Song = React.memo((props: IProps) => {
  const { songData, active, handelSongPlay, handleSongDownload } = props;
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={[styles.surface, { backgroundColor: colors.background }]}>
      <List.Item
        title={songData.song_title}
        description={songData.song_artist}
        left={() =>
          songData.song_cover ? (
            <FastImage
              source={{ uri: songData.song_cover }}
              style={styles.artwork}
            />
          ) : (
            <DefaultImage style={styles.artwork} />
          )
        }
        right={(props) =>
          active ? (
            <ActiveSongIcon style={styles.activeSongIconStyle} />
          ) : (
            <IconButton
              icon="download-outline"
              onPress={handleSongDownload}
              {...props}
            />
          )
        }
        onPress={() => handelSongPlay(songData.song_id)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
  artwork: {
    backgroundColor: "#d7d1c9",
    borderRadius: 4,
    height: 50,
    width: 50,
  },
  activeSongIconStyle: {
    height: 50,
    width: 30,
    marginLeft: 4,
  },
});

export default Song;
