'use client'

import { usePathname } from "@/i18n/navigation"

export default function SmartLoading () {

    const pathname = usePathname();

    // splitting and ignoring locale
    const  pages = pathname.split('/').filter(page => 
        page && page !== 'en' &&
        page !== 'ru' &&
        page !== 'ja'
    )

    const getState = () => {

        
        return
    }

    return (
        <>
            {getState()}
        </>
    )
}