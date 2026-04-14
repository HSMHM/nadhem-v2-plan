import Icon from './Icon';

export default function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="section-header">
      <h2>
        <Icon name={icon} size="xl" />
        {title}
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
