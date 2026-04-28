// components/SimpleCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function SimpleCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const currentSize = useRef(40);
  const targetSize = useRef(40);
  const currentColor = useRef('#C0FF00');
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };
    
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Hide on links
      if (target.closest('a, button')) {
        if (cursorRef.current) {
          cursorRef.current.style.opacity = '0';
        }
        return;
      }
      
      // Big cursor on hover
      if (target.closest('[data-cursor-big]')) {
        targetSize.current = 300;
        currentColor.current = '#C0FF00';
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'difference';
        }
      } else {
        targetSize.current = 32;
        currentColor.current = '#C0FF00';
        if (cursorRef.current) {
          cursorRef.current.style.mixBlendMode = 'normal';
        }
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };
    
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
      cursorRef.current.style.backgroundColor = currentColor.current;
      
      requestAnimationFrame(animate);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleElementHover);
    animate();
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleElementHover);
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
        transition: 'width 0.1s ease-out, height 0.1s ease-out',
      }}
    />
  );
}