function InputField({
  label,
  type = "text",
  placeholder,
  name,
  onChange,
  value,
  readOnly,
  defaultValue,
}) {
  const commonProps = {
    type,
    placeholder,
    name,
    onChange,
    readOnly,
    defaultValue,
    className:
      "w-full px-4 py-2 rounded-xl bg-[#2b2b2b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-sm sm:text-base",
  };

  return (
    <div className="py-1">
      <label className="block text-white text-sm mb-1">{label}</label>
      {value !== undefined ? (
        <input {...commonProps} value={value} />
      ) : (
        <input {...commonProps} />
      )}
    </div>
  );
}
export default InputField;
