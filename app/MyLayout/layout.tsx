type Props = {
  children: React.ReactNode;
};
function MyLayOut({ children }: Props) {
  return (
    <div className="flex justify-center">
      <div className="mx-auto w-[92vw] lg:w-[85vw] xl:w-[90vw]">{children}</div>
    </div>
  );
}

export default MyLayOut;
