type Props = {
  children: React.ReactNode;
};
function layout({ children }: Props) {
  return (
    <>
      {/* header */}

      <div className="bg-[#d42222] w-full h-10">{children}</div>
    </>
  );
}

export default layout;
