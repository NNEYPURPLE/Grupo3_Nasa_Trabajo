// import { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, ActivityIndicator, useWindowDimensions } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { Image } from 'expo-image';
// import { colors } from '../theme/colors';
// import { NASA_SERVICES } from '../services/nasaApi';

// export default function ExploreScreen() {
//   const { q } = useLocalSearchParams(); // Atrapa la búsqueda del Header
//   const { width } = useWindowDimensions();
//   const numColumns = width > 1024 ? 4 : width > 768 ? 3 : 2;

//   const [data, setData] = useState<any[]>([]);
//   const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'empty'>('loading');
//   const [errorMsg, setErrorMsg] = useState('');

//   useEffect(() => {
//     const query = (q as string) || 'galaxy'; // Búsqueda por defecto
//     fetchData(query);
//   }, [q]);

//   const fetchData = async (query: string) => {
//     setStatus('loading');
//     try {
//       const response = await NASA_SERVICES.search(query);
//       const items = response.collection.items.slice(0, 24).map((item: any) => ({
//         id: item.data[0].nasa_id,
//         title: item.data[0].title,
//         url: item.links?.[0]?.href,
//       }));

//       if (items.length === 0) {
//         setStatus('empty');
//       } else {
//         setData(items);
//         setStatus('success');
//       }
//     } catch (error: any) {
//       setErrorMsg(error.message);
//       setStatus('error');
//     }
//   };

//   // RENDERIZADOS CONDICIONALES DE ESTADO
//   if (status === 'loading') return (
//     <View style={styles.center}><ActivityIndicator size="large" color="#E03C31" /></View>
//   );

//   if (status === 'error') return (
//     <View style={styles.center}>
//       <Text style={styles.errorText}>Error de conexión: {errorMsg}</Text>
//     </View>
//   );

//   if (status === 'empty') return (
//     <View style={styles.center}>
//       <Text style={styles.emptyText}>No se encontraron resultados para "{q}"</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Resultados de Exploración</Text>
//       <FlatList
//         key={numColumns}
//         data={data}
//         numColumns={numColumns}
//         keyExtractor={(item, index) => `${item.id}-${index}`}
//         contentContainerStyle={styles.grid}
//         columnWrapperStyle={styles.row}
//         renderItem={({ item }) => (
//           <View style={[styles.cardContainer, { flex: 1 / numColumns }]}>
//             <View style={styles.card}>
//               <Image source={{ uri: item.url }} style={styles.image} contentFit="cover" />
//               <View style={styles.overlay}>
//                 <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: colors.background, padding: 20 },
//   center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
//   errorText: { color: '#E03C31', fontSize: 16 },
//   emptyText: { color: '#FFF', fontSize: 18 },
//   title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   grid: { paddingBottom: 40 },
//   row: { gap: 15 },
//   cardContainer: { paddingBottom: 15 },
//   card: { flex: 1, height: 200, backgroundColor: '#111', borderRadius: 8, overflow: 'hidden' },
//   image: { width: '100%', height: '100%' },
//   overlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', padding: 10 },
//   cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
// });