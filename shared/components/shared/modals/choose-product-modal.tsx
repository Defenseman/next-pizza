"use client";

import React from "react";
import { Dialog } from "../../ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { ProductWithRelations } from "@/@types/prisma";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 sm:max-w-[1060px] w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ProductForm product={product} forModal={true} onSubmit={router.back} />
      </DialogContent>
    </Dialog>
  );
};
