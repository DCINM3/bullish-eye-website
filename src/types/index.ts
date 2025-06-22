export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishDate: Date;
  isPublished: boolean;
  featuredImage?: string;
  tags: string[];
  category: string;
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  high52Week?: number;
  low52Week?: number;
}

export interface AlphaVantageResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  timestamp: Date;
}


export interface BlogPost {
  _id?: string;
  banner_image_url: string;
  heading: string;
  subheading: string;
  author: string;
  publish_date: Date;
  content: string;
  slug: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface BlogFormData {
  banner_image_url: string;
  heading: string;
  subheading: string;
  author: string;
  publish_date: string;
  content: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  service: string; // service page identifier
  link?: string; // optional product link
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
