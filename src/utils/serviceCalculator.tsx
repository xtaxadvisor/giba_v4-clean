import React, { useState } from 'react';

export interface ServiceRequest {
  discountCode: any;
  type: ServiceTypes;
  hours: number;
  serviceType: string;
  duration: number;
  quantity?: number; // Added quantity property
  discountAmount?: number;
  discountPercentage?: number;
}

export enum ServiceTypes {
  TAX_PLANNING = 'Tax Planning',
  FINANCIAL_REVIEW = 'Financial Review',
  BUSINESS_CONSULTING = 'Business Consulting',
  TAX_PREPARATION = 'Tax Preparation',
  INVESTMENT_ADVISORY = 'Investment Advisory',
  AUDIT = "AUDIT",
}
// Removed duplicate local declaration of ServiceRequest
export const ServiceTypesList = Object.values(ServiceTypes);
export const ServiceTypesListWithAddons = [
  ...ServiceTypesList,
  'Tax Planning with Addons',
  'Consultation with Addons',
  'Audit with Addons',
];
export const ServiceTypesListWithAddonsAndDiscounts = [
  ...ServiceTypesListWithAddons,
  'Tax Planning with Discounts',
  'Consultation with Discounts',
  'Audit with Discounts',
];
export const ServiceTypesListWithDiscounts = [
  ...ServiceTypesList,
  'Tax Planning with Discounts',
  'Consultation with Discounts',
  'Audit with Discounts',
];
export const ServiceTypesListWithDiscountsAndAddons = [         
  ...ServiceTypesListWithDiscounts,
  'Tax Planning with Addons and Discounts',
  'Consultation with Addons and Discounts',
  'Audit with Addons and Discounts',
];
export const ServiceTypesListWithDiscountsAndAddonsAndQuantity = [
  ...ServiceTypesListWithDiscountsAndAddons,
  'Tax Planning with Addons and Discounts and Quantity',
  'Consultation with Addons and Discounts and Quantity',
  'Audit with Addons and Discounts and Quantity',
];
export const ServiceTypesListWithDiscountsAndAddonsAndQuantityAndHours = [
  ...ServiceTypesListWithDiscountsAndAddonsAndQuantity,
  'Tax Planning with Addons and Discounts and Quantity and Hours',
  'Consultation with Addons and Discounts and Quantity and Hours',
  'Audit with Addons and Discounts and Quantity and Hours',
];
export const ServiceTypesListWithDiscountsAndAddonsAndQuantityAndHoursAndDiscountCode = [
  ...ServiceTypesListWithDiscountsAndAddonsAndQuantityAndHours,
  'Tax Planning with Addons and Discounts and Quantity and Hours and Discount Code',
  'Consultation with Addons and Discounts and Quantity and Hours and Discount Code',
  'Audit with Addons and Discounts and Quantity and Hours and Discount Code',
];
export const ServiceTypesListWithDiscountsAndAddonsAndQuantityAndHoursAndDiscountCodeAndDiscountAmount = [
  ...ServiceTypesListWithDiscountsAndAddonsAndQuantityAndHoursAndDiscountCode,
  'Tax Planning with Addons and Discounts and Quantity and Hours and Discount Code and Discount Amount',
  'Consultation with Addons and Discounts and Quantity and Hours and Discount Code and Discount Amount',
  'Audit with Addons and Discounts and Quantity and Hours and Discount Code and Discount Amount',
];

type CalculationResult = {
  totalCost: number;
  breakdown?: { [key: string]: number };
};

export function calculateServicesCost(serviceRequests: ServiceRequest[]): number { 
  // Example service costs
  const serviceCosts: { [key: string]: number } = {
    'Tax Planning': 200,
    'Consultation': 150,
    'Audit': 300,
  };
  const serviceType = serviceRequests[0]?.serviceType || 'Tax Planning';
  const duration = serviceRequests[0]?.duration || 60;
  const hours = serviceRequests[0]?.hours || 1;
  // Logic to calculate cost based on an array of serviceRequests
  return serviceRequests.reduce((total, serviceRequest) => {
    // Add logic for each serviceRequest
    return total + 0; // Replace with actual calculation logic
  }, 0);

  const baseCost = serviceCosts[serviceType] || 0;
  let totalCost = baseCost * (duration / 60);

if (hours > 0) {  
  totalCost = baseCost * hours;
  } else {  
    totalCost = baseCost;
  } 
  return totalCost; 
  } 
// Example calculation logic
// This is a placeholder for the actual calculation logic
// You can replace this with your own logic to calculate the cost based on the service requests
// For example, you can use the serviceType and duration to calculate the cost
// based on your business logic
// You can also add logic to handle addons, discounts, etc.
// Example calculation logic
// This is a placeholder for the actual calculation logic
// You can replace this with your own logic to calculate the cost based on the service requests
// For example, you can use the serviceType and duration to calculate the cost
// based on your business logic
// You can also add logic to handle addons, discounts, etc.
   

function calculateServicesCostImpl(services: ServiceRequest[]): CalculationResult {
  const totalCost = services.reduce((sum, service) => {
    const serviceCosts: { [key: string]: number } = {
      'Tax Planning': 100,
      'Consultation': 150,
      'Audit': 200,
    };
    const baseCost = serviceCosts[service.serviceType] || 0;
    let cost = baseCost * ((service.duration ?? 0) / 60);
    if (service.discountCode) {
      cost -= service.discountAmount || (cost * (service.discountPercentage || 0) / 100);
    }
    return sum + cost;
  }, 0);

  return { totalCost };
}

export default function ServiceCostCalculator() {
  const [serviceSelections, setServiceSelections] = useState<ServiceRequest>({
    type: ServiceTypes.TAX_PLANNING,
    serviceType: 'Tax Planning',
    hours: 1,
    duration: 60,
    discountCode: '',
    discountAmount: 0,
    discountPercentage: 0,
  });
  const [serviceType, setServiceType] = useState<ServiceTypes>(ServiceTypes.TAX_PLANNING);
  const [duration, setDuration] = useState<number>(60);
  const [addons, setAddons] = useState<{ type: string; price: number; quantity?: number }[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [isDebug, setIsDebug] = useState(false);
  const [isTrace, setIsTrace] = useState(false);
  const [isCritical, setIsCritical] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [isPopover, setIsPopover] = useState(false);
  
    return (
      <div>
        {/* Add your component JSX here */}
      </div>
    );
  }