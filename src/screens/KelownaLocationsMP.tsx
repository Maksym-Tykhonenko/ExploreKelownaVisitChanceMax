import KelownaBasicLoc from '../components/KelownaBasicLoc';
import { kelownaLocations } from '../assets/kelownaLocations';
import React, { useState, useRef } from 'react';
import { fonts } from '../assets/fonts';
import KelownaPagesPreview from '../components/KelownaPagesPreview';
import { kelownaPreviews } from '../components/kelownaPreviews';
import { ScrollView } from 'react-native-gesture-handler';
import KelownaHeader from '../components/KelownaHeader';
import {
    View,
    SafeAreaView,
    Text,
    Image,
    Dimensions,
    Modal,
} from 'react-native';


const kelownaSimpleWidth = 0.921034242;

type ExploreKelownaLocationsMPProps = {
    kelownaPageToWatch: string;
    setSavedNames: (names: string[]) => void;
    setIsKelownaReadNow: (value: boolean) => void;
    savedNames: string[];
    setIsKelownaPreviewWas: (value: boolean) => void;
    setKelownaPageToWatch: (page: string) => void;
    isKelownaPreviewWas: boolean;
    isKelownaReadNow: boolean;
};

const kelownaBottomGap = 0.16

const KelownaLocationsMP: React.FC<ExploreKelownaLocationsMPProps> = ({
    savedNames,
    isKelownaPreviewWas,
    kelownaPageToWatch,
    isKelownaReadNow,
    setIsKelownaReadNow,
    setSavedNames,
    setIsKelownaPreviewWas,
    setKelownaPageToWatch,
}) => {
    const [readNowPlace, setReadNowPlace] = useState<any>(null);

    const scrollRef = useRef<ScrollView>(null);

    const kelownaDimension = Dimensions.get('window');

    const kelownaLocsToShowHere =
        kelownaPageToWatch === 'Kelowna Saved'
            ? kelownaLocations.filter(loc => savedNames.includes(loc.kelownaName))
            : kelownaLocations;

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <KelownaHeader
                    kelownaSimpleWidth={kelownaSimpleWidth}
                    kelownaPageToWatch={kelownaPageToWatch}
                    kelownaDimension={kelownaDimension}
                />
            </SafeAreaView>
            {kelownaLocsToShowHere.length === 0 && (
                <>
                    <Text style={{
                        paddingHorizontal: kelownaDimension.width * 0.03,
                        fontFamily: fonts.montserratBold,
                        color: '#EFC949',
                        fontSize: kelownaDimension.width * 0.06105234,
                        textAlign: 'center',
                        marginTop: kelownaDimension.height * 0.05,
                    }}>
                        Looks Like You {'\n'}Haven’t Picked Any{'\n'}Favorites Yet.
                    </Text>
                    <Image
                        source={require('../assets/images/kelownaNoFavs.png')}
                        style={{
                            marginTop: kelownaDimension.height * 0.05,
                            alignSelf: 'center',
                            height: kelownaDimension.width * 0.61,
                            width: kelownaDimension.width * 0.61,
                        }}
                        resizeMode='contain'
                    />
                </>
            )}
            <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                style={{ flex: 1 }}
                contentContainerStyle={{
                    paddingBottom: kelownaDimension.height * kelownaBottomGap,
                }}
            >
                {isKelownaReadNow && readNowPlace ? (
                    <KelownaBasicLoc
                        setReadNowPlace={setReadNowPlace}
                        pressedKelownaPlace={readNowPlace}
                        setKelownaPageToWatch={setKelownaPageToWatch}
                        isKelownaReadNow={isKelownaReadNow}
                        setSavedNames={setSavedNames}
                        setIsKelownaReadNow={setIsKelownaReadNow}
                        kelownaDimension={kelownaDimension}
                        savedNames={savedNames}
                    />
                ) : (
                    kelownaLocsToShowHere.map((kelLoc, index) => (
                        <KelownaBasicLoc
                            setSavedNames={setSavedNames}
                            kelownaDimension={kelownaDimension}
                            pressedKelownaPlace={kelLoc}
                            setKelownaPageToWatch={setKelownaPageToWatch}
                            setReadNowPlace={setReadNowPlace}
                            setIsKelownaReadNow={setIsKelownaReadNow}
                            savedNames={savedNames}
                            isKelownaReadNow={isKelownaReadNow}
                            key={index}
                        />
                    ))
                )}
            </ScrollView>

            <Modal visible={!isKelownaPreviewWas} transparent={true} animationType='fade'>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#1b1b1bd4',
                    flex: 1,
                }}>
                    <KelownaPagesPreview
                        kelownaPreviewObg={kelownaPreviews[0]}
                        onKelownaPress={() => setIsKelownaPreviewWas(true)}
                        kelownaDimension={kelownaDimension}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default KelownaLocationsMP;
