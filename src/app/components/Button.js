export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
