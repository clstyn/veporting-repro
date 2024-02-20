export default function Button({ type, children }) {
  return <button className="bg-red-700 text-white p-2 rounded-md w-full" type={type}>{children}</button>;
}