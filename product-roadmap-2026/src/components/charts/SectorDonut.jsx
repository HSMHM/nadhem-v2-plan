import { ResponsivePie } from '@nivo/pie';
import { chartColors } from './chartTheme';

const data = [
  { id: 'غير ربحي', label: 'غير ربحي', value: 80, color: chartColors.sectors['غير ربحي'] },
  { id: 'حكومي', label: 'حكومي', value: 20, color: chartColors.sectors['حكومي'] },
  { id: 'قطاع خاص', label: 'قطاع خاص', value: 0, color: chartColors.sectors['قطاع خاص'] },
];

export default function SectorDonut({ dark = false }) {
  return (
    <div style={{ height: 280, direction: 'ltr' }}>
      <ResponsivePie
        data={data.filter((d) => d.value > 0)}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={4}
        colors={(d) => d.data.color}
        borderWidth={0}
        enableArcLinkLabels={true}
        arcLinkLabelsColor={dark ? 'rgba(255,255,255,0.5)' : '#4A5568'}
        arcLinkLabelsTextColor={dark ? 'rgba(255,255,255,0.7)' : '#4A5568'}
        arcLinkLabelsThickness={1}
        arcLabelsTextColor="#fff"
        arcLabel={(d) => `${d.value}%`}
        tooltip={({ datum }) => (
          <div style={{
            background: dark ? 'rgba(26,11,34,0.95)' : '#fff',
            padding: '8px 12px',
            borderRadius: 8,
            color: dark ? '#fff' : '#1A1120',
            fontFamily: 'IBM Plex Sans Arabic',
            direction: 'rtl',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}>
            {datum.label}: {datum.value}%
          </div>
        )}
      />
      <div style={{
        textAlign: 'center',
        marginTop: -8,
        color: dark ? 'rgba(255,255,255,0.4)' : 'var(--color-text-muted)',
        fontSize: '0.75rem',
        direction: 'rtl',
      }}>
        قطاع خاص: 0%
      </div>
    </div>
  );
}
