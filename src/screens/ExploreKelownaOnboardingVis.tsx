import { View, Dimensions, TouchableOpacity, StyleSheet, SafeAreaView, Image, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { exploreOnboardingData } from '../exploreOnboarding';

import { fonts } from '../assets/fonts';

import React, { useState } from 'react';

const ExploreKelownaOnboardingVis: React.FC = () => {
  const [exploreThisSlKelowna, setExploreThisSlKelowna] = useState(0);


  const navigation = useNavigation();

  const kelownaDimension = Dimensions.get('window');

  return (
    <View style={{ flex: 1, width: kelownaDimension.width, height: kelownaDimension.height }}>
      <Image
        resizeMode="cover"
        source={require('../assets/images/exploreKelownaOnBIma.png')}
        style={{
          position: 'absolute',
          height: kelownaDimension.height,
          width: '111%',
          alignSelf: 'center',
          zIndex: 0,
        }}
      />
      <SafeAreaView style={{ flex: 1, }}>
        <Image
          resizeMode='contain'

          source={exploreOnboardingData[exploreThisSlKelowna].exploreImage}

          style={{
            zIndex: 10,
            alignSelf: 'center',
            height: kelownaDimension.height * 0.3,
            width: kelownaDimension.height * 0.3,
          }}
        />

        <View style={{
          borderRadius: kelownaDimension.width * 0.0550432,
          backgroundColor: '#1a1c20d4',
          width: kelownaDimension.width * 0.90643,
          borderColor: '#FFD447',
          marginVertical: kelownaDimension.height * 0.0250432,
          padding: kelownaDimension.height * 0.0250432,
          borderWidth: kelownaDimension.width * 0.00450432,
          flex: 1,
          alignSelf: 'center',
        }}>
          <Text
            style={{
              fontSize: kelownaDimension.width * 0.064,
              color: '#FFD447',
              textAlign: 'center',
              fontFamily: fonts.montserratBold
            }}>
            {exploreOnboardingData[exploreThisSlKelowna].exploreTitle}
          </Text>

          <Text
            style={{
              fontFamily: fonts.montserratRegular,
              fontSize: kelownaDimension.width * 0.05,
              marginTop: kelownaDimension.height * 0.05,
              textAlign: 'center',
              color: '#fff',
            }}>
            {exploreOnboardingData[exploreThisSlKelowna].exploreDescription}
          </Text>
        </View>

        <TouchableOpacity style={{
          borderColor: '#EFC949',
          justifyContent: 'center',
          height: kelownaDimension.height * 0.0910543,
          borderWidth: kelownaDimension.width * 0.00450432,
          borderRadius: kelownaDimension.width * 0.0550432,
          backgroundColor: '#0A0262',
          alignItems: 'center',
          width: kelownaDimension.width * 0.5072384,
          alignSelf: 'center',
        }} onPress={() => {
          if (exploreThisSlKelowna < exploreOnboardingData.length - 1) {
            setExploreThisSlKelowna(exploreThisSlKelowna + 1);
          } else {
            navigation.replace && navigation.replace('ExploreKelownaHomeVis');
          }
        }} activeOpacity={0.80534}>
          <Text
            style={{
              color: '#ffffff',
              fontFamily: fonts.montserratBold,
              fontSize: kelownaDimension.width * 0.07,
            }}>
            NEXT
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ExploreKelownaOnboardingVis;