'use client'

import Image from "next/image";
import { Float } from "../animations/Float";
import { styles } from "@/app/utils/styles";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import type { ShowMoreBtnProps } from "@/app/utils/interfaces";

export default function ShowMoreBtn({
  btnName,
  isOpen,
  setIsOpen,
  title,
  iconPath,
}: ShowMoreBtnProps) {
  
  const { isEn } = useCurrentLanguage();

  const legacyTitles: Record<string, string> = {
    'html-css': 'Responsive Web Design',
    'js': 'JavaScript Algorithms and Data Structures',
    'libraries': 'Front-End Libraries'
  };

  const displayTitle = title || legacyTitles[btnName] || btnName;
  const displayIcon = iconPath || `/images/icons/${btnName}.png`;

  return (
    <Float key={btnName}>
      <button
        className={`bg-gray-600 cursor-pointer inline-flex md:justify-center justify-start items-center gap-2 p-2 rounded transition-all xs:w-94 w-70 md:w-full hover:outline-set-accent hover:outline-3 hover:text-set-accent
          ${isOpen === btnName ? 'bg-set-accent text-gray-600 transition-colors hover:text-set-black outline-none' : ''}
          ${styles.containerShadow}
        `}
        onClick={() => setIsOpen(isOpen === btnName ? null : btnName)}
      >
        <Image
          src={displayIcon}
          alt={btnName}
          width={40}
          height={40}
          className='object-contain'
          loading='lazy'
        />
        <span className={`${isEn ? 'text-xl' : 'text-sm'}`}>{displayTitle}</span>
      </button>
    </Float>
  );
}