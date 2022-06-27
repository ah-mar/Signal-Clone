import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Input, Image, Text, Avatar } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase.js";
import { SafeAreaView } from "react-native";
import CustomListItem from "../components/CustomListItem.js";
import { Icon } from "@rneui/themed";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  console.log("chats is", chats);

  useEffect(() => {
    const unsubscribe = getDocs(collection(db, "chats")).then((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar
              onPress={logout}
              rounded
              source={{ uri: auth?.currentUser?.photoURL }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
              onPress={() => navigation.navigate("AddChat")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  function enterChat(id, chatName) {
    console.log(id, chatName);
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map((chat) => (
          <CustomListItem
            key={chat.id}
            id={chat.id}
            chatName={chat.data.chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
      <StatusBar style="light" />

      <Button containerStyle={styles.button} title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    marginRight: 10,
  },
  container: {
    height: "100%",
    padding: 10,
    backgroundColor: "white",
  },
});

export default HomeScreen;
