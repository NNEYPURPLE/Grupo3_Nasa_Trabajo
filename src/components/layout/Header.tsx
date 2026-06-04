import { View, Text, StyleSheet, Pressable, TextInput, useWindowDimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { NasaLogo } from '../ui/NasaLogo';

export function Header() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <BlurView intensity={Platform.OS === 'web' ? 80 : 40} tint="dark" style={styles.headerContainer}>
      <View style={styles.content}>
        
        {/* Izquierda: Menú Explorar (Estructura formal) */}
        <View style={styles.leftSection}>
          <Pressable style={styles.menuButton}>
            <Ionicons name="menu-outline" size={28} color="#FFFFFF" />
            {!isMobile && <Text style={styles.menuText}>EXPLORAR</Text>}
          </Pressable>
        </View>

        {/* Centro: Logotipo (Original tuyo centrado) */}
        <Pressable onPress={() => router.push('/')} style={styles.centerSection}>
          {/* El componente escala tu SVG original */}
          <NasaLogo width={80} height={65} /> 
        </Pressable>

        {/* Derecha: Búsqueda (Input moderno y limpio) */}
        <View style={styles.rightSection}>
          {!isMobile ? (
            <View style={styles.searchContainer}>
              <TextInput 
                style={styles.searchInput}
                placeholder="Buscar..."
                placeholderTextColor="#A0AAB5"
              />
              <Ionicons name="search" size={18} color="#A0AAB5" />
            </View>
          ) : (
            <Pressable>
              <Ionicons name="search" size={24} color="#FFFFFF" />
            </Pressable>
          )}
        </View>

      </View>
    </BlurView>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
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
    backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16, height: 40, width: 220,
  },
  searchInput: { flex: 1, color: '#FFF', outlineStyle: 'none', marginRight: 8 },
});