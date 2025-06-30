export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  serviceCategory: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: string;
  features: string[];
  serviceCategory: string;
  isActive: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest {
  _id: string;
}

export type ServiceCategory = 
  | 'fixed-income'
  | 'mutual-funds'
  | 'ipo-investing'
  | 'life-insurance'
  | 'insurance-policy'
  | 'retirement-plan'
  | 'unlisted-shares'
  | 'structure-product';

export const SERVICE_CATEGORIES: { value: ServiceCategory; label: string }[] = [
  { value: 'fixed-income', label: 'Fixed Income & NCDs' },
  { value: 'mutual-funds', label: 'Mutual Funds' },
  { value: 'ipo-investing', label: 'IPO Investing' },
  { value: 'life-insurance', label: 'Life Insurance' },
  { value: 'insurance-policy', label: 'Insurance Policy' },
  { value: 'retirement-plan', label: 'Retirement Plan' },
  { value: 'unlisted-shares', label: 'Unlisted Shares' },
  { value: 'structure-product', label: 'Structured Products' },
];
