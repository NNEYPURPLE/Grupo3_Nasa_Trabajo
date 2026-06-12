import { Image } from 'expo-image';
import { View } from 'react-native';

interface LogoProps {
  width?: number;
  height?: number;
}

export function NasaLogo({ width = 70, height = 60 }: LogoProps) {
  return (
    <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
      <Image 
        // Importamos tu archivo original desde assets
        source={require('../../../assets/nasa-logo.svg')}
        style={{ width: '100%', height: '100%' }}
        contentFit="contain"
      />
    </View>
  );
}