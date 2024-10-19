'use client'

import { useEffect, useState } from "react"

const ErrorMessage = ({error, clearError}: {error: string, clearError: (err: null | string) => void}) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            // setIsVisible(false)
            clearError(null)
        },1000)

    })

    return (
        <div className="bg-red-200 border-l-red-500 border-l-2 my-2 pl-2">{error}</div>
    )
    
}

export default ErrorMessage