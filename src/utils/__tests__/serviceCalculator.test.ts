import { describe, it, expect } from 'vitest';
import { calculateServicesCost, ServiceTypes, ServiceRequest } from '../serviceCalculator';

describe('calculateServicesCost', () => {
  it('calculates basic service cost correctly', () => {
    const serviceRequest: ServiceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      serviceType: 'Tax Planning',
      duration: 1,
      discountCode: undefined
    };
    const result = calculateServicesCost([serviceRequest]); 
    expect(result).toBe(350); // $200 base + 1 hr * $150
  });

  it('calculates cost with quantity multiplier', () => {
    const serviceRequest: ServiceRequest = {
      type: ServiceTypes.TAX_PLANNING, hours: 1, quantity: 2,
      serviceType: '',
      duration: 0,
      discountCode: undefined
    };
    const result = calculateServicesCost([serviceRequest]);
    expect(result).toBe(700); // 2 * (200 + 150)
  });

 
  it('applies flat discount amount', () => {
    const serviceRequest: ServiceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      hours: 1,
      discountAmount: 100,
      serviceType: 'Tax Planning',
      duration: 0,
      discountCode: undefined
    };
    const result = calculateServicesCost([serviceRequest]);
    expect(result).toBe(250); // 200 + 150 - 100
  });

  it('applies percentage discount', () => {
    const serviceRequest: ServiceRequest = {
      type: ServiceTypes.TAX_PLANNING,
      serviceType: 'STANDARD', // Added required property
      duration: 1,
      hours: 1,
      discountPercentage: 20,
      discountCode: undefined
    };
    const result = calculateServicesCost([serviceRequest]);
    expect(result).toBe(280); // (200 + 150) * 0.8
  });

  it('returns 0 for empty list', () => {
    const result = calculateServicesCost([]);
    expect(result).toBe(0);
  });

  it('treats unknown type as base 0', () => {
    const serviceRequest: any = { type: 'UNKNOWN', hours: 1 };
    const result = calculateServicesCost([serviceRequest]);
    expect(result).toBe(0);
  });

  it('treats negative hours as 0', () => {
    const serviceRequest: ServiceRequest = {
      type: ServiceTypes.TAX_PLANNING, hours: -5, serviceType: 'Tax Planning', duration: 0,
      discountCode: undefined
    };
    const result = calculateServicesCost([serviceRequest]);
    expect(result).toBe(200); // only base price
  });

  it('handles multiple services', () => {
    const services: ServiceRequest[] = [
      {
        type: ServiceTypes.TAX_PLANNING, hours: 1, serviceType: 'Tax Planning', duration: 1,
        discountCode: undefined
      },
      {
        type: ServiceTypes.AUDIT as ServiceTypes, hours: 2, serviceType: 'Audit', duration: 2,
        discountCode: undefined
      }
    ];
    const result = calculateServicesCost(services);
    expect(result).toBe(1050); // 200+150 + 300+400
  });
});
