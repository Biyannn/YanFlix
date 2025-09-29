function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#3D4142] hover:bg-white hover:text-black text-white py-3 px-5 rounded-xl transition duration-200 text-sm sm:text-base"
    >
      {text}
    </button>
  );
}
export default Button;
