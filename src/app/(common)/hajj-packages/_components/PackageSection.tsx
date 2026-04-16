import React from 'react';
import PackageCard from './PackageCard';
import { PackageApi } from '@/types/package.interface';


const PackageSection = ({ packages = [] }: { packages: PackageApi[] }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.length === 0 ? (
                <div className="col-span-full py-4 text-center text-gray-500">
                    No data found
                </div>
            ) : (
                packages.map((item) => (
                    <PackageCard key={item.id} {...item} />
                ))
            )}
        </div>
    );
};

export default PackageSection;