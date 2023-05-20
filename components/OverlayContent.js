import { View } from "react-native";
import ImageHeader from "./ImageHeader";
import { Text } from "react-native";

const OverlayContent = (props) => {
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
          <ImageHeader title={props.title} />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.title ? (
              <View
                style={{
                  height: "38%",
                  width: "50%",
                  justifyContent: "center",
                  backgroundColor: "#00000066",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  {props.title}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </>
    );
  };

export default OverlayContent;