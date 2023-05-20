import { FlatList } from 'react-native';
import chats from '../../../assets/data/chats.json'
import ChatListItem from '../chatListItem/index';
import Header from '../chatListItem/Header';
import FloatingButton from '../../../components/FloatingButton'
const ChatsScreen = () => {
  return (
    <>
    <Header title="Chats" name = "search"/>
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: 'white' }}
    />
    <FloatingButton icon={"plus-circle-outline"}/>
    </>
  );
};

export default ChatsScreen;
