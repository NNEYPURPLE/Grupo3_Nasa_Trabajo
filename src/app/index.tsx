import { ScrollView, View, Text, StyleSheet, Pressable, useWindowDimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

export default function InicioScreen() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;
  
  // Forzamos que el Hero ocupe toda la pantalla inicial sin dejar bordes
  const heroHeight = height > 600 ? height : 600; 

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* ==========================================
            1. HERO SECTION (100% Full Bleed - Sin Marcos)
            ========================================== */}
        <View style={[styles.hero, { width: width, height: heroHeight }]}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2500' }}
            style={StyleSheet.absoluteFillObject}
            contentFit="cover"
          />
          {/* Gradiente más suave para integrar el fondo sin cortes bruscos */}
          <LinearGradient
            colors={['rgba(3, 7, 18, 0.1)', 'rgba(3, 7, 18, 0.5)', '#030712']}
            style={StyleSheet.absoluteFillObject}
          />
          
          <View style={styles.heroContent}>
            <Text style={styles.tag}>MISIÓN ARTEMIS</Text>
            <Text style={styles.title}>Regreso a la Luna</Text>
            <Text style={styles.description}>
              Preparando a la humanidad para el próximo gran salto. Explora cómo estamos construyendo la presencia sostenible en la superficie lunar.
            </Text>
            
            <View style={styles.buttonGroup}>
              <Pressable style={({ pressed }) => [
                styles.primaryButton,
                pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }
              ]}>
                <Text style={styles.buttonText}>DESCUBRIR MÁS</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* ==========================================
            2. DESCUBRIMIENTOS RECIENTES (Grid)
            ========================================== */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Descubrimientos Recientes</Text>
            <Pressable><Text style={styles.viewAll}>Ver catálogo ❯</Text></Pressable>
          </View>

          <View style={[styles.grid, isMobile && styles.gridMobile]}>
            {[
              { id: 1, title: "Análisis de exoplanetas en el sistema Trappist-1", date: "29 MAYO, 2026" },
              { id: 2, title: "El telescopio Webb captura nuevas galaxias", date: "25 MAYO, 2026" },
              { id: 3, title: "Descubrimiento de agua en asteroides cercanos", date: "20 MAYO, 2026" }
            ].map((item) => (
              <Pressable key={item.id} style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}>
                <Image 
                  source={{ uri: `https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&sig=${item.id}` }}
                  style={styles.cardImage}
                />
                <View style={styles.cardBody}>
                  <Text style={styles.cardDate}>{item.date}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* ==========================================
            3. APOD (Imagen Astronómica del Día)
            ========================================== */}
        <View style={[styles.apodSection, isMobile && styles.apodMobile]}>
          <View style={[styles.apodImageContainer, isMobile && { minHeight: 300 }]}>
             <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200' }}
                style={StyleSheet.absoluteFillObject}
                contentFit="cover"
             />
          </View>
          <View style={styles.apodContent}>
            <Text style={styles.tag}>IMAGEN DEL DÍA (APOD)</Text>
            <Text style={styles.apodTitle}>La Nebulosa de Orión</Text>
            <Text style={styles.apodDescription}>
              Ubicada a 1,344 años luz de la Tierra, esta guardería estelar es una de las nebulosas más brillantes visibles a simple vista en el cielo nocturno. Descubre los secretos de la formación de nuevas estrellas.
            </Text>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>LEER ARTÍCULO COMPLETO</Text>
            </Pressable>
          </View>
        </View>

        {/* ==========================================
            4. EXPLORACIÓN (Tarjetas de navegación)
            ========================================== */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom: 40 }]}>Explora el Cosmos</Text>
          <View style={[styles.grid, isMobile && styles.gridMobile]}>
            {['Sistema Solar', 'Misiones Activas', 'Tecnología'].map((cat, index) => (
              <View key={cat} style={styles.categoryCard}>
                <Image 
                  source={{ uri: `https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=600&sig=${index}` }}
                  style={StyleSheet.absoluteFillObject}
                  contentFit="cover"
                />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={StyleSheet.absoluteFillObject} />
                <Text style={styles.categoryTitle}>{cat}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Espaciador inferior para evitar que el contenido pegue al borde del scroll */}
        <View style={{ height: 80 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Base
  wrapper: { flex: 1, backgroundColor: '#030712' },
  container: { flex: 1 },
  
  // Hero Section
  hero: {
    justifyContent: 'center', // Centrado vertical para el texto
    alignItems: 'flex-start', // Alineado a la izquierda
    paddingHorizontal: '8%', // Espaciado lateral fluido
  },
  heroContent: { 
    maxWidth: 800, 
    zIndex: 10,
    backgroundColor: 'transparent', // Eliminamos cualquier fondo fantasma
  },
  tag: { color: '#60A5FA', fontSize: 13, fontWeight: '800', letterSpacing: 3, marginBottom: 16 },
  title: { color: '#FFFFFF', fontSize: Platform.OS === 'web' ? 72 : 48, fontWeight: '900', marginBottom: 24, lineHeight: Platform.OS === 'web' ? 80 : 56 },
  description: { color: '#D1D5DB', fontSize: 20, lineHeight: 32, marginBottom: 40, maxWidth: 650 },
  
  // Botones sin sombras extrañas
  buttonGroup: { flexDirection: 'row' },
  primaryButton: { 
    backgroundColor: '#1D4ED8', // Color sólido para evitar problemas de renderizado de gradientes en web
    paddingVertical: 16, 
    paddingHorizontal: 36, 
    borderRadius: 4, // Bordes menos redondeados, más institucional
  },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 2 },
  
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  secondaryButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', letterSpacing: 1.5 },

  // Secciones Generales
  section: { paddingVertical: 60, paddingHorizontal: '8%', maxWidth: 1600, alignSelf: 'center', width: '100%' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 },
  sectionTitle: { color: '#FFFFFF', fontSize: 36, fontWeight: 'bold' },
  viewAll: { color: '#60A5FA', fontSize: 16, fontWeight: '600' },
  
  // Grid y Cards
  grid: { flexDirection: 'row', gap: 24, flexWrap: 'wrap' },
  gridMobile: { flexDirection: 'column' },
  card: { 
    flex: 1, minWidth: 300, 
    backgroundColor: '#111827', // Sin bordes ni fondos transparentes raros
    borderRadius: 0, // Estilo más crudo/científico
    overflow: 'hidden'
  },
  cardImage: { height: 240, backgroundColor: '#1F2937' },
  cardBody: { padding: 24 },
  cardDate: { color: '#9CA3AF', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  cardTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '600', lineHeight: 30 },

  // APOD Section (Split Screen)
  apodSection: {
    flexDirection: 'row',
    maxWidth: 1600,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 40,
    backgroundColor: '#0F172A'
  },
  apodMobile: { flexDirection: 'column' },
  apodImageContainer: { flex: 1.2, position: 'relative' },
  apodContent: { 
    flex: 1, 
    padding: '8%', 
    justifyContent: 'center' 
  },
  apodTitle: { color: '#FFFFFF', fontSize: 40, fontWeight: 'bold', marginBottom: 20 },
  apodDescription: { color: '#9CA3AF', fontSize: 18, lineHeight: 28, marginBottom: 40 },

  // Exploración Cards
  categoryCard: {
    flex: 1,
    minWidth: 250,
    height: 300,
    justifyContent: 'flex-end',
    padding: 24,
    borderRadius: 8,
    overflow: 'hidden'
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 10
  }
});