import type { ReactNode } from "react";

export type Direction = 'top' | 'bottom' | 'left' | 'right';
export type CourseKey = 'html-css' | 'js' | 'libraries';

export interface PositionProps {
  x?: number;
  y?: number;
} 

export interface SlideInProps {
  children: ReactNode | ReactNode[];
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number
}

export interface LetterByLetterProps {
  text: string;
  className?: string;
  direction?: Direction;
  staggerDelay?: number;
  distance?: number
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  links: {
    github?: string;
    demo?: string;
    [key: string]: string | undefined;
  };
  image: string;
}

export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tech: string;
    links: Partial<Record<'github' | 'demo' | 'fcc', string>>;
    image: string;
  };
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export interface ListCardProps {
  tool: {
    id: string;
    title: string;
    icon: string;
  };
  index: number;
  imgClassName?: string;
  liClassName?: string;
  isHovered: boolean;
  onHover: (index: number | null) => void;
}

export interface FactsGameProps {
  showPrize: boolean;
  resetGame: () => void;
  currentFact: {
    id: string;
    description: string;
    achievement: string;
  };
  pulledFacts: number[];
  totalFacts: number;
  pullRandomFact: () => void;
  gameComplete: boolean;
  photo: string;
  startScreen: boolean;
  setStartScreen: (v: boolean) => void;
  keyJump: boolean;
}

export interface AchievementDisplayProps {
  currentAchievement: string;
}

export interface LightboxProps {
  onClose: () => void;

  cert?: any;
  imageIndex?: Record<string, number>
  setImageIndex?: React.Dispatch<React.SetStateAction<Record<string, number>>>;

  images?: {
    src: string;
    cert: any;
  }[];
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
}


export interface ImageArrowsProps {
  cert?: any;
  className: string;
  setImageIndex?: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  onClose?: () => void;

  images?: {
    src: string;
    cert: any;
  }[];
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export interface CertNavProps {
  activeGroup: string | null;
  setActiveGroup: (group: string | null) => void;
}

export interface CertCardProps {
  activeGroup: string | null;
}

export interface SectionIntroProps {
  t1: string;
  t2: string;
  id: string;
}

export interface ExpandCollapseProps {
  isOpen: boolean;
  children: React.ReactNode;
  componentKey?: string,
  className?: string
}

export interface ShowMoreBtnProps {
  btnName: CourseKey;
  isOpen: CourseKey | null;
  setIsOpen: (btn: CourseKey | null) => void;
  title?: string;
  iconPath?: string;
  titles?: Record<CourseKey, string>;
}