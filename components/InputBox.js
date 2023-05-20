//Update Native Base to Native Paper by - Anirban Pan
//Date - 10-03-2023
//Docs - follow the link "https://callstack.github.io/react-native-paper/4.0/text-input.html#error"

import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";

const InputBox = ({
  mode,
  inputLabel,
  placeholder,
  onChange,
  value,
  edit,
  rightElement,
  multiline,
  leftElement,
  numberOfLines,
  style,
  isError,
  errors,
  onPress,
  disabled,
  DropDown,
  onFocus,
  menuFocus,
  pointerEvents,
  autoFocus,
  refs,
  onSubmitEditing,
  maxLength,
  placeholderTextColor,


  ...props
}) => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  // const [keyboardStatus, setKeyboardStatus] = useState("");

  const handleIconDropDown = () => {
    setDropDown(!dropDown);
    DropDown(dropDown);
  };



  let propsCustom = {
    mode: mode === undefined || mode === "" ? "outlined" : mode,
    inputLabel:
      inputLabel === undefined || inputLabel === "" ? "Label" : inputLabel,
    placeholder:
      placeholder === undefined || placeholder === ""
        ? "Placeholder"
        : placeholder,
    onChange: onChange === undefined ? () => {} : onChange,
    multiline: multiline === undefined || multiline === "" ? false : multiline,
    numberOfLines:
      numberOfLines === undefined || numberOfLines === "" ? 5 : numberOfLines,
    style: style === undefined || style === "" ? styles.inputContainer : style,
  };

  return (
    <>
      <TouchableOpacity onPress={rightElement ? handleIconDropDown : onFocus}>
        <TextInput
        
          autoFocus={autoFocus}
          editable={edit ?? true}
          maxLength={maxLength}
          ref={refs}
          onSubmitEditing={onSubmitEditing}
          mode={propsCustom.mode}
          label={propsCustom.inputLabel}
          secureTextEntry={passwordShow}
          style={propsCustom.style}
          onFocus={rightElement ? handleIconDropDown : onFocus}
          pointerEvents={pointerEvents}
          placeholder={propsCustom.placeholder}
          onChangeText={propsCustom.onChange}
          multiline={propsCustom.multiline}
          keyboardType={props.keyboardType}
          value={value}
          placeholderTextColor={placeholderTextColor}
          numberOfLines={propsCustom.numberOfLines}
          disabled={disabled}
          outlineColor={isError ? "red" : null}
          activeOutlineColor={isError ? "red" : null}
          showSoftInputOnFocus={rightElement ? false : true}
          caretHidden={rightElement ? true : false}
          right={
            inputLabel == "Password" ? (
              <TextInput.Icon
                icon={(props) => (
                  <Pressable onPress={() => setPasswordShow(!passwordShow)}>
                    <MaterialCommunityIcons
                      {...props}
                      name={passwordShow ? "eye-off" : "eye"}
                      size={25}
                      style={{ color: "gray" }}
                    />
                  </Pressable>
                )}
              />
            ) : props.renderRightIcon ? (
              <TextInput.Icon
                // icon={rightElement}
                icon={props.right}
                // onPress={() => handleIconDropDown()}
                // onSubmitEditing={onSubmitEditing}
              />
            ) : rightElement ? (
              <TextInput.Icon
                icon={rightElement}
                // onPress={() => dropDown()}
              />
            ) : null
          }
          // left={
          //   inputLabel == "Password" ? (
          //     <TextInput.Icon
          //       icon={(props) => (
          //         <MaterialCommunityIcons
          //           {...props}
          //           name={"key"}
          //           size={25}
          //           style={{ color: "gray" }}
          //         />
          //       )}
          //     />
          //   ) : (
          //     <>{leftElement}</>
          //   )
          // }
        />
      </TouchableOpacity>
      {props.helpText && !isError ? (
        <Text
          style={{
            marginLeft: 5,
            marginTop: -6,
            fontSize: 12,
          
          }}
        >
          {props.helpText}
        </Text>
      ) : null}
      {isError ? (
        <Text
          style={{ color: "red", marginLeft: 5, marginTop: -6, fontSize: 12, }}
        >
          {errors}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    zIndex: 0,
    marginVertical: 8,
  },
  // label: {
  //   marginTop: 20,
  //   fontSize: 5,
  //   fontWeight: "200",
  // },
  // inputFlieds: {
  //   fontSize: 12,
  //   color: "black",
  // },
});

export default InputBox;
