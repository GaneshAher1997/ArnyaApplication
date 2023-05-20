import { View, Text } from "react-native";
import ImageHeader from "./ImageHeader";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DefaultOverlayContent = (props) => {
  return (
    <>
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#00000066",
        }}
      >
        <View style={{ margin: wp(3) }}>
          <ImageHeader />
        </View>
        {props.title ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <View
              style={{
                height: "38%",
                marginBottom: wp(6),
                marginLeft: wp(6),
                justifyContent: "center",
                // backgroundColor: "#00000066",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: wp(6),
                }}
              >
                {props.title}
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                  fontSize: wp(3.5),
                }}
              >
                {props.title}
              </Text>
            </View>
            {props.infoIcon ? (
              <View
                style={{
                  backgroundColor: "#00000066",
                  height: hp(4),
                  width: wp(8),
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 100,
                  marginRight: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="information-variant"
                  size={wp(5)}
                  color="white"
                />
              </View>
            ) : null}
          </View>
        ) : null}
      </View>
    </>
  );
};

export default DefaultOverlayContent;
