import { View, Text, StyleSheet, ScrollView, Pressable, Share, Platform } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApod } from '../hooks/useNasaData';
import { colors } from '../theme/colors';

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ApodScreen() {
  const router = useRouter();
  const { data: apod, loading, error } = useApod();

  const handleShare = async () => {
    if (!apod) return;
    const [y, m, d] = apod.date.split('-');
    const pageUrl = `https://apod.nasa.gov/apod/ap${y.slice(2)}${m}${d}.html`;
    try {
      await Share.share({
        title: apod.title,
        message: `${apod.title}\n\n${apod.explanation.substring(0, 200)}...\n\n${pageUrl}`,
        url: pageUrl,
      });
    } catch {}
  };

  const handleDownload = () => {
    if (!apod) return;
    const imageUrl = apod.hdurl || apod.url;
    if (Platform.OS === 'web') {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `nasa-apod-${apod.date}.jpg`;
      a.target = '_blank';
      a.click();
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>REGRESAR</Text>
        </Pressable>
        <View style={styles.centerBox}>
          {[300, 220, 160].map((w, i) => (
            <View key={i} style={[styles.skelLine, { width: w, backgroundColor: '#E5E7EB' }]} />
          ))}
        </View>
      </View>
    );
  }

  if (error || !apod) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>REGRESAR</Text>
        </Pressable>
        <View style={styles.centerBox}>
          <Text style={[styles.errorTitle, { color: colors.text }]}>No se pudo cargar</Text>
          <Text style={[styles.errorSub, { color: colors.textMuted }]}>Intenta de nuevo más tarde</Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={22} color={colors.text} />
        <Text style={[styles.backText, { color: colors.text }]}>REGRESAR</Text>
      </Pressable>

      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: apod.hdurl || apod.url }}
          style={styles.image}
          contentFit="cover"
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelLabel}>IMAGEN DEL DÍA</Text>
        <Text style={[styles.panelDate, { color: colors.textMuted }]}>{capitalize(formatDate(apod.date))}</Text>
        <Text style={[styles.panelTitle, { color: colors.text }]}>{apod.title}</Text>

        <View style={styles.actionsRow}>
          <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.8 }]} onPress={handleShare}>
            <Ionicons name="share-outline" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Compartir</Text>
          </Pressable>
          <Pressable style={({ pressed }) => [styles.actionBtn, pressed && { opacity: 0.8 }]} onPress={handleDownload}>
            <Ionicons name="download-outline" size={20} color={colors.text} />
            <Text style={[styles.actionText, { color: colors.text }]}>Descargar</Text>
          </Pressable>
        </View>

        {apod.copyright && (
          <Text style={[styles.credit, { color: colors.textMuted }]}>© {apod.copyright}</Text>
        )}
      </View>

      <View style={styles.explanationSection}>
        <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{apod.explanation}</Text>
        <View style={[styles.metaRow, { borderTopColor: colors.surfaceBorder }]}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{apod.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="image-outline" size={16} color={colors.textMuted} />
            <Text style={[styles.metaText, { color: colors.textMuted }]}>{apod.media_type === 'video' ? 'Video' : 'Imagen'}</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  backBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: '5%', paddingTop: 100, paddingBottom: 20,
  },
  backText: { fontSize: 14, fontWeight: '600', letterSpacing: 1 },

  centerBox: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingTop: 120, gap: 12,
  },

  imageWrapper: {
    paddingHorizontal: '5%',
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 500,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },

  panel: {
    paddingHorizontal: '5%',
    paddingVertical: 28,
    gap: 16,
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
  },
  panelLabel: { color: '#60A5FA', fontSize: 11, fontWeight: '800', letterSpacing: 3 },
  panelDate: { fontSize: 13, fontWeight: '500' },
  panelTitle: { fontSize: 28, fontWeight: '700', lineHeight: 36 },

  actionsRow: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#F3F4F6',
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
    paddingVertical: 12, paddingHorizontal: 20, borderRadius: 6,
  },
  actionText: { fontSize: 14, fontWeight: '600' },

  credit: { fontSize: 12, fontStyle: 'italic' },

  explanationSection: {
    paddingHorizontal: '5%',
    maxWidth: 1000,
    alignSelf: 'center',
    width: '100%',
    paddingBottom: 24,
  },
  explanationText: { fontSize: 16, lineHeight: 27, marginBottom: 24 },

  metaRow: { flexDirection: 'row', gap: 32, paddingTop: 20, borderTopWidth: 1 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { fontSize: 14 },

  skelLine: { height: 18, borderRadius: 4 },

  errorTitle: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  errorSub: { fontSize: 15 },
});
