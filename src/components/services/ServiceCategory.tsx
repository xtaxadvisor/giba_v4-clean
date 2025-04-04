import { ServiceItem } from './ServiceItem';
import { LucideIcon } from 'lucide-react';

interface ServiceCategoryProps {
  title: string;
  icon: LucideIcon;
  services: Service[];
}
// Removed invalid line
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {categories.map((category, index) => (
//               <ServiceCategory
//                 key={index}
//                 title={category.title}
//                 icon={category.icon}
//                 services={category.services}
//               />
//             ))}
//           </div>
//         )}

interface Service {
  name: string;
  description?: string;
  price: number;
  features: string[];
  duration?: string;
}
export function ServiceCategory({ title, icon: Icon, services }: ServiceCategoryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
      <div className="flex items-center mb-8">
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="ml-4 text-2xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.name}
            description={service.description || ''}
            price={service.price.toString()}
            features={service.features}
            duration={service.duration}
          />
        ))}
      </div>
    </div>
  );
}