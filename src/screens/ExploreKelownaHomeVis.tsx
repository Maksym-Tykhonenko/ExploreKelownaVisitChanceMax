const kelownaSimpleWidth = 0.921034242;
import KelownaHeader from '../components/KelownaHeader';
import KelownaLocationsMP from './KelownaLocationsMP';
import LinearGradient from 'react-native-linear-gradient';
import KelownaBasicLoc from '../components/KelownaBasicLoc';
type kelownaPagesWhichCanBe = 'Kelowna Home' | 'Kelowna Locations' | 'Kelowna Saved' | 'Kelowna Test';
import KelownaQuizMP from './KelownaQuizMP';
import kelownaBottomsAll from '../components/kelownaBottomsAll';
import React, { useEffect, useRef, useState } from 'react';
import { kelownaLocations } from '../assets/kelownaLocations';



import {
  Animated,
  TouchableOpacity,
  Dimensions,
  View,
  ImageBackground,
  Image,
  Platform,
  Share,
  SafeAreaView,
  Pressable,
  TouchableWithoutFeedback,
  Modal,
  Text,
} from 'react-native';




import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { fonts } from '../assets/fonts';
import AdditionalCodeBase from '../components/AdditionalCodeBase';



type KelownaPlace = {
  kelownaName: string;
  kelownaCoordinates: {
    latitude: number;
    longitude: number;
  };
  kelownaDescription: string;
  kelownaImage: any;
  kelownaLocatedAt: string;
  kelownaTop: number;
  kelownaRight: number;
  kelownaHistory: string;
};

const kelownaSettingsModalBtns = [
  {
    id: 1,
    iconTrue: require('../assets/icons/kelownaSettingsIcons/kelownaVibroIsTrue.png'),
    iconFalse: require('../assets/icons/kelownaSettingsIcons/kelownaVibroIsFalse.png'),
    key: 'kelownaVibration',
    onPress: 'handleToggleVibration',
    getActive: (vibro: boolean, sound: boolean) => vibro,
  },
  {
    id: 2,
    iconTrue: require('../assets/icons/kelownaSettingsIcons/kelownaSoundIsTrue.png'),
    iconFalse: require('../assets/icons/kelownaSettingsIcons/kelownaSoundIsFalse.png'),
    key: 'kelownaSound',
    onPress: 'handleToggleSound',
    getActive: (vibro: boolean, sound: boolean) => sound,
  },
  {
    id: 3,
    iconTrue: require('../assets/icons/kelownaSettingsIcons/kelownaClean.png'),
    iconFalse: require('../assets/icons/kelownaSettingsIcons/kelownaClean.png'),
    key: 'kelownaClean',
    onPress: 'handleKelownaClean',
    getActive: () => true,
  },
];

// Додаємо глобальну змінну для музики
let kelownaBgMusic: Sound | null = null;

const ExploreKelownaHomeVis: React.FC = () => {

  
  
  
  const [isKelownaPlaceCard, setIsKelownaPlaceCard] = useState(false);
  const [pressedKelownaPlace, setPressedKelownaPlace] = useState<KelownaPlace | null>(null);
  
  const [isKelownaReadNow, setIsKelownaReadNow] = useState(false);
  const [kelownaPageToWatch, setKelownaPageToWatch] = useState<kelownaPagesWhichCanBe>('Kelowna Home');
  const [kelownaDimension, setDimensions] = useState(Dimensions.get('window'));
  const [kelownaSettingsVisible, setKelownaSettingsVisible] = useState(false);
  const [kelownaVibration, setKelownaVibration] = useState(true);
  const [kelownaSound, setKelownaSound] = useState(true);
  const [isKelownaSoundLoaded, setIsKelownaSoundLoaded] = useState(false);
  const [kelownaCleanNotif, setKelownaCleanNotif] = useState(false);
  
  const [isKelownaPreviewWas, setIsKelownaPreviewWas] = useState(false);
  const [savedNames, setSavedNames] = useState<string[]>([]);
  const kelownaShakeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsKelownaReadNow(false);

    if (kelownaPageToWatch === 'Kelowna Saved') {
      AsyncStorage.getItem('kelowna_saved_places').then(data => {
        if (data) {
          try {
            setSavedNames(JSON.parse(data));
          } catch {
            setSavedNames([]);
          }
        } else {
          setSavedNames([]);
        }
      });
    }
  }, [kelownaPageToWatch, setIsKelownaReadNow]);

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const vibroValue = await AsyncStorage.getItem('kelownaVibration');
        const soundValue = await AsyncStorage.getItem('kelownaSound');

        if (vibroValue !== null) setKelownaVibration(vibroValue === 'true');
        if (soundValue !== null) setKelownaSound(soundValue === 'true');

        setIsKelownaSoundLoaded(true);
      } catch (error) {
        setIsKelownaSoundLoaded(true);
      }
    };
    loadSettings();
  }, []);

  // Функція для запуску/зупинки музики
  const handleKelownaBgMusic = React.useCallback(() => {
    if (!isKelownaSoundLoaded) return; // Чекаємо завантаження налаштувань

    if (kelownaSound) {
      if (!kelownaBgMusic) {
        kelownaBgMusic = new Sound('exploreKelownaBgSound.mp3', Sound.MAIN_BUNDLE, (error) => {
          if (!error) {
            kelownaBgMusic?.setNumberOfLoops(-1);
            kelownaBgMusic?.play();
          }
        });
      } else {
        kelownaBgMusic.setNumberOfLoops(-1);
        kelownaBgMusic.play();
      }
    } else {
      kelownaBgMusic?.stop();
    }
  }, [kelownaSound, isKelownaSoundLoaded]);

  React.useEffect(() => {
    if (isKelownaSoundLoaded) {
      handleKelownaBgMusic();
    }
    return () => {
      kelownaBgMusic?.stop();
    };
  }, [kelownaSound, isKelownaSoundLoaded, handleKelownaBgMusic]);

  const handleToggleVibration = async () => {
    const newValue = !kelownaVibration;
    setKelownaVibration(newValue);
    await AsyncStorage.setItem('kelownaVibration', newValue.toString());
  };

  const handleToggleSound = async () => {
    const newValue = !kelownaSound;
    setKelownaSound(newValue);
    await AsyncStorage.setItem('kelownaSound', newValue.toString());
  };

  if (kelownaPageToWatch === 'AdditionalPage') {
    return (
      <AdditionalCodeBase />
    )
  }

  const handleKelownaClean = async () => {
    const hapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    };

    // Струс модального вікна
    Animated.sequence([
      Animated.timing(kelownaShakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(kelownaShakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(kelownaShakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
      Animated.timing(kelownaShakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
      Animated.timing(kelownaShakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start(() => {
      // Вібрація під час струсу, якщо увімкнено kelownaVibration
      if (kelownaVibration) {
        ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
      }

      // Після струсу закриваємо модальне вікно
      setKelownaSettingsVisible(false);

      // Через невелику затримку показуємо повідомлення
      setTimeout(() => {
        setKelownaCleanNotif(true);
        setTimeout(() => setKelownaCleanNotif(false), 3000);
      }, 200);
    });

    // Очищаємо дані
    await AsyncStorage.clear();
    setKelownaVibration(true);
    setKelownaSound(true);
    setSavedNames([]);
  };

  let kelownaRenderedPart: React.ReactNode = null;

  function showExploreContentOfKelowna() {

    return (
      
      <TouchableWithoutFeedback onPress={() => {
        setIsKelownaReadNow(false);
        setIsKelownaPlaceCard(false);
      }}>
        <SafeAreaView style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : kelownaDimension.height * 0.03,
          width: kelownaDimension.width,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
          <Image source={require('../assets/images/exploreKelownaHomeMap.png')}
            style={{
              zIndex: 0,
              alignSelf: 'center',
              width: kelownaDimension.width,
              height: kelownaDimension.height,
              position: 'absolute',
            }}
            resizeMode='cover'
          />

          <KelownaHeader
            setKelownaSettingsVisible={setKelownaSettingsVisible}
            kelownaPageToWatch={kelownaPageToWatch}
            kelownaSimpleWidth={kelownaSimpleWidth}
            kelownaDimension={kelownaDimension}
          />

          {isKelownaPlaceCard && (
            <KelownaBasicLoc
              savedNames={savedNames}
              kelownaDimension={kelownaDimension}
              setSavedNames={setSavedNames}
              pressedKelownaPlace={pressedKelownaPlace}
              isKelownaReadNow={isKelownaReadNow}
              setIsKelownaReadNow={setIsKelownaReadNow}
              setKelownaPageToWatch={setKelownaPageToWatch}
            />
          )}

          {kelownaLocations.map((location, index) => (
            <Pressable key={index} style={{
              right: location.kelownaRight,
              top: location.kelownaTop,
              zIndex: 1,
              position: 'absolute',
            }} onPress={() => {

              setPressedKelownaPlace(location);

              setIsKelownaPlaceCard(true);

            }}>
              <Image
                source={require('../assets/images/kelownaPin.png')}
                style={{
                  alignSelf: 'center',

                  width: kelownaDimension.height * 0.08,

                  height: kelownaDimension.height * 0.08,
                }}
                resizeMode='contain'
              />
            </Pressable>
          ))}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }

  if (kelownaPageToWatch === 'Kelowna Home') {
    kelownaRenderedPart = showExploreContentOfKelowna();
  } else if (kelownaPageToWatch === 'Kelowna Test') {
    kelownaRenderedPart = <KelownaQuizMP />;
  } else if (
    kelownaPageToWatch === 'Kelowna Locations' ||
    kelownaPageToWatch === 'Kelowna Saved' ||
    kelownaPageToWatch === 'Kelowna Locations'
  ) {
    kelownaRenderedPart = (
      <KelownaLocationsMP
        isKelownaPreviewWas={isKelownaPreviewWas}
        setIsKelownaPreviewWas={setIsKelownaPreviewWas}
        kelownaPageToWatch={kelownaPageToWatch}
        isKelownaReadNow={isKelownaReadNow}
        savedNames={savedNames}
        setIsKelownaReadNow={setIsKelownaReadNow}
        setSavedNames={setSavedNames}
        setKelownaPageToWatch={setKelownaPageToWatch}
      />
    );
  }

  return (
    <View style={{
      height: kelownaDimension.height,
      width: '100%',
      backgroundColor: 'black',
      flex: 1,
    }}>




      <ImageBackground
        style={{
          left: 0,
          flex: 1,
          width: kelownaDimension.width,
          bottom: 0,
          height: kelownaDimension.height,
          top: 0,
          position: 'absolute',
          right: 0,
        }}
        source={require('../assets/images/exploreKelownaOnBIma.png')}
        resizeMode="cover"
      />




      {kelownaRenderedPart}





      <Modal visible={kelownaSettingsVisible} transparent={true} animationType='fade'>
        <TouchableWithoutFeedback onPress={() => setKelownaSettingsVisible(false)}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            flex: 1,
          }}>
            <Animated.View style={{
              transform: [{ translateX: kelownaShakeAnim }],
              paddingVertical: kelownaDimension.height * 0.0160123,
              alignSelf: 'center',
              alignItems: 'center',
              borderWidth: kelownaDimension.width * 0.00450432,
              borderColor: '#EFC949',
              zIndex: 100,
              borderRadius: kelownaDimension.width * 0.0550432,
              width: kelownaDimension.width * 0.951034242,
              marginTop: kelownaDimension.height * 0.03,
              paddingHorizontal: kelownaDimension.width * 0.040532,
              backgroundColor: '#1a1c20d4',
            }}>
              <View style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
                <View
                  style={{
                    height: kelownaDimension.height * 0.04443298,
                    width: kelownaDimension.height * 0.04443298,
                  }}
                />

                <Text style={{
                  textAlign: 'center',
                  color: '#EFC949',

                  fontSize: kelownaDimension.width * 0.06805234,

                  fontFamily: fonts.montserratBold,
                }}>
                  Settings
                </Text>

                <TouchableOpacity
                  style={{}}
                  onPress={() => setKelownaSettingsVisible(false)}
                >
                  <Image
                    source={require('../assets/icons/kelownaXMarkIco.png')}
                    style={{
                      height: kelownaDimension.height * 0.04443298,
                      width: kelownaDimension.height * 0.04443298,
                    }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>

              <Animated.View
                style={{
                  transform: [{ translateX: kelownaShakeAnim }],
                  justifyContent: 'space-between',
                  marginVertical: kelownaDimension.height * 0.031,
                  alignItems: 'center',
                  width: '100%',
                  flexDirection: 'row',
                }}
              >
                {kelownaSettingsModalBtns.map(btn => {
                  let isActive = btn.getActive(kelownaVibration, kelownaSound);
                  let icon = isActive ? btn.iconTrue : btn.iconFalse;
                  let onPress;
                  if (btn.onPress === 'handleToggleVibration') onPress = handleToggleVibration;
                  else if (btn.onPress === 'handleToggleSound') onPress = handleToggleSound;
                  else if (btn.onPress === 'handleKelownaClean') onPress = handleKelownaClean;

                  return (
                    <TouchableOpacity
                      key={btn.id}
                      style={{
                        height: kelownaDimension.width * 0.23,
                        borderWidth: kelownaDimension.width * 0.00450432,
                        alignItems: 'center',
                        borderColor: '#EFC949',
                        justifyContent: 'center',
                        backgroundColor: '#0A0262',
                        borderRadius: kelownaDimension.height * 0.019,
                        width: kelownaDimension.width * 0.23,
                      }}
                      onPress={onPress}
                    >
                      <Image
                        source={icon}
                        style={{
                          width: kelownaDimension.width * 0.12,

                          height: kelownaDimension.width * 0.12,
                        }}
                        resizeMode='contain'
                      />
                    </TouchableOpacity>
                  );
                })}
              </Animated.View>

              <TouchableOpacity
                style={{
                  width: kelownaDimension.width * 0.53534,
                  marginBottom: kelownaDimension.height * 0.04,
                  justifyContent: 'center',
                  borderWidth: kelownaDimension.width * 0.00450432,
                  backgroundColor: '#0A0262',
                  borderRadius: kelownaDimension.height * 0.023,
                  alignItems: 'center',
                  height: kelownaDimension.width * 0.19,
                  borderColor: '#EFC949',
                }}
                onPress={() => {
                  Share.share({
                    message: 'Install Explore Kelowna Visit Chance app for amazing places to visit in Kelowna!',
                  });
                }}
              >
                <Text style={{
                  color: '#fff',
                  fontSize: kelownaDimension.width * 0.07,
                  fontFamily: fonts.cormorantBold,
                }}>
                  SHARE APP
                </Text>
              </TouchableOpacity>

            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Сповіщення тепер поза модальним вікном */}
      {kelownaCleanNotif && (
        <View style={{
          zIndex: 999,
          position: 'absolute',
          paddingHorizontal: 32,
          backgroundColor: '#0A0262',
          paddingVertical: 18,
          borderWidth: 2,
          borderColor: '#EFC949',
          borderRadius: 18,
          top: kelownaDimension.height * 0.4,
          alignSelf: 'center',
        }}>
          <Text style={{
            textAlign: 'center',
            fontSize: kelownaDimension.width * 0.055,
            color: '#EFC949',
            fontFamily: fonts.montserratBold,
          }}>
            Data cleared!
          </Text>
        </View>
      )}

      <View style={{
        flexDirection: 'row',
        bottom: kelownaDimension.height * 0.04,
        overflow: 'hidden',
        height: kelownaDimension.width * 0.23,
        borderRadius: kelownaDimension.width * 0.05,
        width: kelownaDimension.width * 0.93023,
        borderWidth: kelownaDimension.width * 0.004,
        borderColor: '#EFC949',

        alignSelf: 'center',
      }}>
        <LinearGradient
          colors={['#0D1117', '#080069']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',

          }}
        />
        <View style={{
          height: '100%',

          justifyContent: 'space-between',

          flexDirection: 'row',

          alignItems: 'center',

          width: '100%',
        }}>
          {kelownaBottomsAll.map((button, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                alignItems: 'center',
                borderRadius: kelownaDimension.height * 0.005,
                elevation: 5,
                shadowColor: '#000',

                height: kelownaDimension.width * 0.23,
                shadowOpacity: 0.7,
                backgroundColor: kelownaPageToWatch === button.kelownaScrTitle ? '#EFC949' : 'transparent',
                shadowRadius: 4.03452,
                justifyContent: 'center',
                width: kelownaDimension.width * 0.23,
              }}
              onPress={() => setKelownaPageToWatch(button.kelownaScrTitle)}
            >
              <Image
                source={kelownaPageToWatch === button.kelownaScrTitle ? button.kelownaBluIcon : button.kelownaYelloIcon}
                style={{
                  height: kelownaDimension.width * 0.12,
                  width: kelownaDimension.width * 0.12,
                }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ExploreKelownaHomeVis;