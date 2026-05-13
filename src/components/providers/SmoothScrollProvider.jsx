'use client';
import { usePathname } from 'next/navigation';

import { useRef, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef();
  const pathname = usePathname();

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      {children}
    </ReactLenis>
  );
}
