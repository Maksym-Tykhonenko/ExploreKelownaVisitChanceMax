import {
    Image,
    Text, TouchableOpacity, View
} from 'react-native';

import React from 'react';

import { fonts } from '../assets/fonts';

interface KelownaHeaderProps {

    kelownaPageToWatch: string;

    kelownaDimension: { width: number; height: number };

    kelownaSimpleWidth: number;

    setKelownaSettingsVisible?: () => void;

}

const KelownaHeader: React.FC<KelownaHeaderProps> = ({
    kelownaDimension,
    kelownaPageToWatch,
    kelownaSimpleWidth,
    setKelownaSettingsVisible
}) => {

    return (
        <View style={{
            justifyContent: 'space-between',
            alignSelf: 'center',
            flexDirection: 'row',
            width: '97%',
            alignItems: 'center',
        }}>
            <View style={{
                width: kelownaDimension.height * 0.04443298,
                height: kelownaDimension.height * 0.04443298,
            }} />
            <Text style={{
                textAlign: 'center',
                color: '#EFC949',
                fontSize: kelownaDimension.width * 0.06805234,
                fontFamily: fonts.montserratBold,
            }}>
                {kelownaPageToWatch === 'Kelowna Home' ?
                    'Map' : kelownaPageToWatch === 'Kelowna Saved' ?
                        'Favorites' : kelownaPageToWatch === 'Kelowna Locations' ?
                            'Locations' :
                            ''}
            </Text>
            <TouchableOpacity onPress={() => {
                if (setKelownaSettingsVisible) {
                    setKelownaSettingsVisible(true);
                }
            }} style={{
                opacity: kelownaPageToWatch !== 'Kelowna Home' ? 0 : 1,
            }} disabled={kelownaPageToWatch !== 'Kelowna Home'}>
                <Image
                    source={require('../assets/icons/kelownaSettingsIcon.png')}
                    style={{
                        width: kelownaDimension.height * 0.04443298,
                        height: kelownaDimension.height * 0.04443298,
                    }}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

export default KelownaHeader;