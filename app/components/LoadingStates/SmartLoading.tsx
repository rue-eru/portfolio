'use client'

import { usePathname } from "@/i18n/navigation"
import FirstLoad from "./FirstLoad";

export default function SmartLoading () {

    const pathname = usePathname();

    // splitting and ignoring locale
    const  pages = pathname.split('/').filter(page => 
        page && page !== 'en' &&
        page !== 'ru' &&
        page !== 'ja'
    )

    const getState = () => {

        if (pages.length === 0) {
            return <FirstLoad />
        }
        
        return
    }

    return (
        <>
            {getState()}
        </>
    )
}