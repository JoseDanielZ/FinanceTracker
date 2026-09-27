import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useFonts, SpaceGrotesk_600SemiBold, SpaceGrotesk_700Bold } from '@expo-google-fonts/space-grotesk';
import { IBMPlexSans_400Regular, IBMPlexSans_500Medium, IBMPlexSans_600SemiBold } from '@expo-google-fonts/ibm-plex-sans';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/presentation/navigation/RootNavigator';

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <RootNavigator />
    </>
  );
}
