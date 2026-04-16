import React from 'react';
import HeroSection from '../_components/HeroSection';
import PackageHeader from './_components/PackageHeader';
import PackageSection from './_components/PackageSection';
import { TQuery } from '@/types/query.types';
import { getPackages } from '@/services/package';

const HajjPackagepage = async (props: {
    searchParams: Promise<{ search: string; page: string }>;
}) => {
    const searchParams = await props.searchParams;
    const search = searchParams.search || "";
    const page = parseInt(searchParams.page) || 1;
    const query: TQuery[] = [
        {
            key: "orderBy",
            value: JSON.stringify({
                createdAt: "desc",
            }),
        },
        {
            key: "searchTerm",
            value: search,
        },
        {
            key: "page",
            value: page.toString(),
        },
        {
            key: "limit",
            value: "10",
        },
    ];
    const packages = await getPackages(query);
    return (
        <div>
            <HeroSection title="Package" subtitle="Package" />
            <PackageHeader />
            <PackageSection packages={packages?.data?.data} />
        </div>
    );
};

export default HajjPackagepage;