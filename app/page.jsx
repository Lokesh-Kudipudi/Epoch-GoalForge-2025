"use client";
import React, { useState } from "react";
import { Preloader } from "@/components/preloader/Preloader";
import { Hero } from "@/components/hero/Hero";
import { useCustomContext } from "@/contexts/ContextProvider";

function App() {
  const {
    initialLoadingAnimation,
    setInitialLoadingAnimation,
    user,
  } = useCustomContext();

  return (
    <>
      {initialLoadingAnimation && (
        <Preloader
          onLoadingComplete={() =>
            setInitialLoadingAnimation(false)
          }
        />
      )}
      {!initialLoadingAnimation && <Hero></Hero>}
    </>
  );
}

export default App;
