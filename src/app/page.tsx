import ProductsCatalog from "@/components/products-catalog";
import MarketingWheel from "@/components/marketing-wheel";

export default function Home() {
  return (
    <main className="">
      <ProductsCatalog />
      <MarketingWheel
        discounts={[10, 25, 50]}
        discountLinks={{
          10: 'https://hotmart.com/compra-10',
          25: 'https://hotmart.com/compra-25',
          50: 'https://hotmart.com/compra-50',
        }}
        affiliateLink="https://hotmart.com/compra-default"
        originalPrice={297}
      />
      
    </main>
  );
}
