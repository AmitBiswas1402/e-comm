'use client'

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useBasketStore from "@/store/store"

function SuccessPage() {
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get("orderNumber");
    const clear = useBasketStore((state) => state.clearBasket)

    useEffect(() => {

    }, [])
}

export default SuccessPage;