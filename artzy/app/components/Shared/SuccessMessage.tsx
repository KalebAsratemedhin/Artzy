'use client'

import { useEffect, useState } from "react"

const SuccessMessage = ({successMessage, clearSuccessMessage}: {successMessage: string, clearSuccessMessage: () => void}) => {

    useEffect(() => {
        setTimeout(() => {
            clearSuccessMessage()
        },1000)

    })

    return (
        <div className="bg-green-200 border-l-green-500 border-l-2 my-2 pl-2">{successMessage}</div>
    )
    
}

export default SuccessMessage