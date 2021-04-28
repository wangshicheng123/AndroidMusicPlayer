/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:19:55
 * @LastEditTime: 2021-04-28 09:37:46
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放页面
 * @FilePath: /MusicProject/src/pages/Player/components/PlayerScreen/index.tsx
 */
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Caption, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomIcon from "@/components/CustomIcon/index";
import { FavContainer } from "@/components/FavContainer/index";
import RepeatContainer from "@/components/RepeatContainer/index";
import PlayerController from "@/components/PlayerController/index";
import Progress from "@/components/Progress/index";
import Screen from "@/components/Screen/index";
import ActiveSongDetails from "@/components/ActiveSongDetails/index";
import PlaylistDialog from "@/components/PlaylistDialog/index";
import { downloadSong } from "@/reducers/songSlice";
import { IAppState } from "@/reducers/index";
import { addSongToCollectionList } from "@/reducers/collectionListSlice";

const PlayerScreen = () => {
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const dispatch = useDispatch();
  const { currentSong: songData } = useSelector(
    (state: IAppState) => state.song
  );

  const handlePlayerClose = () => {
    navigation.goBack();
  };

  const handleAddSongToCollectionList = (collectionId: number) => {
    dispatch(
      addSongToCollectionList({
        collectionListId: collectionId,
        songData: songData,
      })
    );
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
        addSongToCollectionList={handleAddSongToCollectionList}
      />
      <View style={styles.playerContainer}>
        <View style={styles.container}>
          <IconButton icon="close" onPress={handlePlayerClose} />
        </View>
        <ActiveSongDetails songData={songData} />
        <View style={styles.centerContainer}>
          <Progress />
        </View>
        <View style={styles.playerToolbox}>
          <FavContainer
            favData={songData}
            likeType="song"
            style={styles.favContainerStyle}
          />
          <PlayerController songData={songData} />
          <RepeatContainer />
          <View>
            <Text> </Text>
          </View>
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
  favContainerStyle: {
    flex: 1,
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
