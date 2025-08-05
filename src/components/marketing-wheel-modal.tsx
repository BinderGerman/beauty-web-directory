'use client'

import React from 'react';
import { X } from 'lucide-react';
import MarketingWheel from './marketing-wheel';

interface MarketingWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalPrice: number;
  currency?: string;
  affiliateLink?: string;
  discountLinks?: Record<string, string>;
}

export default function MarketingWheelModal({
  isOpen,
  onClose,
  originalPrice,
  currency = "USD",
  affiliateLink = "https://www.google.com",
  discountLinks = {}
}: MarketingWheelModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay de fondo */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header del modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            🎲 ¡Girá la ruleta y ganá tu descuento!
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Contenido del modal */}
        <div className="p-6">
          <MarketingWheel
            originalPrice={originalPrice}
            currency={currency}
            affiliateLink={affiliateLink}
            discountLinks={discountLinks}
          />
        </div>
      </div>
    </div>
  );
} 