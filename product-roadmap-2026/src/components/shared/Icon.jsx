export default function Icon({ name, className = '', size = '', style = {} }) {
  const sizeClass = size ? `fa-${size}` : '';
  return (
    <i
      className={`fa-thin fa-${name} ${sizeClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}
