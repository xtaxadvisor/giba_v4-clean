import { useState } from 'react';
import { Calculator, Clock, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import calculateServicesCost from '../../utils/serviceCalculator';
import { ServiceRequest, ServiceTypes } from '../../utils/serviceCalculator';
import { formatCurrency } from '../../utils/format';
import { useNotificationStore } from '../../lib/store';
import { useTranslation } from 'react-i18next';
interface CalculationResult {
  total: number;
  subtotal: number;
  addons: number;
  discount: number;
  details: {
    basePrice: number;
    hourlyCharges: number;
    appliedDiscount: {
      percentage: number;
    };
  };
} 
export default function calculateServicesCostLocal(services: ServiceRequest[]): CalculationResult | null {
  // Implement the logic to calculate the cost here
  return null; // Placeholder return value
} // eslint-disable-line
export type { ServiceRequest, ServiceTypes }; // for IDE auto-completion and type checking

export type { CalculationResult }; // for IDE auto-completion and type checking 

export function ServiceCalculator() {
  const [services, setServices] = useState<ServiceRequest[]>([{
    serviceType: ServiceTypes.TAX_PLANNING as ServiceTypes,
    duration: 1,
    type: ServiceTypes.TAX_PLANNING,
    hours: 0,
    discountCode: null
  }]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const { addNotification } = useNotificationStore();

  const handleAddService = () => {
    setServices([...services, { serviceType: ServiceTypes.TAX_PLANNING as ServiceTypes, type: ServiceTypes.TAX_PLANNING, duration: 1, hours: 0, discountCode: null }]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: keyof ServiceRequest, value: any) => {
    const updatedServices = [...services];
    if (field in updatedServices[index]) {
      updatedServices[index] = { ...updatedServices[index], [field]: value };
    }
    setServices(updatedServices);
  };

  const handleCalculate = () => {
    try {
      // Validate inputs
      const invalidService = services.find(s => !s.hours || s.hours < 0);
      if (invalidService) {
        addNotification('Please enter valid hours for all services', 'error');
        return;
      }

      const cost = calculateServicesCostLocal(services) as CalculationResult | null; // Ensure the return type is handled
      if (cost === null) {
        addNotification('Failed to calculate cost', 'error');
        return;
      } // eslint-disable-line 
      setResult(cost); 
    } catch (error) { // eslint-disable-line
      console.error('Calculation error:', error);
      addNotification(
        error instanceof Error ? error.message : 'Failed to calculate cost',
        'error'
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calculator className="h-6 w-6 text-blue-800 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Service Cost Calculator</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={Plus}
          onClick={handleAddService}
        >
          Add Service
        </Button>
      </div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Service {index + 1}</h3>
              {services.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleRemoveService(index)}
                  className="text-red-600 hover:text-red-700"
                  aria-label={`Remove service ${index + 1}`}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Service Type"
                value={service.type}
                onChange={(value) => handleServiceChange(index, 'type', value)}
                options={[
                  { value: ServiceTypes.TAX_PLANNING, label: 'Tax Planning' },
                  { value: ServiceTypes.FINANCIAL_REVIEW, label: 'Financial Review' },
                  { value: ServiceTypes.INVESTMENT_ADVISORY, label: 'Investment Advisory' },
                  { value: ServiceTypes.BUSINESS_CONSULTING, label: 'Business Consulting' },
                  { value: ServiceTypes.TAX_PREPARATION, label: 'Tax Preparation' }
                ]}
              />

              <Input
                type="number"
                label="Hours"
                icon={Clock}
                value={service.hours}
                onChange={(e) => handleServiceChange(index, 'hours', Number(e.target.value))}
                min="1"
                step="0.5"
                required
                aria-label="Service hours"
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button
            variant="primary"
            icon={Calculator}
            onClick={handleCalculate}
          >
            Calculate Cost
          </Button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Base Price:</span>
                <span className="font-medium">{formatCurrency(result.details.basePrice)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-700">Hourly Charges:</span>
                <span className="font-medium">{formatCurrency(result.details.hourlyCharges)}</span>
              </div>

              {result.addons > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-700">Addons:</span>
                  <span className="font-medium">{formatCurrency(result.addons)}</span>
                </div>
              )}

              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-medium">{formatCurrency(result.subtotal)}</span>
                </div>
              </div>

              {result.discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount ({result.details.appliedDiscount.percentage}%):</span>
                  <span className="font-medium">-{formatCurrency(result.discount)}</span>
                </div>
              )}

              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>{formatCurrency(result.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}