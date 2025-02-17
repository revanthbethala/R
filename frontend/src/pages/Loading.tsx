import { logo } from "@/data";

function Loading() {
  return (
    <div className={`h-screen flex flex-col items-center justify-center `}>
      <img
        src={logo}
        alt="Logo"
        className="w-16 h-16 md:w-20 md:h-20 animate-spin"
      />
      <h3 className="font-bold text-2xl tracking-wide">Loading...</h3>
    </div>
  );
}

export default Loading;
