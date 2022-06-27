import { Avatar, Button, Input } from "@rneui/themed";
import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import { Icon } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");

  async function createChat() {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: input,
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.goBack();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerBackTitle: "Chats",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} title="Create new chat" onPress={createChat} />
    </View>
  );
};
export default AddChatScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    height: "100%",
  },
});
