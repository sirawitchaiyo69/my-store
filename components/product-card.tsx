import { PackageIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBaht } from "@/lib/money";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock === 0;

  return (
    <Card>
      <CardContent>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full rounded-md object-cover" />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-md bg-muted text-muted-foreground">
            <PackageIcon className="size-12" aria-hidden />
          </div>
        )}
      </CardContent>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        {product.description && <CardDescription>{product.description}</CardDescription>}
      </CardHeader>
      <CardFooter className="justify-between">
        {product.salePrice ? (
          <span className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-destructive">{formatBaht(product.salePrice)}</span>
            <s className="text-sm text-muted-foreground">{formatBaht(product.price)}</s>
          </span>
        ) : (
          <span className="text-lg font-semibold">{formatBaht(product.price)}</span>
        )}
        {soldOut ? <Badge variant="secondary">สินค้าหมด</Badge> : <Badge variant="outline">เหลือ {product.stock}</Badge>}
      </CardFooter>
    </Card>
  );
}
