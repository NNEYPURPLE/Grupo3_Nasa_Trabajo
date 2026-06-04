import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Header } from '../components/layout/Header';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <Header />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
