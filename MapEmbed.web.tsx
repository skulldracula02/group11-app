import { createElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type MapEmbedProps = {
  address: string;
  directionsUrl: string | null;
  onOpenDirections: () => void;
};

export default function MapEmbed({ address, directionsUrl, onOpenDirections }: MapEmbedProps) {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  return (
    <View style={s.container}>
      <Text accessibilityRole="header" style={s.heading}>Our location</Text>
      <View style={s.mapFrame}>
        {createElement('iframe', {
          title: `Map showing ${address}`,
          src: embedUrl,
          loading: 'lazy',
          referrerPolicy: 'no-referrer-when-downgrade',
          allowFullScreen: true,
          style: { width: '100%', height: '100%', border: 0 },
        })}
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
  mapFrame: { width: '100%', height: 280, overflow: 'hidden', borderRadius: 14, backgroundColor: '#EAF0DB' },
  directions: { minHeight: 44, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14, borderRadius: 8, backgroundColor: '#3B2A20' },
  directionsText: { color: '#FFFFFF', fontSize: 14, lineHeight: 20, fontWeight: '700' },
  pressed: { opacity: 0.75 },
  disabled: { opacity: 0.5 },
});
