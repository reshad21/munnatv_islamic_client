import React from 'react';
import Spinner from '@/components/shared/Spinner';

const loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <Spinner />
    </div>
  );
};

export default loading;
