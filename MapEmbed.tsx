import { Pressable, StyleSheet, Text, View } from 'react-native';

type MapEmbedProps = {
  address: string;
  directionsUrl: string | null;
  onOpenDirections: () => void;
};

export default function MapEmbed({ address, directionsUrl, onOpenDirections }: MapEmbedProps) {
  return (
    <View style={s.container}>
      <Text accessibilityRole="header" style={s.heading}>Our location</Text>
      <View style={s.mapCard}>
        <Text style={s.pin}>⌖</Text>
        <Text style={s.address}>{address}</Text>
        <Text style={s.hint}>Open the map to view the location and get directions.</Text>
      </View>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Open directions to ${address} in Google Maps`}
        disabled={!directionsUrl}
        onPress={onOpenDirections}
        style={({ pressed }) => [s.directions, pressed && s.pressed, !directionsUrl && s.disabled]}>
        <Text style={s.directionsText}>Open directions in Google Maps</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { gap: 8 },
  heading: { color: '#3B2A20', fontSize: 17, lineHeight: 23, fontWeight: '700' },
  mapCard: { minHeight: 200, padding: 22, justifyContent: 'center', alignItems: 'center', gap: 10, borderRadius: 14, backgroundColor: '#EAF0DB' },
  pin: { color: '#E24D3E', fontSize: 36 },
  address: { color: '#3B2A20', fontSize: 15, lineHeight: 21, fontWeight: '700', textAlign: 'center' },
  hint: { color: '#3B2A20', fontSize: 13, lineHeight: 18, textAlign: 'center' },
  directions: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#3B2A20' },
  directionsText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontWeight: '700' },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.5 },
});
