export default function Button({
  type,
  children,
  className = "",
  onClick = null,
  mode,
  disabled = false,
}) {
  const additionalClasses = className
    ? className.toString().replace(",", " ")
    : "";

  return (
    <button
      onClick={onClick}
      className={mode === 'custom' ? `${additionalClasses}` : `bg-red-700 text-white p-2 rounded-md w-full ${additionalClasses}`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
