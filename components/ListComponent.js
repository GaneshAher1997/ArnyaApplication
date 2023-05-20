import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const ListComponent = ({
  item,
  onPress,
  label,
  children,
  onPressDelete,
  onPressEdit,
}) => {
  const {
    id,
    type_name,
    client_id,
    created_at,
    created_by,
    status,
    modified_at,
  } = item.item;

  // const [swipe, setSwipe] = useState(false);

  // const leftSwipe = () => {
  //     return (
  //         <View style={styles.leftSwipesection}>
  //             <TouchableOpacity style={styles.leftButtonSection} onPress={()=>onPressEdit(item.item)}>
  //                 <Image style={styles.swipeIcon} source={require('../assets/edit.png')} />
  //             </TouchableOpacity>
  //         </View>
  //     )
  // }

  // const rightSwipe = () => {
  //     return (
  //         <View style={styles.rightSwipesection}>
  //             <TouchableOpacity style={styles.rightButtonSection} onPress={()=>onPressDelete(item.item)} >
  //                 <Image style={styles.swipeIcon} source={require('../assets/trash.png')} />
  //             </TouchableOpacity>
  //         </View>
  //     )
  // }
  // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", item);
  return (
    // <Swipeable
    //     onActivated={() => setSwipe(!swipe)}
    //     renderLeftActions={leftSwipe}
    //     renderRightActions={rightSwipe}
    //     containerStyle={{overflow:"hidden"}}
    // >
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          Platform.OS != "ios" ? styles.shadow : null,
          { borderRadius: 8 },
        ]}
      >
        {children ? (
          children
        ) : (
          <View>
            <View style={styles.header}>
              <View style={styles.innerHeader}>
                <Text>{`${label.id}`}</Text>
                <Text style={styles.idNumber}>{`#${id}`}</Text>
              </View>
              <Text style={styles.idNumber}>{status}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{`${label.eduType}:`}</Text>
              <Text style={styles.idNumber}>{type_name}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{`${label.clientId}:`}</Text>
              <Text style={styles.idNumber}>{client_id}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{`${label.createdBy}:`}</Text>
              <Text style={styles.idNumber}>{created_by}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{`${label.createdAt}:`}</Text>
              <Text style={styles.idNumber}>{created_at}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text>{`${label.modifiedAt}:`}</Text>
              <Text style={styles.idNumber}>{modified_at}</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
    // </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    marginVertical: 5,
    // borderRadius:8,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  idNumber: {
    marginLeft: 5,
    fontWeight: "500",
  },
  shadow: {
    shadowOffset: {
      height: 10,
      width: 5,
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 1,
    // backgroundColor:'rgba(0,0,0,0.2)'
  },
  leftSwipesection: {
    backgroundColor: "rgba(0,255,0,0.5)",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  leftButtonSection: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  swipeIcon: {
    height: 30,
    width: 30,
    tintColor: "#fff",
  },
  rightSwipesection: {
    backgroundColor: "rgba(255,0,0,0.5)",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  rightButtonSection: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListComponent;
