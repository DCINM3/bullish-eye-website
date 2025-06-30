'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/index';
import { ExternalLink, ShoppingCart, MessageCircle } from 'lucide-react';
import ProductContactModal from './ProductContactModal';

interface ActiveProductsProps {
    service: string;
    serviceName?: string;
}

const ActiveProducts: React.FC<ActiveProductsProps> = ({ service, serviceName }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    // Service name mapping
    const serviceNames: { [key: string]: string } = {
        'mutual-funds': 'Mutual Fund',
        'life-insurance': 'Life Insurance',
        'ipo-investing': 'IPO Investing',
        'fixed-income': 'Fixed Income',
        'retirement-plan': 'Retirement Planning',
        'unlisted-shares': 'Unlisted Shares',
        'structure-product': 'Structured Product',
        'insurance-policy': 'Insurance Policy',
    };

    const displayServiceName = serviceName || serviceNames[service] || service;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`/api/products?service=${service}&isActive=true`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [service]);

    const handleContactClick = (product: Product) => {
        setSelectedProduct(product);
        setContactModalOpen(true);
    };

    const handleCloseModal = () => {
        setContactModalOpen(false);
        setSelectedProduct(null);
    };

    if (loading) {
        return (
            <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Featured Products</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-200 p-4 text-left">Product</th>
                                <th className="border border-gray-200 p-4 text-left">Description</th>
                                <th className="border border-gray-200 p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2].map((i) => (
                                <tr key={i}>
                                    <td className="border border-gray-200 p-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                    <td className="border border-gray-200 p-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                    <td className="border border-gray-200 p-4">
                                        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Error loading products: {error}</p>
            </div>
        );
    }

    if (products.length === 0) {
        return null; // Don't show section if no products
    }

    return (
        <>
            <div className="mt-8 pt-8 border-t">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                    Featured Products
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700">
                                    Product Name
                                </th>
                                <th className="border border-gray-200 p-4 text-left font-semibold text-gray-700">
                                    Description
                                </th>
                                <th className="border border-gray-200 p-4 text-center font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-200 p-4">
                                        <h4 className="text-lg font-semibold text-gray-900">{product.title}</h4>
                                    </td>
                                    <td className="border border-gray-200 p-4">
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {product.description}
                                        </p>
                                    </td>
                                    <td className="border border-gray-200 p-4">
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                            <Button 
                                                size="sm" 
                                                onClick={() => handleContactClick(product)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                            >
                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                Contact Us
                                            </Button>
                                            {product.link && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => window.open(product.link, '_blank')}
                                                >
                                                    Learn More
                                                    <ExternalLink className="w-4 h-4 ml-2" />
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Contact Modal */}
            {selectedProduct && (
                <ProductContactModal
                    isOpen={contactModalOpen}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                    serviceName={displayServiceName}
                />
            )}
        </>
    );
};

export default ActiveProducts;
