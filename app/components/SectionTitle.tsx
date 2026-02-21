import { useTranslations } from "next-intl"
import SlideIn from "./animations/SlideIn"

export default function SectionTitle ( {title} : {title: string}) {
    const t = useTranslations('layout.nav-bar')
    //fix delay to start at window in screen
    return (
        <SlideIn
            direction="right" 
            duration={1} 
            distance={20} 
            delay={1.5}
            className="absolute right-8 py-8 hidden"
        >
            <h1 className="text-set-black text-5xl">{t(title)}</h1>
        </SlideIn>
    )
}