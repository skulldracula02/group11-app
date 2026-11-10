import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

type PickerMode = 'date' | 'time' | null;

function parseDate(value: string) {
  if (!value) return new Date();
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

function dateValue(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
}

function timeValue(value: Date) {
  return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
}

function todayStart() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export default function BookingDateTimeFields({ date, time, onDateChange, onTimeChange }: Props) {
  const [pickerMode, setPickerMode] = useState<PickerMode>(null);
  const [pickerValue, setPickerValue] = useState(new Date());
  const isIOS = Platform.OS === 'ios';

  function openPicker(mode: Exclude<PickerMode, null>) {
    const value = parseDate(date);
    if (mode === 'time' && time) {
      const [hours, minutes] = time.split(':').map(Number);
      value.setHours(hours, minutes, 0, 0);
    }
    setPickerValue(value);
    setPickerMode(mode);
  }

  function handleChange(event: DateTimePickerEvent, value?: Date) {
    if (event.type === 'dismissed') {
      setPickerMode(null);
      return;
    }
    if (!value || !pickerMode) return;
    setPickerValue(value);
    if (pickerMode === 'date') onDateChange(dateValue(value));
    else onTimeChange(timeValue(value));
    if (!isIOS) setPickerMode(null);
  }

  return (
    <View style={s.container}>
      <View style={s.field}>
        <Text style={s.label}>Booking date</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={date ? `Booking date, ${date}` : 'Choose booking date'} onPress={() => openPicker('date')} style={s.input}>
          <Text style={date ? s.value : s.placeholder}>{date || 'Select a date'}</Text>
          <Text style={s.pickerIcon}>▦</Text>
        </Pressable>
      </View>
      <View style={s.field}>
        <Text style={s.label}>Booking time</Text>
        <Pressable accessibilityRole="button" accessibilityLabel={time ? `Booking time, ${time}` : 'Choose booking time'} onPress={() => openPicker('time')} style={s.input}>
          <Text style={time ? s.value : s.placeholder}>{time || 'Select a time'}</Text>
          <Text style={s.pickerIcon}>◷</Text>
        </Pressable>
      </View>
      {pickerMode ? (
        <View style={s.pickerContainer}>
          <DateTimePicker
            value={pickerValue}
            mode={pickerMode}
            display={isIOS ? 'spinner' : 'default'}
            minimumDate={pickerMode === 'date' ? todayStart() : undefined}
            onChange={handleChange}
          />
          {isIOS ? (
            <Pressable accessibilityRole="button" onPress={() => setPickerMode(null)} style={s.done}>
              <Text style={s.doneText}>Done</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  field: { width: '48%', gap: 6 },
  label: { color: '#3B2A20', fontSize: 14, lineHeight: 20 },
  input: { minHeight: 46, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 6, backgroundColor: '#FFFFFF' },
  value: { color: '#292725', fontSize: 16 },
  placeholder: { color: '#756F66', fontSize: 16 },
  pickerIcon: { color: '#3B2A20', fontSize: 20 },
  pickerContainer: { width: '100%', alignItems: 'center', padding: 8, borderRadius: 8, backgroundColor: '#FFF8E7' },
  done: { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 16 },
  doneText: { color: '#3B2A20', fontSize: 16, fontWeight: '700' },
});
