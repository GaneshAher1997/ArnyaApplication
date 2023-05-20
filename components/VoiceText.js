import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Modal, Button, TouchableWithoutFeedback } from 'react-native';
import Voice from '@react-native-voice/voice';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";




const VoiceText = ({
  icon,
  containerstyle,
  resultValue = () => { }

}) => {

  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isSwitchOn = useSelector((state) => state.darkMode.darkMode);
  const customProps = {
    icon: icon === undefined ? <Ionicons name="mic-outline" size={wp(6)}  style={{color : isSwitchOn ? "white" : "black"}}/> : icon,
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [])

  const onSpeechStartHandler = (e) => {
    console.log("start handler==>>>", e)
  }
  const onSpeechEndHandler = (e) => {
    setLoading(false)
    console.log("stop handler", e)
  }

  const onSpeechResultsHandler = (e) => {
    let text = e.value[0]
    setResult(text)
    resultValue(text);
    console.log("speech result handler", e)
  }

  const startRecording = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us')
    } catch (error) {
      console.log("error raised", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
    } catch (error) {
      console.log("error raised", error)
    }
  }
  

  return (
    <>
      <TouchableOpacity
        style={[styles.buttonStyle]}
        onPress={() => { setShowModal(true); startRecording() }}
      // onPressOut={stopRecording}
      >
        {customProps.icon}
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        onPress={() => {
          setShowModal(false);
          // stopRecording()
        }}
        onRequestClose={() => {
          setShowModal();
          stopRecording()
        }}

      >
        <View style={styles.modalMaster}>
          <TouchableOpacity
            onPress={() => { setShowModal(false); stopRecording() }}
            style={styles.modalOverlay}
          >
          </TouchableOpacity>
          <View style={styles.modalview}>
            <View style={{ alignSelf: 'center', }} >
              <Text style={styles.textStyle}>Listening</Text>
            </View>
            <View>
              <Image source={require('../assets/sound.gif')} style={styles.imagestyle} resizeMode="contain" />
            </View>
            <View style={styles.crossbutton}>
              <TouchableOpacity
                onPress={() => { setShowModal(false); stopRecording() }}
                style={{

                }}
              >
                <Text style={{ fontSize: 18, }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({

  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  modalMaster: {
    flex: 1,

  },

  modalOverlay: {
    flex: 0.7,

  },

  modalview: {
    width: "100%",
    backgroundColor: "white",
    // position: "relative",
    flex: 0.3,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    transform: [
      { scaleX: 2 }
    ],

  },

  textStyle: {
    fontSize: 18,
    color: "red",
    alignSelf: "center",
    marginTop: "12%",
    transform: [
      { scaleX: 0.5 }
    ],

  },

  imagestyle: {
    width: "29%",
    height: "50%",
    alignSelf: "center",
    marginTop: "9%",
    transform: [
      { scaleX: 0.5 }
    ],
  },

  crossbutton: {
    position: "absolute",
    top: -25,
    left: 102,
    zIndex: 999999999
  }

});

export default VoiceText;
