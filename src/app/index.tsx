import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useApod } from '../hooks/useNasaData';
import { colors } from '../theme/colors';
import { PlanetCarousel } from '../components/home/PlanetCarousel';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function InicioScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const router = useRouter();
  const { data: apod, loading, error } = useApod();

  const handleExplore = () => {
    if (!apod) return;
    router.push('/apod');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {loading ? (
        <View style={[styles.heroContainer, { height: isMobile ? 500 : 700 }]}>
          <View style={[styles.skeletonImage, StyleSheet.absoluteFill]} />
          <View style={styles.heroOverlay}>
            <View style={[styles.skelLine, { width: 180, backgroundColor: '#E5E7EB' }]} />
            <View style={[styles.skelLine, { width: isMobile ? '80%' : '60%', height: 36, backgroundColor: '#E5E7EB' }]} />
          </View>
        </View>
      ) : error || !apod ? (
        <View style={[styles.heroContainer, { height: isMobile ? 500 : 700 }]}>
          <View style={styles.errorContainer}>
            <Text style={[styles.errorTitle, { color: colors.text }]}>No se pudo cargar</Text>
            <Text style={[styles.errorSub, { color: colors.textMuted }]}>Intenta de nuevo más tarde</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.heroContainer, { height: isMobile ? 500 : 700 }]}>
          <Image
            source={{ uri: apod.hdurl || apod.url }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.75)']}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroLabel}>IMAGEN DEL DÍA</Text>
            <Text style={[styles.heroDate, { color: '#D1D5DB' }]}>{capitalize(formatDate(apod.date))}</Text>
            <Text style={[styles.heroTitle, isMobile && styles.heroTitleMobile]}>
              {apod.title}
            </Text>
            <Pressable
              onPress={handleExplore}
              style={({ pressed }) => [styles.exploreBtn, pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] }]}
            >
              <Text style={styles.exploreBtnText}>EXPLORAR</Text>
            </Pressable>
          </View>
        </View>
      )}
      <PlanetCarousel />
      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroContainer: { width: '100%', justifyContent: 'flex-end' },
  heroOverlay: { paddingHorizontal: '6%', paddingBottom: 80, maxWidth: 900 },
  heroLabel: { color: '#60A5FA', fontSize: 12, fontWeight: '800', letterSpacing: 3, marginBottom: 8 },
  heroDate: { fontSize: 14, fontWeight: '500', marginBottom: 16 },
  heroTitle: { color: '#FFFFFF', fontSize: 44, fontWeight: '700', lineHeight: 52, marginBottom: 28 },
  heroTitleMobile: { fontSize: 28, lineHeight: 36 },
  exploreBtn: { backgroundColor: '#2563EB', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 4, alignSelf: 'flex-start' },
  exploreBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800', letterSpacing: 2 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
  errorTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  errorSub: { fontSize: 15 },
  skelLine: { height: 16, borderRadius: 4, marginBottom: 12 },
  skeletonImage: { backgroundColor: '#E5E7EB' },
});
