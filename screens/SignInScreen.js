import React, {useState, useRef} from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Vibration, ToastAndroid } from 'react-native';
import { WELCOME } from '../utils/Images';
import { baseUrl, loginApiUrl, loginInfo, okButton, signinProcess, welcomeSignIn } from '../utils/Strings';
import { HttpPostMethodWithBody } from '../utils/apiHandler';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import RBSheet from 'react-native-raw-bottom-sheet';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const SignInScreen = ({ navigation }) => {
    const [isEmail, setIsEmail] = useState(true);
    const [mobileNumber, setMobileNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const refRBSheet = useRef();

  const handleChangeText = (text) => {
    if (isEmail) {
      setEmail(text);
    } else {
      setMobileNumber(text);
    }
    setInputValue(text);
  }

  const toggleInputType = () => {
    setIsEmail(!isEmail);
    setInputValue('');
    setEmail('');
    setMobileNumber('');
  };

  const handleSigin = async () => {
    setSpinner(true)
    Vibration.vibrate(70);
    try {
  let signInUrl = `${baseUrl}${loginApiUrl}`
  const bodyParams = {
    email: isEmail ? email : mobileNumber,
    password: password
  };
  const data = await HttpPostMethodWithBody(signInUrl, bodyParams)
  await AsyncStorage.setItem('token', data.success.token)
  if(data && data.success && data.success.token){
    setSpinner(false)
    setInputValue('')
    setPassword('')
    ToastAndroid.show(
      'User has successfully logged in',
      ToastAndroid.SHORT,
    );
    navigation.navigate('Home')
  } else{
    setSpinner(false)
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Message',
      textBody: data.error,
      button: 'close',
    })
  }
  } catch (error) {
    setSpinner(false)
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Message',
        textBody: 'You have entered invalid credentials.',
        button: 'close',
      })
      }
    }
    return (
      <AlertNotificationRoot>
      <Spinner
        visible={spinner}
        color='#151F6D'
      />
      <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <Image source={WELCOME.signIn} style={styles.signInBg} />
        <View style={styles.signInContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeBack}>{welcomeSignIn}</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Image source={WELCOME.tooltip} style={styles.tooltipImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.usingMobile}>{isEmail ? 'Sign in using E-mail' : 'Sign in using phone number'}</Text>
          <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Text style={styles.countryCodeTxt}>{isEmail ? '@' : '1+'}</Text>
              </View>
            <TextInput
          style={styles.input}
          placeholderTextColor={'#999999'}
          placeholder={isEmail ? 'Enter your email address' : 'Enter phone number'}
          keyboardType={isEmail ? 'email-address' : 'phone-pad'}
          value={inputValue}
          maxLength={isEmail ? 40 : 10}
          onChangeText={(text) => handleChangeText(text)}
        />
          </View>
          
          <View style={[styles.inputContainer, {marginBottom: 0}]}>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#999999'}
              style={[styles.input, { paddingRight: 10 }]}
              placeholder="Enter your password"
              secureTextEntry={showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.visibleIcon}>
            <Icon name={showPassword ? "eye-outline" : 'eye-off-outline'} style={{alignSelf: "center"}} size={24} color="#FF9E1B"></Icon>
              </TouchableOpacity>

          </View>
          <Text style={styles.toggleInput} onPress={toggleInputType}>or sign in using {isEmail ? 'phone' : 'email'}</Text>
          <View style={styles.signinButton} >
            <Text style={styles.signInTxt}>Sign In</Text>
            <TouchableOpacity style={styles.button} onPress={handleSigin}>
              <Image source={WELCOME.rightArrow} />
          </TouchableOpacity>
          </View>
        </View>
        </KeyboardAwareScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={210}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          container: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalHeader} >
        {signinProcess}
        </Text>
        <Text style={styles.modalContent} >
        {loginInfo}
        </Text>
        <TouchableOpacity
        activeOpacity={0.5}
          onPress={() => refRBSheet.current.close()}
          style={styles.okButtonContainer} >
          <Text style={styles.okText}>{okButton}</Text>
        </TouchableOpacity>
        </View>
      </RBSheet>
      </AlertNotificationRoot>
    );
  };
  
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 15,
      borderWidth: 0.7,
      borderRadius: 100,
    },
    input: {
      flex: 1,
      padding: 15,
      fontSize: 16,
      height: 58,
      fontFamily: "NotoSans-Regular"
    },
    iconContainer: {
      left: 7,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "#ccc",
      height: 48,
      width: 48,
      justifyContent: "center"
    },
    countryCode: {
      fontSize: 16,
      color: '#FFA500',
    },
    icon: {
      width: 24,
      height: 24,
    },
    button: {
      width: 59,
      height: 59,
      backgroundColor: '#151F6D',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      marginRight: 10,
    },
    buttonIcon: {
      width: 16,
      height: 16,
      tintColor: '#fff',
    },
    signInBg: {
      alignSelf: "center",
      marginTop: 27
    },
    signInContainer: {
      paddingHorizontal: 30,
      paddingTop: 15
    },
    welcomeContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    welcomeBack: {
      color: '#151F6D',
      fontWeight: '700',
      fontSize: 23,
      fontFamily: "NotoSans-Regular"
    },
    tooltipImg: {
      alignSelf: "center"
    },
    usingMobile: {
      color: '#151F6D',
      fontWeight: '400',
      fontSize: 16,
      marginVertical: 7,
      fontFamily: "Roboto-Regular"
    },
    countryCodeTxt: {
      fontSize: 16,
      color: '#FF9E1B',
      fontWeight: '600',
      alignSelf: "center"
    },
    visibleIcon: {
      borderWidth: 1,
      borderRadius: 50,
      borderColor: "#ccc",
      height: 48,
      width: 48,
      justifyContent: "center",
      right: 7
    },
    toggleInput: {
      color: "#6C6C6C",
      alignSelf: "flex-end",
      textDecorationLine: "underline",
      fontFamily: 'Roboto-Regular'
    },
    signinButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30
    },
    signInTxt: {
      color: '#151F6D',
      fontSize: 20,
      fontWeight: "700",
      alignSelf: "center",
      fontFamily: 'Roboto-Regular'
    },
    modalContainer:{
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20
    },
    modalHeader: {
      marginTop: 25,
      color: '#151F6D',
      fontWeight: "600",
      fontSize: 14,
      fontFamily: 'Roboto-Regular'
    },
    modalContent:{
      marginTop: 20,
      color: "#6C6C6C",
      fontWeight: "400",
      fontSize: 14,
      fontFamily: "SourceSansPro-Regular"
    },
    okButtonContainer: {
      backgroundColor: '#151F6D',
      width: 100,
      height: 35,
      borderRadius: 20,
      alignItems: "center",
      alignSelf: "center",
      marginTop: 20,
      justifyContent: "center"
    },
    okText: {
      color: '#fff',
      fontFamily: 'Roboto-Regular'
    }
  });
  
  export default SignInScreen;
