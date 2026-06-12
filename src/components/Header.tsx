// import { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, Pressable, useWindowDimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { colors } from '../theme/colors';

// export function Header() {
//   const router = useRouter();
//   const { width } = useWindowDimensions();
//   const isMobile = width < 768;
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       // Navega a explore pasando la búsqueda como parámetro en la URL
//       router.push({ pathname: '/explore', params: { q: searchQuery } });
//       setSearchQuery('');
//     }
//   };

//   return (
//     <View style={styles.header}>
//       {/* Izquierda: Menú y Búsqueda */}
//       <View style={styles.leftSection}>
//         <Pressable style={styles.menuButton}>
//           <Text style={styles.menuText}>Explorar <Ionicons name="chevron-down" size={14} /></Text>
//         </Pressable>
//         {!isMobile && (
//           <View style={styles.searchBox}>
//             <Ionicons name="search" size={18} color={colors.textMuted} />
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Buscar misiones, galaxias..."
//               placeholderTextColor={colors.textMuted}
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//               onSubmitEditing={handleSearch}
//               returnKeyType="search"
//             />
//           </View>
//         )}
//       </View>

//       {/* Centro: Logo */}
//       <Pressable onPress={() => router.push('/')} style={styles.centerSection}>
//         <Text style={styles.logoText}>NASA<Text style={styles.logoSub}> APP</Text></Text>
//       </Pressable>

//       {/* Derecha: Enlaces (Escalabilidad) */}
//       <View style={styles.rightSection}>
//         {!isMobile ? (
//           <>
//             <Text style={styles.linkText}>Misiones</Text>
//             <Text style={styles.linkText}>Galería</Text>
//             <Text style={styles.linkText}>TV</Text>
//           </>
//         ) : (
//           <Pressable onPress={() => router.push('/explore')}>
//              <Ionicons name="search" size={24} color={colors.textMain} />
//           </Pressable>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   header: {
//     height: 70, backgroundColor: '#000000', borderBottomWidth: 1, borderBottomColor: '#222',
//     flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20,
//     zIndex: 100, // Asegura que quede por encima del contenido
//   },
//   leftSection: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 15 },
//   menuButton: { flexDirection: 'row', alignItems: 'center' },
//   menuText: { color: colors.textMain, fontSize: 16, fontWeight: '600' },
//   searchBox: {
//     flexDirection: 'row', alignItems: 'center', backgroundColor: '#1A1A1A',
//     borderRadius: 8, paddingHorizontal: 12, height: 40, flex: 1, maxWidth: 300,
//   },
//   searchInput: { flex: 1, color: '#FFF', marginLeft: 8, outlineStyle: 'none' },
//   centerSection: { flex: 1, alignItems: 'center' },
//   logoText: { color: '#E03C31', fontSize: 28, fontWeight: '900', letterSpacing: 2 }, // Rojo NASA
//   logoSub: { color: '#FFFFFF', fontWeight: '300' },
//   rightSection: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end', gap: 20 },
//   linkText: { color: colors.textMain, fontSize: 14, fontWeight: '500' },
// });