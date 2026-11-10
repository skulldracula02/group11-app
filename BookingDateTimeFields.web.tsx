import { createElement, type ChangeEvent, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

function localDateValue() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export default function BookingDateTimeFields({ date, time, onDateChange, onTimeChange }: Props) {
  const minDate = useMemo(localDateValue, []);
  const inputStyle = {
    boxSizing: 'border-box',
    width: '100%',
    minHeight: 46,
    padding: '10px 11px',
    border: 'none',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    color: '#292725',
    fontFamily: 'inherit',
    fontSize: 16,
  } as const;

  return (
    <View style={s.container}>
      <View style={s.field}>
        <Text style={s.label}>Booking date</Text>
        {createElement('input', {
          type: 'date',
          'aria-label': 'Booking date',
          value: date,
          min: minDate,
          onChange: (event: ChangeEvent<HTMLInputElement>) => onDateChange(event.target.value),
          style: inputStyle,
        })}
      </View>
      <View style={s.field}>
        <Text style={s.label}>Booking time</Text>
        {createElement('input', {
          type: 'time',
          'aria-label': 'Booking time',
          value: time,
          onChange: (event: ChangeEvent<HTMLInputElement>) => onTimeChange(event.target.value),
          style: inputStyle,
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  field: { width: '48%', gap: 6 },
  label: { color: '#3B2A20', fontSize: 14, lineHeight: 20 },
});
