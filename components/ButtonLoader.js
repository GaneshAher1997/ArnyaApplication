import React from 'react'

import { Button, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

// Created By :- Nilesh kumar
// Date :- 13-02-2023


const ButtonLoader = ({
    loaderColor,
    buttonColor,
    buttonWidth,
    buttonHeight,
    loaderSize,
}) => {
    return (
        // <Button style={{ ...style.container}} mt="2" colorScheme={buttonColor} w={buttonWidth} h={buttonHeight}>
            <ActivityIndicator size={loaderSize} color={loaderColor} />
        // </Button>
    )
}

export default ButtonLoader

const style = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    lottie: {
        width: 100,
        height: 100
      }
})

/**
 * THE LOADER COMPONENT PROPS DETAILS: 
 * 
 * loaderColor: it is the color of circle which can be :- emerald.500,warning.500,indigo.500,cyan.500
 * 
 * loaderSize : loaderCircleSize in number
 *              type: String
 *              value: sm OR lg
 *              default value: sm.
 * 
 * flexDirection : DirectionOfLoderContainer which contain loader circle and loader text message
 *                 type :string
 *                 value : row OR column 
 *                 here default : row
 * 
 * Example: 
*       <ButtonLoader
          loaderColor="primary.500"
          loaderSize="lg"
         flexDirection="column"
        /> 
 * 
 */
