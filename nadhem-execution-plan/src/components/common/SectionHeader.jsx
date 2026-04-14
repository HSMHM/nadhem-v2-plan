export default function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="section-hdr">
      <h2>
        <i className={`fa-thin fa-${icon} fa-xl`} aria-hidden="true" />
        {title}
      </h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
