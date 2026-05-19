export default function SelectField({ label, id, options = [], ...props }) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>}
      <select
        id={id}
        className="w-full border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-blue-600 transition-all text-sm bg-white"
        {...props}
      >
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
