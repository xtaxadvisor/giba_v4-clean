import { describe, it, expect } from 'vitest';
import {
    calculateServicesCost } from '../serviceCalculator';
  import ServiceTypesDefault from '../serviceCalculator';
  import ServiceRequest from '../serviceCalculator';
import { ServiceTypes } from '../serviceCalculator';

export type { ServiceTypes, ServiceRequest }; //   ); // eslint-disable-line    
  it('calculates basic service cost correctly', () => { // eslint-disable-line 
    const serviceRequest = { type: ServiceTypes.Default, duration: 1 }; // eslint-disable-line
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(200); // Assuming base cost is $200 for 1 hour // eslint-disable-line
  });
  it('calculates service cost with hours correctly', () => {
    const serviceRequest = { type: ServiceTypes.TAX_PLANNING, hours: 2 }; // eslint-disable-line
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(500); // Assuming base cost is $200 + 2 hours * $150 // eslint-disable-line
  });
  it('calculates service cost with addons correctly', () => {
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      addons: [
        { name: 'Rush Processing', price: 50 },
        { name: 'Document Review', price: 75, quantity: 2 }
      ]
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(550); // $200 base price + $150 hourly charge + $200 addons // eslint-disable-line
  });
  it('calculates service cost with quantity multiplier correctly', () => {
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      quantity: 2
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
   expect(result).toBe(400); // $200 base price + $150 hourly charge * 2 // eslint-disable-line
  });
  it('calculates service cost with discount correctly', () => {
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      discount: 10 // 10% discount
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(180); // $200 base price + $150 hourly charge - 10% discount // eslint-disable-line
  }
  );
  it('calculates service cost with multiple services correctly', () => {
    const serviceRequests = [
      { type: ServiceTypes.TAX_PLANNING, hours: 1 },
      { type: ServiceTypes.AUDIT, hours: 2 }
    ];
    const result = calculateServicesCost(serviceRequests); // eslint-disable-line
    expect(result).toBe(600); // $200 base price + $150 hourly charge * 2 // eslint-disable-line
  }
  );
  it('handles empty service list correctly', () => {
    const result = calculateServicesCost([]); // eslint-disable-line
    expect(result).toBe(0); // No services, cost should be 0 // eslint-disable-line
  }
  );
  it('handles invalid service type correctly', () => {  // eslint-disable-line
    const serviceRequest = { type: 'InvalidServiceType', hours: 1 }; // eslint-disable-line
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(0); // Invalid service type, cost should be 0 // eslint-disable-line
  }
  );
  it('handles negative hours correctly', () => { // eslint-disable-line
    const serviceRequest = { type: ServiceTypes.TAX_PLANNING, hours: -1 }; // eslint-disable-line
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(0); // Negative hours, cost should be 0 // eslint-disable-line
  }
  );
  it('handles zero hours correctly', () => { // eslint-disable-line
    const serviceRequest = { type: ServiceTypes.TAX_PLANNING, hours: 0 }; // eslint-disable-line
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(0); // Zero hours, cost should be 0 // eslint-disable-line
  }
  );
  it('handles invalid discount code correctly', () => { // eslint-disable-line
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      discountCode: 'INVALID_CODE'
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(200); // Invalid discount code, cost should be base cost // eslint-disable-line
  }
  );
  it('handles discount amount correctly', () => { // eslint-disable-line
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      discountAmount: 50
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(150); // $200 base price + $150 hourly charge - $50 discount // eslint-disable-line
  }
  );
  it('handles discount percentage correctly', () => { // eslint-disable-line
    const serviceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      discountPercentage: 20
    };
    const result = calculateServicesCost([serviceRequest]); // eslint-disable-line
    expect(result).toBe(120); // $200 base price + $150 hourly charge - 20% discount // eslint-disable-line
  }
  );        