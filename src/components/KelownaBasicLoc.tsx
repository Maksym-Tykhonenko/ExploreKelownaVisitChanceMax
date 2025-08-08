import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts } from '../assets/fonts';
import {
    Image,
    Text,
    StyleSheet,
    View, Pressable, TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import React from 'react';

type KelownaPlace = {
    kelownaName: string;
    kelownaCoordinates: {
        latitude: number;
        longitude: number;
    };
    isKelownaReadNow: boolean;
    kelownaDescription: string;
    setIsKelownaReadNow: (value: boolean) => void;
    kelownaLocatedAt: string;
    kelownaTop: number;
    kelownaRight: number;
    kelownaHistory: string;
    kelownaImage: any;
};

interface KelownaBasicLocProps {
    setReadNowPlace?: (place: any) => void;
    kelownaDimension: { width: number; height: number };
    setIsKelownaReadNow: (value: boolean) => void;
    isKelownaReadNow: boolean;
    pressedKelownaPlace: KelownaPlace | null;
    setSavedNames: (names: string[]) => void;
    savedNames: string[];
    setKelownaPageToWatch: (page: string) => void;
}

const SAVED_KEY_KELOWNA = 'kelowna_saved_places';

const flipCardSound = new Sound('flipCardSound.mp3', Sound.MAIN_BUNDLE, (error) => { });

const KelownaBasicLoc: React.FC<KelownaBasicLocProps> = ({
    setSavedNames,
    kelownaDimension,
    setReadNowPlace,
    isKelownaReadNow,
    setIsKelownaReadNow,
    pressedKelownaPlace,
}) => {
    const [isKelownaCardTapped, setIsKelownaCardTapped] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);
    const kelownaCards = [
        require('../assets/images/firstCard.png'),
        require('../assets/images/secondCard.png'),
        require('../assets/images/thirdCard.png'),
    ];
    const [randomKelownaCard, setRandomKelownaCard] = React.useState(kelownaCards[Math.floor(Math.random() * kelownaCards.length)]);

    // --- Додаємо анімацію з багатьма обертами ---
    const flipAnim = React.useRef(new Animated.Value(0)).current;
    const [isFlipped, setIsFlipped] = React.useState(false);

    // Кут повороту для передньої та зворотної сторони
    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
    });
    const backInterpolate = flipAnim.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
    });

    // Функція для програвання flipCardSound ~1 сек
    const playFlipSound = () => {
        if (flipCardSound.isPlaying()) {
            flipCardSound.stop(() => {
                flipCardSound.setCurrentTime(0);
                flipCardSound.play();
            });
        } else {
            flipCardSound.setCurrentTime(0);
            flipCardSound.play();
        }
        setTimeout(() => {
            flipCardSound.stop();
        }, 1000);
    };

    // Анімація flip з багатьма обертами
    const flipCard = () => {
        playFlipSound();
        if (isFlipped) {
            Animated.timing(flipAnim, {
                toValue: 0,
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start(() => {
                setIsFlipped(false);
                setIsKelownaCardTapped(false);
            });
        } else {
            // 3 повних оберти + 180 градусів (3.5 оберти)
            Animated.timing(flipAnim, {
                toValue: 180 + 360 * 3, // 3.5 оберти
                duration: 1200,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }).start(() => {
                // Після анімації повертаємо значення в межі [0,180]
                flipAnim.setValue(180);
                setIsFlipped(true);
                setIsKelownaCardTapped(true);
            });
        }
    };

    React.useEffect(() => {
        const checkSaved = async () => {
            if (!pressedKelownaPlace) return;
            try {
                const saved = await AsyncStorage.getItem(SAVED_KEY_KELOWNA);
                if (saved) {
                    const savedArr = JSON.parse(saved);
                    setIsSaved(savedArr.includes(pressedKelownaPlace.kelownaName));
                } else {
                    setIsSaved(false);
                }
            } catch {
                setIsSaved(false);
            }
        };
        checkSaved();
    }, [pressedKelownaPlace]);

    const toggleSave = async () => {
        if (!pressedKelownaPlace) return;
        try {
            const saved = await AsyncStorage.getItem(SAVED_KEY_KELOWNA);
            let savedArr: string[] = saved ? JSON.parse(saved) : [];
            if (isSaved) {
                savedArr = savedArr.filter((name) => name !== pressedKelownaPlace.kelownaName);
            } else {
                savedArr.push(pressedKelownaPlace.kelownaName);
            }
            setSavedNames(savedArr);
            await AsyncStorage.setItem(SAVED_KEY_KELOWNA, JSON.stringify(savedArr));
            setIsSaved(!isSaved);
        } catch { }
    };

    return (
        <View style={{
            borderWidth: kelownaDimension.width * 0.00450432,
            marginTop: kelownaDimension.height * 0.01,
            borderColor: '#EFC949',
            backgroundColor: '#1a1c20d4',
            borderRadius: kelownaDimension.width * 0.0550432,
            alignSelf: 'center',
            paddingVertical: kelownaDimension.height * 0.0160123,
            paddingHorizontal: kelownaDimension.width * 0.040532,
            zIndex: 100,
            width: kelownaDimension.width * 0.951034242,
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Image
                    resizeMode='cover'
                    source={pressedKelownaPlace?.kelownaImage}
                    style={{
                        borderRadius: kelownaDimension.width * 0.0550432,
                        height: kelownaDimension.width * 0.3508,
                        width: kelownaDimension.width * 0.3508,
                    }}
                />

                <View style={{flex: 1, marginLeft: kelownaDimension.width * 0.016}}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#EFC949',
                        fontSize: kelownaDimension.width * 0.048,
                        fontFamily: fonts.montserratBold,
                    }}>
                        {pressedKelownaPlace?.kelownaName}
                    </Text>

                    <View style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginVertical: kelownaDimension.height * 0.01,
                        justifyContent: 'flex-start',
                    }}>
                        <Image
                            source={require('../assets/images/kelownaPin.png')}
                            style={{
                                height: kelownaDimension.height * 0.04,
                                marginRight: kelownaDimension.width * 0.004,
                                width: kelownaDimension.height * 0.04,
                            }}
                            resizeMode='contain'
                        />
                        <Text style={{
                            color: '#fff',
                            fontSize: kelownaDimension.width * 0.04,
                            fontFamily: fonts.montserratRegular,
                        }} adjustsFontSizeToFit numberOfLines={1}>
                            {pressedKelownaPlace?.kelownaCoordinates.latitude}, {pressedKelownaPlace?.kelownaCoordinates.longitude}
                        </Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        width: '100%',
                        justifyContent: !isKelownaReadNow ? 'center' : 'space-between',
                        alignItems: 'center',
                        gap: kelownaDimension.width * 0.0210142,
                        flexDirection: 'row',
                    }}>
                        {isKelownaReadNow && (
                            <Pressable style={{
                                borderColor: '#EFC949',
                                width: kelownaDimension.height * 0.05,
                                borderWidth: kelownaDimension.width * 0.00450432,
                                alignSelf: 'center',
                                backgroundColor: '#0A0262',
                                borderRadius: kelownaDimension.width * 0.0450432,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: kelownaDimension.height * 0.05,
                            }}>
                                <Image
                                    source={require('../assets/icons/shareIcon.png')}
                                    style={{
                                        width: kelownaDimension.width * 0.07,
                                        height: kelownaDimension.width * 0.07,
                                    }}
                                    resizeMode='contain'
                                />
                            </Pressable>
                        )}

                        <TouchableOpacity style={{
                            borderColor: '#EFC949',
                            paddingHorizontal: kelownaDimension.width * 0.04,
                            height: kelownaDimension.height * 0.05,
                            alignItems: 'center',
                            borderRadius: kelownaDimension.width * 0.0450432,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            borderWidth: kelownaDimension.width * 0.00450432,
                            backgroundColor: '#0A0262',
                        }} onPress={() => {
                            setIsKelownaReadNow(kelPrev => !kelPrev);

                            setReadNowPlace && setReadNowPlace(pressedKelownaPlace);

                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: !isKelownaReadNow ? kelownaDimension.width * 0.061 : kelownaDimension.width * 0.05,
                                fontFamily: fonts.cormorantBold,
                            }}>
                                {isKelownaReadNow ? 'CLOSE' : 'READ'}
                            </Text>
                        </TouchableOpacity>

                        <Pressable
                            style={{
                                borderWidth: kelownaDimension.width * 0.00450432,
                                borderColor: '#EFC949',
                                alignSelf: 'center',
                                height: kelownaDimension.height * 0.05,
                                backgroundColor: '#0A0262',
                                borderRadius: kelownaDimension.width * 0.0450432,
                                justifyContent: 'center',
                                width: kelownaDimension.height * 0.05,
                                alignItems: 'center',
                            }}
                            onPress={toggleSave}
                        >
                            <Image
                                source={
                                    isSaved
                                        ? require('../assets/icons/kelownaSavedIcon.png')
                                        : require('../assets/icons/kelownaUnsavedIcon.png')
                                }
                                style={{
                                    width: kelownaDimension.width * 0.07,
                                    height: kelownaDimension.width * 0.07,
                                }}
                                resizeMode='contain'
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            {isKelownaReadNow && (
                <View style={{marginTop: kelownaDimension.height * 0.01905243, width: '100%', justifyContent: 'center',}}>
                    <Text style={{
                        textAlign: 'left',
                        color: '#fff',
                        fontSize: kelownaDimension.width * 0.035,
                        fontFamily: fonts.montserratRegular,
                    }}>
                        Located at {pressedKelownaPlace?.kelownaLocatedAt}. {pressedKelownaPlace?.kelownaDescription}
                    </Text>

                    <Text style={{
                        marginTop: kelownaDimension.height * 0.01,
                        fontSize: kelownaDimension.width * 0.035,
                        textAlign: 'left',
                        color: '#fff',
                        fontFamily: fonts.montserratRegular,
                    }}>
                        History: {pressedKelownaPlace?.kelownaHistory}
                    </Text>

                    <Text style={{
                        marginTop: kelownaDimension.height * 0.028,
                        textAlign: 'center',
                        fontSize: kelownaDimension.width * 0.04,
                        color: '#fff',
                        fontFamily: fonts.montserratRegular,
                    }}>
                        Tap the map to unlock your task.
                    </Text>

                    {/* Анімована картка */}
                    <TouchableOpacity onPress={flipCard} activeOpacity={0.8888}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* Front (закрита картка) */}
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    backfaceVisibility: 'hidden',
                                    transform: [{ rotateY: frontInterpolate }],
                                }}
                            >
                                <Image
                                    source={require('../assets/images/cardBackImage.png')}
                                    style={{
                                        marginTop: kelownaDimension.height * 0.02,
                                        borderRadius: kelownaDimension.width * 0.0550432,
                                        height: kelownaDimension.height * 0.21,
                                        alignSelf: 'center',
                                        width: kelownaDimension.width * 0.3,
                                    }}
                                    resizeMode='cover'
                                />
                            </Animated.View>
                            {/* Back (відкрита картка) */}
                            <Animated.View
                                style={{
                                    transform: [{ rotateY: backInterpolate }],
                                    backfaceVisibility: 'hidden',
                                    position: 'absolute',
                                }}
                            >
                                <Image
                                    source={randomKelownaCard}
                                    style={{
                                        borderRadius: kelownaDimension.width * 0.0550432,
                                        marginTop: kelownaDimension.height * 0.02,
                                        height: kelownaDimension.height * 0.21,
                                        alignSelf: 'center',
                                        width: kelownaDimension.width * 0.3,
                                    }}
                                    resizeMode='stretch'
                                />
                            </Animated.View>
                            {/* Прозорий View для розміру */}
                            <View style={{
                                opacity: 0,
                                marginTop: kelownaDimension.height * 0.02,
                                height: kelownaDimension.height * 0.21,
                                width: kelownaDimension.width * 0.3,
                            }} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default KelownaBasicLoc;