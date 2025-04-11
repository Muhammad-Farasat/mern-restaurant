import React from 'react'

function SkeletonCard() {
    return (
        <div className="bg-white rounded-md p-4 shadow animate-pulse">
            <div className="bg-gray-300 h-32 w-full mb-4 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

    )
}

export default SkeletonCard