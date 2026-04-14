import { ResponsiveRadar } from '@nivo/radar';
import { satisfactionMetrics } from '../../data/satisfactionData';

const data = satisfactionMetrics.map((m) => ({
  metric: m.label,
  value: m.value,
}));

export default function SatisfactionRadar() {
  return (
    <div style={{ height: 350, direction: 'ltr' }}>
      <ResponsiveRadar
        data={data}
        keys={['value']}
        indexBy="metric"
        maxValue={100}
        margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        borderColor="#2A848A"
        borderWidth={2}
        gridLabelOffset={20}
        gridShape="circular"
        gridLevels={5}
        dotSize={8}
        dotColor="#2A848A"
        dotBorderWidth={2}
        dotBorderColor="#fff"
        colors={['rgba(42, 132, 138, 0.3)']}
        fillOpacity={0.4}
        blendMode="normal"
        theme={{
          text: {
            fontFamily: 'IBM Plex Sans Arabic',
            fontSize: 12,
          },
          grid: {
            line: { stroke: '#E2E8F0' },
          },
        }}
        tooltip={({ index, value }) => (
          <div style={{
            background: '#fff',
            padding: '8px 12px',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontFamily: 'IBM Plex Sans Arabic',
            direction: 'rtl',
          }}>
            {index}: {value}%
          </div>
        )}
      />
    </div>
  );
}
