import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function getAdaptiveFontSize(option: string, buttonWidth: number, buttonHeight: number) {
  // Базовий розмір для коротких слів
  const base = buttonHeight * 0.38;
  // Зменшуємо розмір для довших рядків
  if (option.length <= 10) return base;
  if (option.length <= 20) return base * 0.8;
  if (option.length <= 30) return base * 0.64;
  return Math.max(base * 0.5, 14); // Мінімум 14
}

const AdaptiveButton: React.FC<{
  option: string;
  buttonWidth: number;
  buttonHeight: number;
  style?: any;
  textStyle?: any;
  onPress: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}> = ({
  option,
  buttonWidth,
  buttonHeight,
  style,
  textStyle,
  onPress,
  disabled,
  backgroundColor = '#0A0262',
  borderColor = '#EFC949',
  textColor = '#EFC949',
}) => {
  const fontSize = getAdaptiveFontSize(option, buttonWidth, buttonHeight);

  return (
    <TouchableOpacity
      style={[
        {
          alignSelf: 'center',
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor,
          borderRadius: buttonWidth * 0.066,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: buttonWidth * 0.0066,
          borderColor,
          margin: buttonHeight * 0.06,
          paddingHorizontal: buttonWidth * 0.01,
          paddingVertical: buttonHeight * 0.05,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          {
            fontFamily: 'Montserrat-Bold',
            fontSize,
            color: textColor,
            textAlign: 'center',
            width: '100%',
          },
          textStyle,
        ]}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {option}
      </Text>
    </TouchableOpacity>
  );
};

export default AdaptiveButton;