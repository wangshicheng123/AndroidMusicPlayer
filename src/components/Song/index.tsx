/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:32:38
 * @LastEditTime: 2021-04-18 22:35:36
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

interface SongProps {
  title: string;
  album?: string;
  artist?: string;
  cover?: string;
  type?: string;
}

interface IProps {
  songData: SongProps;
  active: boolean;
  handelSongPlay: () => void;
  handleSongDownload: () => void;
}

const Song = React.memo(
  ({ songData, active, handelSongPlay, handleSongDownload }: IProps) => {
    const theme = useTheme();
    const { colors } = theme;
    return (
      <View style={[styles.surface, { backgroundColor: colors.background }]}>
        <List.Item
          title={songData.title}
          description={songData.artist ? songData.artist : songData.album}
          left={() =>
            songData.cover ? (
              <FastImage
                source={{ uri: songData.cover }}
                style={styles.artwork}
              />
            ) : (
              <DefaultImage style={styles.artwork} />
            )
          }
          right={(props) =>
            active ? (
              <ActiveSongIcon
                style={[styles.activeSongIconStyle, props.style]}
              />
            ) : (
              songData.type === "online" && (
                <IconButton
                  icon="download-outline"
                  onPress={handleSongDownload}
                  {...props}
                />
              )
            )
          }
          onPress={() => handelSongPlay()}
        />
      </View>
    );
  }
);

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
