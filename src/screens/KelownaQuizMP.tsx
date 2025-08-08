import KelownaPagesPreview from '../components/KelownaPagesPreview';
import AdaptiveButton from '../components/AdaptiveButton';
import React, { useEffect, useState } from 'react';
import { kelownaPreviews } from '../components/kelownaPreviews';
import { kelownaQuizResultsData } from '../components/kelownaQuizResultsData';
import KelownaHeader from '../components/KelownaHeader';

import {
    SafeAreaView,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';



import { kelownaQuizData } from '../components/kelownaQuizData';


import { fonts } from '../assets/fonts';

import { kelownaLocations } from '../assets/kelownaLocations';


type KelownaQuizMPProps = {
    kelownaPageToWatch: string;
};

const kelownaSimpleWidth = 0.921034242;

const KelownaQuizMP: React.FC<KelownaQuizMPProps> = ({

    kelownaPageToWatch,

}) => {
    const [kelownaResult, setKelownaResult] = useState<object | null>(null);
    const [kelownaQuizIndex, setKelownaQuizIndex] = useState(0);
    const [kelownaSelectedOption, setKelownaSelectedOption] = useState<number | null>(null);
    const [kelownaShowResults, setKelownaShowResults] = useState(false);
    const [kelownaCorrectAnswers, setKelownaCorrectAnswers] = useState(0);
    const [isKelownaQuizStarted, setIsKelownaQuizStarted] = useState(false);
    const kelownaDimension = Dimensions.get('window');
    const [kelownaAnswered, setKelownaAnswered] = useState(false);

    useEffect(() => {
        if (kelownaCorrectAnswers > 6) setKelownaResult(kelownaQuizResultsData[0]);
        else if (kelownaCorrectAnswers > 3) setKelownaResult(kelownaQuizResultsData[1]);
        else setKelownaResult(kelownaQuizResultsData[2]);
    }, [kelownaShowResults]);

    const currentQuiz = kelownaQuizData[kelownaQuizIndex];

    const handleOptionPress = (optionIdx: number) => {
        if (kelownaAnswered) return;
        setKelownaSelectedOption(optionIdx);
        setKelownaAnswered(true);
        if (optionIdx === currentQuiz.correctAnswer) {
            setKelownaCorrectAnswers(prev => prev + 1);
        }
        setTimeout(() => {
            if (kelownaQuizIndex < kelownaQuizData.length - 1) {
                setKelownaQuizIndex(prev => prev + 1);
                setKelownaSelectedOption(null);
                setKelownaAnswered(false);
            } else {
                setKelownaShowResults(true);
            }
        }, 1100);
    };

    const handleRestart = () => {
        setIsKelownaQuizStarted(false);
        setKelownaQuizIndex(0);
        setKelownaSelectedOption(null);
        setKelownaAnswered(false);
        setKelownaCorrectAnswers(0);
        setKelownaShowResults(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <KelownaHeader
                    kelownaSimpleWidth={kelownaSimpleWidth}
                    kelownaDimension={kelownaDimension}
                    kelownaPageToWatch={kelownaPageToWatch}
                />
            </SafeAreaView>

            {!isKelownaQuizStarted ? (
                <>
                    <KelownaPagesPreview
                        kelownaPreviewObg={kelownaPreviews[1]}
                        onKelownaPress={() => setIsKelownaQuizStarted(true)}
                        kelownaDimension={kelownaDimension}
                    />
                </>
            ) : kelownaShowResults ? (
                <View style={{

                    flex: 1,

                    justifyContent: 'center',

                    alignItems: 'center',
                }}>
                    <View style={{
                        alignItems: 'center',
                        zIndex: 100,
                        paddingBottom: kelownaDimension.height * 0.0260123,
                        backgroundColor: '#1a1c20d4',
                        borderRadius: kelownaDimension.width * 0.0550432,
                        marginTop: kelownaDimension.height * 0.03,
                        borderColor: '#EFC949',
                        borderWidth: kelownaDimension.width * 0.00450432,
                        alignSelf: 'center',
                        width: kelownaDimension.width * 0.951034242,
                        paddingHorizontal: kelownaDimension.width * 0.040532,
                    }}>
                        <Image
                            source={kelownaResult?.kelownaQuizImage}
                            style={{
                                marginBottom: kelownaDimension.height * 0.02,
                                borderRadius: kelownaDimension.width * 0.03,
                                height: kelownaDimension.height * 0.21,
                                width: kelownaDimension.width * 0.4,
                            }}
                            resizeMode='contain'
                        />
                        <Text style={{
                            marginBottom: kelownaDimension.height * 0.02,
                            fontFamily: fonts.montserratBold,
                            textAlign: 'center',
                            color: '#EFC949',
                            fontSize: kelownaDimension.width * 0.05704324,
                        }}>
                            {kelownaResult?.kelownaQuizTitle}
                        </Text>

                        <Text style={{
                            marginBottom: kelownaDimension.height * 0.02,
                            fontSize: kelownaDimension.width * 0.04,
                            textAlign: 'center',
                            color: '#fff',
                            fontFamily: fonts.montserratRegular,
                        }}>
                            {kelownaResult?.kelownaQuizDescription}
                        </Text>

                        <Text style={{
                            marginBottom: kelownaDimension.height * 0.02,
                            fontSize: kelownaDimension.width * 0.06,
                            textAlign: 'center',
                            color: '#fff',
                            fontFamily: fonts.montserratRegular,
                        }}>
                            {`You got ${kelownaCorrectAnswers} out of ${kelownaQuizData.length} correct!`}
                        </Text>
                        <TouchableOpacity
                            style={{
                                marginTop: kelownaDimension.height * 0.01,
                                alignItems: 'center',
                                alignSelf: 'center',
                                paddingVertical: kelownaDimension.height * 0.016,
                                backgroundColor: '#0A0262',
                                borderColor: '#EFC949',
                                justifyContent: 'center',
                                borderRadius: kelownaDimension.width * 0.0450432,
                                borderWidth: kelownaDimension.width * 0.00450432,
                                width: kelownaDimension.width * 0.61,
                            }}
                            onPress={handleRestart}
                        >
                            <Text style={{
                                textAlign: 'center',
                                fontSize: kelownaDimension.width * 0.06,
                                color: '#fff',
                                fontFamily: fonts.montserratBold,
                            }}>
                                TRY AGAIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <View style={{
                        marginTop: kelownaDimension.height * 0.03,
                        paddingVertical: kelownaDimension.height * 0.0260123,
                        paddingHorizontal: kelownaDimension.width * 0.040532,
                        borderRadius: kelownaDimension.width * 0.0550432,
                        borderWidth: kelownaDimension.width * 0.00450432,
                        borderColor: '#EFC949',
                        alignSelf: 'center',
                        backgroundColor: '#1a1c20d4',
                        width: kelownaDimension.width * 0.951034242,
                        zIndex: 100,
                    }}>
                        <Image
                            source={kelownaLocations[kelownaQuizIndex].kelownaImage}
                            style={{
                                borderRadius: kelownaDimension.width * 0.03,
                                height: kelownaDimension.width * 0.3,
                                width: kelownaDimension.width * 0.3,
                                alignSelf: 'center',
                            }}
                            resizeMode='stretch'
                        />

                        <Text style={{
                            marginVertical: kelownaDimension.height * 0.0192341,
                            fontSize: kelownaDimension.width * 0.04805234,
                            textAlign: 'center',
                            color: '#EFC949',
                            fontFamily: fonts.montserratBold,
                        }}>
                            {currentQuiz.question}
                        </Text>

                        {currentQuiz.options.map((option, index) => {
                            let backgroundColor = '#0A0262';
                            let borderColor = '#EFC949';
                            let textColor = '#EFC949';

                            if (kelownaAnswered) {
                                if (kelownaSelectedOption === index) {
                                    if (kelownaSelectedOption === currentQuiz.correctAnswer) {
                                        backgroundColor = '#094C00'; // correct
                                        textColor = '#fff';
                                    } else {
                                        backgroundColor = '#650900'; // wrong
                                        textColor = '#fff';
                                    }
                                } else {
                                    backgroundColor = '#535353';
                                    textColor = '#fff';
                                }
                            }

                            return (
                                <AdaptiveButton
                                    buttonHeight={kelownaDimension.height * 0.0950543}
                                    disabled={kelownaAnswered}
                                    buttonWidth={kelownaDimension.width * 0.68}
                                    onPress={() => handleOptionPress(index)}
                                    option={option}
                                    backgroundColor={backgroundColor}
                                    borderColor={borderColor}
                                    textColor={textColor}
                                    key={index}
                                />
                            );
                        })}
                    </View>
                </>
            )}
        </View>
    );
};

export default KelownaQuizMP;
