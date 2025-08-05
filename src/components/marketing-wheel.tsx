'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Gift, Sparkles, ExternalLink } from 'lucide-react';

export default function MarketingWheel({
  discounts = [25], // descuentos posibles
  discountLinks = {} as Record<string, string>, // mapping: { 25: 'url1', 50: 'url2' }
  affiliateLink = 'https://hotmart.com/affiliate-link', // fallback
  brandColor = '#FF6B6B',
  title = '¡Gira y Gana tu Descuento!',
  buttonText = 'Comprar con Descuento',
  segments = null,
  originalPrice = 197,
  currency = 'USD'
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [winningDiscount, setWinningDiscount] = useState<number | null>(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const getSegments = () => {
    if (segments) return segments;

    const baseSegments = [
      { text: 'Inténtalo de nuevo', color: '#E74C3C', isWin: false, discount: 0 },
      { text: 'Casi...', color: '#95A5A6', isWin: false, discount: 0 },
      { text: 'Sigue intentando', color: '#E74C3C', isWin: false, discount: 0 },
      { text: 'Muy cerca', color: '#95A5A6', isWin: false, discount: 0 },
      { text: 'No esta vez', color: '#E74C3C', isWin: false, discount: 0 },
      { text: 'Casi lo tienes', color: '#95A5A6', isWin: false, discount: 0 },
    ];

    const colorPalette = ['#2ECC71', '#27AE60', '#F39C12', '#E67E22', '#3498DB', '#9B59B6', '#1ABC9C', '#16A085'];

    const dynamicWinningSegments = discounts.map((discount, idx) => ({
      text: `¡${discount}% OFF!`,
      color: colorPalette[idx % colorPalette.length],
      isWin: true,
      discount: discount
    }));

    return [...baseSegments, ...dynamicWinningSegments];
  };

  const wheelSegments = getSegments();
  const segmentAngle = 360 / wheelSegments.length;

  useEffect(() => {
    drawWheel();
  }, [currentRotation]);

  useEffect(() => {
    if (showConfetti) {
      createConfetti();
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const createConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.zIndex = '9999';
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';

      document.body.appendChild(confetti);

      const animation = confetti.animate([
        { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 20}px) rotate(360deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'cubic-bezier(0.5, 0, 0.5, 1)'
      });

      animation.onfinish = () => document.body.removeChild(confetti);
    }
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wheelSegments.forEach((segment, index) => {
      const startAngle = (index * segmentAngle - 90 + currentRotation) * (Math.PI / 180);
      const endAngle = ((index + 1) * segmentAngle - 90 + currentRotation) * (Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = segment.color;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + (endAngle - startAngle) / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(segment.text, radius * 0.7, 5);
      ctx.restore();
    });

    // Centro y flecha
    ctx.beginPath();
    ctx.arc(centerX, centerY, 25, 0, 2 * Math.PI);
    ctx.fillStyle = brandColor;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 10);
    ctx.lineTo(centerX - 20, 35);
    ctx.lineTo(centerX + 20, 35);
    ctx.closePath();
    ctx.fillStyle = brandColor;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const spinWheel = () => {
    if (isSpinning || alreadyPlayed) return;

    setIsSpinning(true);
    setAlreadyPlayed(true);

    const winningSegments = wheelSegments.filter(s => s.isWin);
    const selected = winningSegments[Math.floor(Math.random() * winningSegments.length)];
    const winningIndex = wheelSegments.indexOf(selected);

    const segmentCenter = (winningIndex + 0.5) * segmentAngle;
    const spins = 5;
    const finalRotation = spins * 360 + (360 - segmentCenter);

    const startTime = Date.now();
    const duration = 3000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = finalRotation * eased;

      setCurrentRotation(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentRotation(finalRotation % 360);
        setIsSpinning(false);
        setHasWon(true);
        setWinningDiscount(selected.discount);
        setShowConfetti(true);
      }
    };

    animate();
  };

  const getDiscountedPrice = (discount: number) => originalPrice * (1 - discount / 100);
  const formatPrice = (price: number) => currency === 'USD' ? `$${price.toFixed(2)}` : `${price.toFixed(2)} ${currency}`;

  const finalLink = winningDiscount && discountLinks[winningDiscount]
    ? discountLinks[winningDiscount]
    : affiliateLink;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full text-center">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-500" />
            {title}
          </h1>
          <p className="text-gray-600 text-sm">
            {hasWon ? '¡Felicitaciones!' : 'Haz clic en "Girar" para descubrir tu descuento'}
          </p>
        </div>

        <div className="mb-4 flex justify-center">
          <canvas
            ref={canvasRef}
            width="300"
            height="300"
            className="border-4 border-gray-300 rounded-full shadow-lg"
          />
        </div>

        {!hasWon && (
          <div className="mb-4">
            <button
              onClick={spinWheel}
              disabled={isSpinning || alreadyPlayed}
              className={`px-6 py-3 rounded-full font-bold text-white transition-all duration-300 shadow-lg text-base ${
                isSpinning || alreadyPlayed
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 transform hover:scale-105'
              }`}
            >
              {isSpinning ? 'Girando...' : 'GIRAR'}
            </button>
          </div>
        )}

        {hasWon && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="w-5 h-5" />
                <span className="text-base font-bold">
                  ¡Ganaste {winningDiscount}% de descuento!
                </span>
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex justify-center items-center gap-3">
                  <span className="text-xs opacity-80">Precio normal:</span>
                  <span className="text-sm line-through opacity-80">
                    {formatPrice(originalPrice)}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-3">
                  <span className="text-xs opacity-80">Tu precio:</span>
                  <span className="text-lg font-bold">
                    {formatPrice(getDiscountedPrice(winningDiscount ?? 0))}
                  </span>
                </div>
                <div className="text-xs opacity-90">
                  Ahorro: {formatPrice(originalPrice - getDiscountedPrice(winningDiscount ?? 0))}
                </div>
              </div>
            </div>

            <a
              href={finalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 
                         text-white px-6 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-700 
                         transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base"
            >
              <ExternalLink className="w-4 h-4" />
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};