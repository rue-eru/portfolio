import type { ListCardProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import Image from "next/image";

export default function ListCard({tool, index, imgClassName, hideTitle } : ListCardProps){

    return(
        <li 
            className={styles.liStyle}
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
            {!hideTitle && <p className="text-lg">{tool.title}</p>}
        </li>
    )
}