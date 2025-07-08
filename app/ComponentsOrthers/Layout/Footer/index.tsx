function FooterOrthers() {
  const data = [
    {
      id: 2,
      name: "Privacy policy",
    },
  ];
  return (
    <div className="mx-auto w-[92vw] lg:w-[75vw] xl:w-[80vw] mt-20">
      <div className="border-t border-gray-300 ">
        <div className="flex gap-4 items-center py-3 ">
          {data.map((item) => (
            <div key={item.id} className=" text-[16px] text-[#1773b0]">
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterOrthers;
