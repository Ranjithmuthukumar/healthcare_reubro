import React from 'react';
import { View, Text, Vibration, StyleSheet, Image, Dimensions } from 'react-native';
import { WELCOME } from '../utils/Images';
import { company, normalUser, welcomeBack } from '../utils/Strings';
import SwipeButton from "rn-swipe-button";
import { ALIGNMENT, Fonts } from '../utils/fonts';

const WelcomeScreen = ({ navigation }) => {
  const screenWidth = Dimensions.get('screen').width
    const CustomSwipeButton = ({ label, onSwipeSuccess }) => {
        return (
          <SwipeButton
            onSwipeSuccess={onSwipeSuccess}
            swipeSuccessThreshold={70}
            height={58}
            width={screenWidth - 40}
            title={label}
            thumbIconImageSource={WELCOME.rightArrow}
            titleStyles={styles.swipetitle}
            railFillBackgroundColor={'transparent'}
            railFillBorderColor={'#fff'}
            thumbIconBackgroundColor={'#151F6D'}
            thumbIconStyles={styles.thumbStyle}
            railBackgroundColor={'#fff'}
            railBorderColor={'#151F6D'}
            shouldResetAfterSuccess={true}
            disableResetOnTap
          />
        );
      };
    const handleSwipeSuccess = (label) => {
        navigation.navigate('SignIn')
        Vibration.vibrate(70);
    }
  return (
    <View style={styles.container}>
      <Image source={WELCOME.welcome} style={[styles.welcomeBg, {height: '60%'}]}/>
      <Text style={styles.welcomeBackText}>{welcomeBack}</Text>
      <View style={styles.buttonContainer}>
        <CustomSwipeButton label={company} onSwipeSuccess={() => handleSwipeSuccess()} />
        <CustomSwipeButton label={normalUser} onSwipeSuccess={() => handleSwipeSuccess()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  welcomeBg: {
    alignSelf: ALIGNMENT.flexEnd,
    marginTop: 27,
  },
  welcomeBackText: {
    color: '#151F6D',
    fontWeight: '700',
    fontSize: 23,
    alignSelf: ALIGNMENT.center,
    marginTop: 70,
    fontFamily: Fonts.NotoSans
  },
    swipetitle: {
      fontFamily: Fonts.Roboto,
      color: '#151F6D',
      fontSize: 15,
      fontWeight: "400"
    },
    thumbStyle: {
      borderWidth: 1,
    },
    buttonContainer: {
      flex: 1,
      justifyContent: ALIGNMENT.flexEnd,
      alignItems: ALIGNMENT.center,
      paddingBottom: 30,
    },
  })

export default WelcomeScreen;
