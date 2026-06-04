import { useRef, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { planets } from '../../data/planets';
import { usePlanetImages } from '../../hooks/useNasaData';

const GRP = 3;

export function PlanetCarousel() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const scrollRef = useRef<ScrollView>(null);
  const [page, setPage] = useState(0);

  const pad = width * 0.06;
  const gap = 20;
  const groupSize = isMobile ? 1 : GRP;
  const cardW = isMobile
    ? width - pad * 2
    : (width - pad * 2 - gap * (groupSize - 1)) / groupSize;
  const totalPages = Math.ceil(planets.length / groupSize);

  const searches = planets.map((p) => p.search);
  const imageMap = usePlanetImages(searches);

  const scrollTo = useCallback((index: number) => {
    const p = Math.max(0, Math.min(index, totalPages - 1));
    setPage(p);
    scrollRef.current?.scrollTo({ x: p * (cardW + gap) * groupSize, animated: true });
  }, [cardW, gap, groupSize, totalPages]);

  useEffect(() => { setPage(0); scrollRef.current?.scrollTo({ x: 0, animated: false }); }, [isMobile]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuestro Sistema Solar</Text>
        <View style={styles.arrows}>
          <Pressable
            onPress={() => scrollTo(page - 1)}
            style={[styles.arrowBtn, page === 0 && styles.arrowDisabled]}
            disabled={page === 0}
          >
            <Ionicons name="chevron-back" size={22} color={page === 0 ? '#D1D5DB' : '#111827'} />
          </Pressable>
          <Pressable
            onPress={() => scrollTo(page + 1)}
            style={[styles.arrowBtn, page >= totalPages - 1 && styles.arrowDisabled]}
            disabled={page >= totalPages - 1}
          >
            <Ionicons name="chevron-forward" size={22} color={page >= totalPages - 1 ? '#D1D5DB' : '#111827'} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap, paddingHorizontal: pad }}
        onMomentumScrollEnd={(e) => {
          const np = Math.round(e.nativeEvent.contentOffset.x / ((cardW + gap) * groupSize));
          setPage(np);
        }}
      >
        {planets.map((planet) => {
          const img = imageMap[planet.search];
          return (
            <View key={planet.id} style={{ width: cardW }}>
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  {img ? (
                    <Image source={{ uri: img }} style={styles.cardImage} contentFit="cover" />
                  ) : (
                    <View style={[styles.cardImage, styles.placeholder]} />
                  )}
                </View>
                <View style={styles.nameBar}>
                  <Text style={styles.planetName}>{planet.name}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 40 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: '6%', marginBottom: 24,
  },
  title: { color: '#111827', fontSize: 28, fontWeight: '700' },
  arrows: { flexDirection: 'row', gap: 8 },
  arrowBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center',
  },
  arrowDisabled: { opacity: 0.5 },
  card: {
    backgroundColor: '#000000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainer: { width: '100%', height: 220 },
  cardImage: { width: '100%', height: '100%' },
  placeholder: { backgroundColor: '#1F2937' },
  nameBar: {
    backgroundColor: '#000000',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  planetName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
