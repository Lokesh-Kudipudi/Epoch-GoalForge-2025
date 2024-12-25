function TextBox({ value, setValue }) {
  return (
    <textarea
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
      className="bg-[#222630] px-4 py-3 mt-4 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
      name="text"
      placeholder="Enter your New year Resolutions"
      type="text"
    />
  );
}

export default TextBox;
