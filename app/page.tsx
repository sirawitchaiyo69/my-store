import { ProductCard } from "@/components/product-card";
import { mockProducts } from "@/lib/mock-products";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">MY STORE</h1>
        <p className="text-muted-foreground">Know the Core · Build the Store</p>
      </header>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
