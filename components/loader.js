import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = () => {
    const animationProgress = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start();
  }, [])

    return (
        <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView
            source={require("./loader.json")}
            progress={animationProgress.current}
            
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
        zIndex: 1
    }
});

export default Loader;