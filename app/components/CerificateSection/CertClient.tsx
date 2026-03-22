'use client'

import { useState } from "react"
import CertNav from "./CertNav";
import CertCard from "./CertCard";

export default function CertClient () {
    const [activeGroup, setActiveGroup] = useState<string | null>(null);

    return(
        <>
            <CertNav activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
            <CertCard activeGroup={activeGroup} />
        </>
    )
}