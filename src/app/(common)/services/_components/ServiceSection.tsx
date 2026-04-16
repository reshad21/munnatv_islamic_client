import React from 'react'
import ServiceCard from './ServiceCard'

interface Service {
  id: string;
  image: string;
  title: string;
  shortDescription?: string;
  description?: string;
  createdAt: string;
  status: boolean;
}

const ServiceSection = ({ servicesData = [] }: { servicesData: Service[] }) => {
  return (
    <div className='max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
      {servicesData.length === 0 ? (
        <div className="col-span-full py-8 text-center text-gray-500">
          No data found
        </div>
      ) : (
        servicesData.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))
      )}
    </div>
  )
}

export default ServiceSection