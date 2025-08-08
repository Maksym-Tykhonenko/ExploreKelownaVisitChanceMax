interface KelownaPagesPreviewProps {
    kelownaDimension: { width: number; height: number };
    onKelownaPress: () => void;
    kelownaPreviewObg: {
        id: number;
        title: string;
        description: string;
        image: any;
        buttonTitle: string;
    }
}



import React from 'react';

import { fonts } from '../assets/fonts';

import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';



const KelownaPagesPreview: React.FC<KelownaPagesPreviewProps> = ({
    kelownaPreviewObg,
    onKelownaPress,
    kelownaDimension,
}) => {

    return (
        <>
            <Image
                source={require('../assets/images/kelownaJudgeMan.png')}
                style={{
                    marginTop: -kelownaDimension.height * 0.05,
                    alignSelf: 'center',
                    height: kelownaDimension.height * 0.3,
                    width: kelownaDimension.width * 0.5,
                }}
                resizeMode='contain'
            />
            <View style={{
                borderColor: '#EFC949',
                width: kelownaDimension.width * 0.951034242,
                paddingHorizontal: kelownaDimension.width * 0.040532,
                backgroundColor: '#1a1c20d4',
                alignSelf: 'center',
                borderWidth: kelownaDimension.width * 0.00450432,
                borderRadius: kelownaDimension.width * 0.0550432,
                zIndex: 100,
                paddingVertical: kelownaDimension.height * 0.0160123,
            }}>
                <Image
                    source={kelownaPreviewObg.image}
                    style={{
                        height: kelownaDimension.width * 0.3,
                        alignSelf: 'center',
                        width: kelownaDimension.width * 0.3,
                    }}
                    resizeMode='contain'
                />

                <Text style={{
                    textAlign: 'center',
                    fontSize: kelownaDimension.width * 0.04805234,
                    color: '#EFC949',
                    fontFamily: fonts.montserratBold,
                }}>
                    {kelownaPreviewObg.title}
                </Text>
                <Text style={{
                    paddingBottom: kelownaDimension.height * 0.04,
                    marginTop: kelownaDimension.height * 0.01,
                    fontSize: kelownaDimension.width * 0.04,
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: fonts.montserratRegular,
                }}>
                    {kelownaPreviewObg.description}
                </Text>

                <TouchableOpacity style={{
                    bottom: -kelownaDimension.height * 0.04,
                    width: kelownaDimension.width * 0.61,
                    alignItems: 'center',
                    backgroundColor: '#0A0262',
                    borderRadius: kelownaDimension.width * 0.0450432,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    borderWidth: kelownaDimension.width * 0.00450432,
                    borderColor: '#EFC949',
                    position: 'absolute',
                    paddingVertical: kelownaDimension.height * 0.016,
                }} onPress={onKelownaPress}>
                    <Text style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontFamily: fonts.montserratBold,
                        fontSize: kelownaDimension.width * 0.08,
                    }}>
                        {kelownaPreviewObg.buttonTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default KelownaPagesPreview;