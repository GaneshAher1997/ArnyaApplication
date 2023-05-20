import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  // navigation.navigate('Chat', { id: chat.id, name: chat.user.name })
  return (
    <Pressable
      onPress={() => navigation.navigate('Chats', { id: chat.id, name: chat.user.name })}
      style={styles.container}
    >
      <Image source={{ uri: chat.user.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {chat.user.name}
          </Text>
          <Text style={styles.subTitle}>12.45 AM</Text>
        </View>

        <Text numberOfLines={2} style={styles.subTitle}>
          {chat.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
  },
  subTitle: {
    color: 'gray',
  },
});

export default ChatListItem;
