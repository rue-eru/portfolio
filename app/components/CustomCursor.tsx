'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentSize = useRef(32);
  const targetSize = useRef(32);
  const isVisible = useRef(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      
      if (cursorRef.current && isVisible.current) {
        cursorRef.current.style.opacity = '1';
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Hide on links and buttons
      const isLink = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-hide]');
      
      if (isLink) {
        isVisible.current = false;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
        return;
      }
      
      // Make visible again
      if (!isVisible.current) {
        isVisible.current = true;
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '1';
        }
      }
      
      // Big cursor - ADD TORCH EFFECT HERE
      if (target.closest('[data-cursor-big]')) {
        targetSize.current = 150;
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'screen'; // TORCH EFFECT difference/screen
        }
        return;
      }
      
      // Small cursor
      if (target.closest('[data-cursor-small]')) {
        targetSize.current = 16;
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'normal'; // Reset blend mode
        }
        return;
      }
      
      // Default size
      targetSize.current = 32;
      if (cursorRef.current) {
        cursorRef.current.style.mixBlendMode = 'normal'; // Reset blend mode
      }
    };
    
    const handleMouseOut = () => {
      targetSize.current = 32;
      isVisible.current = true;
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
        cursorRef.current.style.mixBlendMode = 'normal'; // Reset blend mode
      }
    };
    
    let animationId: number;
    
    const animate = () => {
      if (!cursorRef.current) return;
      
      // Smooth follow
      currentX.current += (targetX.current - currentX.current) * 0.08;
      currentY.current += (targetY.current - currentY.current) * 0.08;
      
      // Smooth size change
      currentSize.current += (targetSize.current - currentSize.current) * 0.15;
      
      cursorRef.current.style.transform = `translateX(${currentX.current}px) translateY(${currentY.current}px) translateZ(0px)`;
      cursorRef.current.style.width = `${currentSize.current}px`;
      cursorRef.current.style.height = `${currentSize.current}px`;
      
      animationId = requestAnimationFrame(animate);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    animate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        width: '32px',
        height: '32px',
        backgroundColor: '#C0FF00',
        borderRadius: '50%',
        top: '-16px',
        left: '-16px',
        transition: 'width 0.1s linear, height 0.1s linear',
        willChange: 'transform',
      }}
    />
  );
}