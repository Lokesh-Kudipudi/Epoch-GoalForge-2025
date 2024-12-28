"use client";
import { useCustomContext } from "@/contexts/ContextProvider";

function Header() {
  const { initialLoadingAnimation } = useCustomContext();

  return (
    <>
      {!initialLoadingAnimation && (
        <div className="absolute w-screen h-3 text-black py-5 bg-yellow-300 flex items-center justify-center">
          <p>
            Made with{" "}
            <span className="text-red-700 text-2xl">
              &hearts;
            </span>{" "}
            from Team Epoch.
          </p>
        </div>
      )}
    </>
  );
}

export default Header;
