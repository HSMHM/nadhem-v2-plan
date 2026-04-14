export default function ProgressBar({ value, color }) {
  const barColor = color || (value >= 80 ? 'var(--color-success)' : value >= 40 ? 'var(--color-warning)' : 'var(--color-danger)');
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${value}%`, background: barColor }}
      />
    </div>
  );
}
