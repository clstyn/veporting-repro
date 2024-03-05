export default function Button({
  type,
  children,
  className = "",
  onClick = null,
  mode,
}) {
  const additionalClasses = className
    ? className.toString().replace(",", " ")
    : "";

  return (
    <button
      onClick={onClick}
      className={mode === 'custom' ? `${additionalClasses}` : `bg-red-700 text-white p-2 rounded-md w-full ${additionalClasses}`}
      type={type}
    >
      {children}
    </button>
  );
}
