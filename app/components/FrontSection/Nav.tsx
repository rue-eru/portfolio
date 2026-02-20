
import { useTranslations } from "next-intl"

export default function Nav () {
    const t = useTranslations('layout.nav-bar')
    const sections = [ 'projects', 'tech', 'about', 'contacts'];


    return (
        <div className={`p-2 flex items-center text-2xl bg-transparent fixed left-0 right-0 top-0 text-set-white
        `}>
            <a className="flex-1 cursor-pointer">
                <p >L</p>
            </a>
            
            <div className="flex-1 flex justify-around">
                {sections.map((name) => (
                    <a 
                        key={name}
                        href={`#${name}`}
                        className="cursor-pointer"
                    >
                        <span>{t(name)}</span>
                    </a>
                ))}
            </div>
        </div>
    )
}