import Icon from './Icon';

const statusConfig = {
  completed: { label: 'مكتملة', icon: 'circle-check', className: 'badge-success' },
  medium: { label: 'متوسطة', icon: 'circle-half-stroke', className: 'badge-warning' },
  inactive: { label: 'غير مفعلة', icon: 'circle-xmark', className: 'badge-danger' },
  new: { label: 'جديد', icon: 'sparkles', className: 'badge-success' },
  existing: { label: 'موجود', icon: 'circle-check', className: 'badge-info' },
  high: { label: 'عالية', icon: 'arrow-up', className: 'badge-danger' },
  low: { label: 'منخفضة', icon: 'arrow-down', className: 'badge-info' },
};

export default function Badge({ status, label }) {
  const config = statusConfig[status] || statusConfig.existing;
  return (
    <span className={`badge ${config.className}`}>
      <Icon name={config.icon} size="xs" />
      {label || config.label}
    </span>
  );
}
