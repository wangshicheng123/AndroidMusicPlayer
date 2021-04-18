/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:19:55
 * @LastEditTime: 2021-04-18 23:49:42
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
// import { RootReducerType } from '../../reducers';
import PlaylistDialog from "@/components/PlaylistDialog/index";
// import { addToPlaylist } from '../../actions/playerState';
// import { downloadMedia } from '../../actions/mediaStore';
import { ISongItem } from "@/interface/index";

const PlayerScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState("");
  const dispatch = useDispatch();
  const close = () => {
    navigation.goBack();
  };

  const addSongToPlaylist = (id: string) => {
    // dispatch(addToPlaylist(id, active));
    setVisible("");
  };

  // const active = useSelector(
  //   (state: RootReducerType) => state.playerState.active,
  // );
  // test
  const active: ISongItem = {
    id: "1",
    cover:
      "https://dl.dropboxusercontent.com/s/cmzkdk7lxsxvnnb/ni-sanihake-bandare.jpg?dl=0",
    title: "Ni Sanihake bandare",
    path:
      "https://dl.dropboxusercontent.com/s/o4djrulrcic6zjb/Nee%20Sanihake%20Bandre.mp3?dl=0",
    artist: "Sonu Nigam",
    type: "online",
  };

  function download() {
    // dispatch(downloadMedia(active));
    setVisible("");
  }

  return (
    <Screen>
      <PlaylistDialog
        visible={visible === "DIALOG"}
        hideModal={() => setVisible("")}
        addToPlaylist={addSongToPlaylist}
      />
      <View style={styles.playerContainer}>
        <View style={styles.container}>
          <IconButton icon="close" onPress={close} />
        </View>
        <ActiveTrackDetails track={active} />
        <View style={styles.centerContainer}>
          <Progress />
        </View>
        <View style={styles.playerToolbox}>
          <FavContainer item={active} type="song" style={{ flex: 1 }} />
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
            active.type?.toLowerCase()
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
              onPress={() => setVisible("DIALOG")}
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
