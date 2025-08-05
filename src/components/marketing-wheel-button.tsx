'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import MarketingWheelModal from './marketing-wheel-modal';

interface MarketingWheelButtonProps {
  originalPrice: number;
  currency?: string;
  affiliateLink?: string;
  discountLinks?: Record<string, string>;
}

export default function MarketingWheelButton({
  originalPrice,
  currency = "USD",
  affiliateLink = "https://www.google.com",
  discountLinks = {}
}: MarketingWheelButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-gradient-to-r from-chart-4 to-chart-5 hover:from-ring hover:to-chart-1 text-primary-foreground py-3 text-lg font-semibold shadow-lg transform transition hover:scale-105"
      >
        <ShoppingCart className="mr-2 h-5 w-5" />🎯 Comprá con descuento!
      </Button>
      
      <MarketingWheelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        originalPrice={originalPrice}
        currency={currency}
        affiliateLink={affiliateLink}
        discountLinks={discountLinks}
      />
    </>
  );
} 