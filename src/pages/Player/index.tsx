/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:19:55
 * @LastEditTime: 2021-04-20 00:46:34
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放页面
 * @FilePath: /MusicProject/src/pages/Player/components/PlayerScreen/index.tsx
 */
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Caption, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { includes } from "lodash";
import CustomIcon from "@/components/CustomIcon/index";
import { FavContainer } from "@/components/FavContainer/index";
import RepeatContainer from "@/components/RepeatContainer/index";
import PlayerController from "@/components/PlayerController/index";
import Progress from "@/components/Progress/index";
import Screen from "@/components/Screen/index";
import ActiveTrackDetails from "@/components/ActiveTrackDetails/index";
import PlaylistDialog from "@/components/PlaylistDialog/index";
import { downloadSong, cacheLoadSong } from "@/reducers/songSlice";
import { addToPlayingQueue } from "@/reducers/queueSlice";

interface IProps {
  route: any;
}
const PlayerScreen = (props: IProps) => {
  const { route } = props;
  const { songData } = route.params;
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const handlePlayerClose = () => {
    navigation.goBack();
  };

  const addSongToPlaylist = (id: string) => {
    dispatch(addToPlayingQueue([songData]));
    // dispatch(addToPlaylist(id, active));
    setDialogVisible(false);
  };

  const download = () => {
    dispatch(downloadSong({ songData: songData }));
    setDialogVisible(false);
  };

  return (
    <Screen>
      <PlaylistDialog
        visible={dialogVisible}
        hideModal={() => setDialogVisible(false)}
        addToPlaylist={addSongToPlaylist}
      />
      <View style={styles.playerContainer}>
        <View style={styles.container}>
          <IconButton icon="close" onPress={handlePlayerClose} />
        </View>
        <ActiveTrackDetails track={songData} />
        <View style={styles.centerContainer}>
          <Progress />
        </View>
        <View style={styles.playerToolbox}>
          <FavContainer item={songData} type="song" style={{ flex: 1 }} />
          <PlayerController />
          <RepeatContainer />
        </View>
        <View style={styles.extraMenuContainer}>
          <View style={styles.extraIcon}>
            <IconButton
              size={20}
              style={styles.iconButtonStyle}
              icon={(props) => <CustomIcon name="menu-outline" {...props} />}
              onPress={() => navigation.navigate("Queue")}
            />
            <Caption>Queue</Caption>
          </View>
          {includes(
            ["youtube", "online", "jiosaavn"],
            songData.type?.toLowerCase()
          ) && (
            <View style={styles.extraIcon}>
              <IconButton
                style={styles.iconButtonStyle}
                size={20}
                icon={(props) => (
                  <CustomIcon name="download-outline" {...props} />
                )}
                onPress={download}
              />
              <Caption>Download</Caption>
            </View>
          )}
          <View style={styles.extraIcon}>
            <IconButton
              size={20}
              style={styles.iconButtonStyle}
              icon={(props) => (
                <CustomIcon name="folder-add-outline" {...props} />
              )}
              onPress={() => setDialogVisible(true)}
            />
            <Caption>Playlist</Caption>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  playerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  playerToolbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 16,
  },
  extraMenuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 12,
  },
  extraIcon: { justifyContent: "center", alignItems: "center" },

  iconButtonStyle: {
    padding: 0,
    margin: 0,
  },
});

export default PlayerScreen;
