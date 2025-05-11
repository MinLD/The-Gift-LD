type Props = {
  value?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
};
function InputBox({ value, placeholder, type, name, id }: Props) {
  return (
    <>
      <input
        className="outline-0 pl-2 p-3 w-full bg-[#f5f5f5] rounded-md text-md text-[#8e8e8e]"
        value={value}
        placeholder={placeholder}
        type={type}
        name={name}
        id={id}
      />
    </>
  );
}

export default InputBox;
