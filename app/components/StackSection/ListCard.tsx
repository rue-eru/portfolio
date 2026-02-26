import type { ListCardProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import Image from "next/image";

export default function ListCard({tool, index, imgClassName, hideTitle, liClassName, isHovered, onHover } : ListCardProps){
    return(
        <li 
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
            className={`${liClassName}
                ${isHovered
                    ? styles.liHover
                    : ''
                }
            `}
            key={`${tool.id}-${index}`}
        >
            <Image 
                src={tool.icon}
                alt={tool.id}
                className={`${imgClassName} h-10 object-contain`}
                loading="lazy"
                height={100}
                width={100}
            />
            {!hideTitle && <p>{tool.title}</p>} 
        </li>
    )
}

//sr-only ?for hidetitle