import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 animate-pulse">
            {/* Image Skeleton */}
            <div className="relative aspect-square overflow-hidden bg-gray-200" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-5 bg-gray-200 rounded w-3/4" />

                {/* Price and Icon */}
                <div className="flex items-center justify-between pt-1">
                    <div className="h-8 bg-gray-200 rounded w-1/3" />
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
