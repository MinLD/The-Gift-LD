import logo from "../../../public/AVTLoaDing.jpg";
type Props = {
  width?: string;
  height?: string;
  isAVT?: boolean;
};

function LoaddingBox({ width = "5", height = "5", isAVT = true }: Props) {
  return (
    <div>
      {isAVT ? (
        <div className="flex items-center gap-2">
          {/* <span className="text-md animate-pulse">. . .</span> */}
          <img
            src={logo.src}
            alt="logo"
            className="w-[25px] h-[25px] rounded-full animate-spin"
          />
        </div>
      ) : (
        <div
          className={`w-${width} h-${height} h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin`}
        />
      )}
    </div>
  );
}

export default LoaddingBox;
