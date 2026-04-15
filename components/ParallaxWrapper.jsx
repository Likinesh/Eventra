"use client";
import { useEffect, useRef } from "react";

export default function ParallaxWrapper({ children }) {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;

    const handleMouseMove = (e) => {
      const x = (window.innerWidth / 2 - e.clientX) / 50;
      const y = (window.innerHeight / 2 - e.clientY) / 50;

      el.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}