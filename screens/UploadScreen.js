import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { HOMESCREEN } from '../utils/Images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const UploadScreen = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');

  const selectImage = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleUpload = () => {
    ToastAndroid.show(
      'Post successfully uploaded',
      ToastAndroid.SHORT,
    )
    setTimeout(() => {
      navigation.navigate('Home');
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='always'
      >
      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Home')}>
        <Image source={HOMESCREEN.backButton} />
        </TouchableOpacity>
        <Text style={{alignSelf: "center", alignContent: "center", fontSize: 20, fontWeight: '500', fontFamily: 'Poppins-Regular'}}>Upload Post</Text>
        <View style={{width: 30}} />
      </View>
      <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Select Image</Text>
        )}
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          borderWidth: 1,
          borderRadius: 25,
          borderColor: "#BFBFBF",
          marginBottom: 15,
          backgroundColor:'#fff'
        }}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          itemStyle={{fontFamily: 'Poppins-Regular'}}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Health" value="health" />
          <Picker.Item label="Slogans" value="slogans" />
        </Picker>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Description"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.timerContainer}>
        <Text style={styles.timerLabel}>Set a Timer</Text>
        <View style={styles.timerInputs}>
          <TextInput
            style={styles.timerInput}
            keyboardType="numeric"
            maxLength={2}
            value={hours}
            onChangeText={setHours}
            placeholder="HH"
          />
          <Text style={styles.timerSeparator}>:</Text>
          <TextInput
            style={styles.timerInput}
            keyboardType="numeric"
            maxLength={2}
            value={minutes}
            onChangeText={setMinutes}
            placeholder="MM"
          />
          <Text style={styles.timerSeparator}>:</Text>
          <TextInput
            style={styles.timerInput}
            keyboardType="numeric"
            maxLength={2}
            value={seconds}
            onChangeText={setSeconds}
            placeholder="SS"
          />
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: "dashed",
    marginTop: 20,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#8E8D8D',
    fontWeight: '300',
    fontSize: 13,
    fontFamily: 'Poppins-Regular'
  },
  picker: {
    borderColor: '#BFBFBF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    color: "#090909",
    fontSize: 14,
    fontWeight: '300'
  },
  textInput: {
    height: 128,
    borderColor: '#BFBFBF',
    borderWidth: 1,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    textAlignVertical: 'top',
    color: "#090909",
    fontSize: 14,
    fontWeight: "300",
    backgroundColor: "#fff",
    fontFamily: 'Poppins-Regular'
  },
  timerContainer: {
    marginBottom: 20,
  },
  timerLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  timerInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    width: '30%',
    height: 50,
    fontFamily: 'Poppins-Regular'
  },
  timerSeparator: {
    fontSize: 24,
    alignSelf: 'center',
  },
  uploadButton: {
    marginHorizontal: 0,
    backgroundColor: '#151F6D',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-Regular'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default UploadScreen;
