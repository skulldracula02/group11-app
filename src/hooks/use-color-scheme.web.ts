import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * On web, default to light during static rendering and use the native color scheme once hydrated.
 */
export function useColorScheme() {
  const colorScheme = useRNColorScheme();
  return colorScheme ?? 'light';
}
