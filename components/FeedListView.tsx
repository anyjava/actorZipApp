import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";

function ListItem({ title, desc }: { title: string; desc: string }) {
  return (
    <View style={{ width: 250, height: 50 }}>
      <Text style={{ flex: 1 }}>{title} {desc}</Text>
    </View>
  );
}

function returnFlatListItem(item: FeedResponse, index: number) {
  console.log(item);
  return <ListItem title={item.title} desc={"testdesc"} />;
}

interface FeedResponse {
  title: string;
  siteType: string;
  url: string;
  registrationDate: string;
}

interface State {
  refreshing: Boolean;
  data: any;
  desc: string;
}

export default class FeedListView extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
      data: [],
      desc: "",
    };
  }

  componentDidMount() {
    console.log("OK");
    this.fetchCats();
  }

  fetchCats() {
    this.setState({ refreshing: true });
    fetch(
      "https://83a1zafg25.execute-api.ap-northeast-2.amazonaws.com/dev/feeds?size=100"
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        this.setState({ data: resJson.content });
        this.setState({ refreshing: false });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.container}> */}
        <FlatList
          style={styles.listContainer}
          data={this.state.data}
          renderItem={({ item, index }) => {
            console.log(item);
            return returnFlatListItem(item, index);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "tomato",
    marginTop: Platform.OS === "ios" ? 34 : 0,
  },
  listContainer: {
    width: 300,
    height: 300,
    flexDirection: "column",
    backgroundColor: "cyan",
  },
  listItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    margin: 10,
  },
});
