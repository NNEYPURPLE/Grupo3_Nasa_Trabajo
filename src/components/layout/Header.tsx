import { View, Text, StyleSheet, Pressable, TextInput, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { NasaLogo } from '../ui/NasaLogo';

export function Header() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Pressable style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
            {!isMobile && <Text style={styles.menuText}>EXPLORAR</Text>}
          </Pressable>
        </View>
        <Pressable onPress={() => router.push('/')} style={styles.centerSection}>
          <NasaLogo width={80} height={65} />
        </Pressable>
        <View style={styles.rightSection}>
          {!isMobile ? (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor="#9CA3AF"
              />
              <Ionicons name="search" size={18} color="#9CA3AF" />
            </View>
          ) : (
            <Pressable>
              <Ionicons name="search" size={24} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    zIndex: 1000,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, maxWidth: 1400, width: '100%', alignSelf: 'center',
  },
  leftSection: { flex: 1, alignItems: 'flex-start' },
  centerSection: { flex: 1, alignItems: 'center' },
  rightSection: { flex: 1, alignItems: 'flex-end' },
  menuButton: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 2 },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16, height: 40, width: 220,
  },
  searchInput: { flex: 1, color: '#FFF', marginRight: 8 },
});
