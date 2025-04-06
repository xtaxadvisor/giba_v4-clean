import { useState } from 'react';
import calculateServicesCostDefault from "@/utils/serviceCalculator"

const [costResult, setCostResult] = useState<number | null>(null);

const handleCalculateCost = (serviceSelections: any) => {
  try {
    const cost = calculateServicesCost(serviceSelections); // Replace with your actual input
    setCostResult(cost);
    console.log("Cost result:", cost);
  } catch (error) {
    console.error("Failed to calculate cost:", error);
  }
};
export const calculateServicesCost = (serviceSelections: any) => { // Export the function
  const { serviceType, duration, discountCode, discountAmount, discountPercentage } = serviceSelections;
  const baseCost = (() => {
    // Example implementation of getBaseCost
    const serviceCosts: { [key: string]: number } = {
      'Tax Planning': 100,
      'Consultation': 150,
      'Audit': 200,
    };
    return serviceCosts[serviceType] || 0;
  })(); // Assume this function retrieves the base cost based on service type
  let totalCost = baseCost * (duration / 60); // Assuming duration is in minutes

  if (discountCode) {
    totalCost -= discountAmount || (totalCost * (discountPercentage / 100));
  }

  return totalCost;
} 

export default function ServiceCostCalculator() {
  const [serviceSelections, setServiceSelections] = useState({
    serviceType: 'Tax Planning',
    duration: 60,
    discountCode: 'SUMMER2023',
    discountAmount: 20,
    discountPercentage: 10,
    discountDetails: { type: 'Percentage', amount: 10 },
  });
  const [costResult, setCostResult] = useState(null);
  const handleCalculateCost = () => {
    try {
      const cost = calculateServicesCost(serviceSelections);
      setCostResult(cost);
      console.log("Cost result:", cost);
    } catch (error) {
      console.error("Failed to calculate cost:", error);
    }
  };
    return (
      <div>
        <button onClick={handleCalculateCost}>Calculate Cost</button>
        {costResult !== null && <p>Cost: ${costResult}</p>}
      </div>
    );
  }