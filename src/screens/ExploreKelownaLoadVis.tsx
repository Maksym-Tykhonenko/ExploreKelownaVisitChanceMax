import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { Text, Image, View, Dimensions, SafeAreaView, Animated, } from 'react-native';
import React, { useRef, useContext, useEffect } from 'react';
import ExploreKelownaLoading553Anim from '../components/ExploreKelownaLoading553Anim';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const explore_On_key_kelowna = 'kelowna_onb_key_88421';
const explore_user_unique_key_kelowna = 'kelowna_user_key_84021';

const ExploreKelownaLoadVisit: React.FC = () => {
  
  const navigation = useNavigation();

  const { updateUser } = useContext(UserContext);

  const exploreKelDimension = Dimensions.get('window');

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../assets/images/exploreKelownaOnBIma.png')}
        style={[
          { width: exploreKelDimension.width * 1.11, height: exploreKelDimension.height * 1.11,
            position: 'absolute', alignSelf: 'center', zIndex: 0 },
        ]}
        resizeMode="cover"
      />
      <Image
        source={require('../assets/images/exploreCards.png')}
        style={{
          marginTop: exploreKelDimension.height * 0.05,
          alignSelf: 'center',
          width: exploreKelDimension.width * 0.9,
          height: exploreKelDimension.height * 0.19,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          marginTop: exploreKelDimension.height * 0.016,
          textAlign: 'center',
          fontSize: exploreKelDimension.width * 0.19,
          color: '#fff',
          fontFamily: fonts.playFairDisplayRegular,
        }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        KELOWNA
      </Text>
      <View style={{ marginTop: exploreKelDimension.height * 0.05 }}>
        <ExploreKelownaLoading553Anim />
      </View>
    </SafeAreaView>
  );
};

export default ExploreKelownaLoadVisit;