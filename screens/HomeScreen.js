import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, BackHandler, Dimensions, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
import { HOMESCREEN } from '../utils/Images';
import { Drawer } from 'react-native-drawer-layout';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { allposts, amazon, amazonMail, baseUrl, daysRemaing, getPostApi, logout, rewardHistory, searchAnything, tryLater } from '../utils/Strings';
import { httpGetMethod } from '../utils/apiHandler';
import moment from 'moment/moment';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { ALIGNMENT, Fonts } from '../utils/fonts';

const HomeScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [searchPost, setSearchPost] = useState()
  const [userDetails, setUserDetails] = useState()
  const screenWidth = Dimensions.get('screen').width

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true)
    getAllPosts()
    return () => backHandler.remove();
  },[navigation]);

  const getAllPosts = async () => {
    await AsyncStorage.getItem('token').then(async(res) => {
    let signInUrl = `${baseUrl}${getPostApi}`
    const getPosts = await httpGetMethod(signInUrl, res)
    if (getPosts && getPosts.status === 200) {
      const posts = getPosts.data.posts;
      setUserDetails(posts)
  } else {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Message',
      textBody: tryLater,
      button: 'close',
    })
  }
    }).catch((err) => console.log(err, 'storage err'))
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={HOMESCREEN.amazonPoster} />
      <Text style={styles.companyName}>{item.company.company_name}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <Text style={styles.remainingDays}>{calculateRemainingDays(item.end_date)} {daysRemaing}</Text>
    </View>
  )

  const calculateRemainingDays = (endDate) => {
    const now = moment();
    const end = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
    return end.diff(now, 'days');
  }

  const handleLogoutUser = () => {
    navigation.navigate('SignIn')
    ToastAndroid.show(
      'User logged out',
      ToastAndroid.SHORT,
    )
  }
  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return (
          <View style={{flex: 1, padding: 20}}>
            <Icon
              onPress={() => setOpen(false)}
              name="chevron-back-outline"
              style={styles.closeDrawer}
              size={24}
              color={'#151F6D'}>
            </Icon>
            <View style={styles.amazonProfile}>
              <Image source={HOMESCREEN.amazon} />
              <View style={styles.amazonProfileContainer}>
                <Text style={styles.amazonText}>
                  {amazon}
                </Text>
                <Text style={styles.profileEmail}>
                {amazonMail}
                </Text>
              </View>
            </View>

          <View style={styles.rewardHistory}>
              <Image style={styles.rewardHistoryImg} source={HOMESCREEN.rewardHistory} />
            <Text style={styles.rewardHistoryText}>{rewardHistory}</Text>
          </View>
          <View style={styles.logoutContainer}>
              <Image style={styles.rewardHistoryImg} source={HOMESCREEN.logout} />
            <Text onPress={handleLogoutUser} style={styles.logoutText}>{logout}</Text>
          </View>
          </View>
        )
      }}
    >
    <View style={styles.headerContainer}>
        <View style={styles.homeHeader}>
        <TouchableOpacity onPress={() => setOpen((prevOpen) => !prevOpen)}>
        <Image style={styles.headerImg} source={HOMESCREEN.drawer} />
        </TouchableOpacity>
        <View style={styles.notification}>
        <Image style={styles.headerImg} source={HOMESCREEN.notification} />
        <Image style={[styles.headerImg, {marginLeft: 10}]} source={HOMESCREEN.profilePicture} />
        </View>
      </View>
      <View style={styles.homeScreenContainer}>
        <View style={styles.searchContainer}>
      <Icon name={'search-outline'} style={styles.searchIcon} size={24} color={'#151F6D'}></Icon>
      <TextInput
      style={[styles.searchInput, {width: screenWidth - 100}]}
          placeholderTextColor={'#999999'}
          placeholder={searchAnything}
          value={searchPost}
          onChangeText={(text) => setSearchPost(text)}
        />
        </View>
        <View style={styles.allPostContainer}>
        <Image source={HOMESCREEN.posts} />
        <Text style={styles.allPostText}>{allposts}</Text>
        </View>
        <FlatList
        showsVerticalScrollIndicator={false}
          style={styles.postFlatlist}
          data={userDetails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() => (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upload')}>
        <Image source={HOMESCREEN.upload} />
      </TouchableOpacity>
    </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: ALIGNMENT.center,
    alignItems: ALIGNMENT.center,
  },
  content: {
    flex: 1,
    justifyContent: ALIGNMENT.center,
    alignItems: ALIGNMENT.center,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    position: ALIGNMENT.absolute,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    justifyContent: ALIGNMENT.center,
    alignItems: ALIGNMENT.center
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  itemContainer: {
    marginBottom: 16,
    margin: 13,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#D9D9D9"
  },
  companyName: {
    fontSize: 14,
    fontFamily: Fonts.poppins,
    fontWeight: '500',
    margin: 8,
    color: "#000000"
  },
  content: {
    fontSize: 16,
    margin: 8,
    fontSize: 14,
    fontFamily: Fonts.poppins,
    fontWeight: '300',
  },
  remainingDays: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 8,
    marginBottom: 8,
    fontFamily: Fonts.poppins,
    fontWeight: '500',
  },
  closeDrawer: {
    alignSelf: ALIGNMENT.flexEnd
  },
  amazonProfile: {
    display: ALIGNMENT.flex,
    flexDirection: ALIGNMENT.row,
    marginTop: 10
  },
  amazonProfileContainer:{
    alignSelf: ALIGNMENT.center,
    marginHorizontal: 10
  },
  amazonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: "500",
    fontFamily: Fonts.poppins
  },
  profileEmail: {
    color: '#7C7C7C',
    fontSize: 13,
    fontWeight: "300",
    fontFamily: Fonts.poppins
  },
  rewardHistory:{
    flexDirection: ALIGNMENT.row,
    marginTop: 35,
    paddingHorizontal: 25
  },
  rewardHistoryImg:{
    alignSelf: ALIGNMENT.center
  },
  rewardHistoryText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#757575',
    marginLeft: 12,
    fontFamily: Fonts.poppins
  },
  logoutContainer:{
    flexDirection: ALIGNMENT.row,
    marginTop: 30,
    paddingHorizontal: 25
  },
  logoutText:{
    fontSize: 20,
    fontWeight: '400',
    color: '#757575',
    marginLeft: 12,
    fontFamily: Fonts.poppins
  },
  headerContainer:{
    flex: 1,
    padding: 20
  },
  homeHeader: {
    display: ALIGNMENT.flex,
    flexDirection: ALIGNMENT.row,
    justifyContent: ALIGNMENT.spaceBetween
  },
  headerImg: {
    width: 45,
    height: 45
  },
  notification:{
    display: ALIGNMENT.flex,
    flexDirection: ALIGNMENT.row,
    alignSelf: ALIGNMENT.flexEnd
  },
  homeScreenContainer: {
    marginTop: 20
  },
  searchContainer: {
    display: ALIGNMENT.flex,
    flexDirection: ALIGNMENT.row,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#ccc'
  },
  searchIcon:{
    alignSelf: ALIGNMENT.center,
    marginLeft: 10
  },
  searchInput:{
    fontFamily: Fonts.poppins,
    color: "#ABABAB",
    fontWeight: "500",
    fontSize: 16
  },
  allPostContainer: {
    display: ALIGNMENT.flex,
    flexDirection: ALIGNMENT.row,
    padding: 10,
    paddingTop: 17
  },
  allPostText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 7,
    fontFamily: Fonts.poppins
  },
  postFlatlist: {
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#D0D0D0",
    marginBottom: 150
  }
});

export default HomeScreen;
