// import { View, Text, StyleSheet } from 'react-native';
// import { Image } from 'expo-image';
// import { colors } from '../theme/colors';

// // Definimos la estructura de datos que esperamos de la API
// interface SpaceCardProps {
//   title: string;
//   url: string;
//   date: string;
// }

// export function SpaceCard({ title, url, date }: SpaceCardProps) {
//   return (
//     <View style={styles.card}>
//       <Image 
//         source={url} 
//         style={styles.image} 
//         contentFit="cover"
//         transition={500} // Animación suave al cargar la imagen
//       />
//       <View style={styles.content}>
//         <Text style={styles.date}>{date}</Text>
//         <Text style={styles.title} numberOfLines={2}>{title}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: colors.surface,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: colors.surfaceBorder,
//     overflow: 'hidden',
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     backgroundColor: '#0B081A', // Fondo oscuro mientras carga
//   },
//   content: {
//     padding: 16,
//   },
//   date: {
//     color: colors.primaryLight,
//     fontSize: 12,
//     fontWeight: '600',
//     marginBottom: 6,
//     textTransform: 'uppercase',
//   },
//   title: {
//     color: colors.textMain,
//     fontSize: 20,
//     fontWeight: 'bold',
//     lineHeight: 28,
//   },
// });