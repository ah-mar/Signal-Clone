import { Avatar, ListItem } from "@rneui/themed";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  console.log("chatMessages is", chatMessages);

  useEffect(() => {
    const messagesRef = collection(db, "chats", id, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("docs array is", querySnapshot.docs);

      setChatMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
      <Avatar
        rounded
        source={{
          uri: chatMessages[chatMessages.length - 1]?.data?.photoURL,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "bold" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[chatMessages.length - 1]?.data?.displayName}:{" "}
          {chatMessages?.[chatMessages.length - 1]?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
export default CustomListItem;
const styles = StyleSheet.create({
  container: {},
});
