import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductsGroupList,
} from '@/shared/components';
import { Suspense } from 'react';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({
  searchParams,
}: {
  searchParams: GetSearchParams;
}) {
  const params = await searchParams
  const categories = await findPizzas(params);
  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />
      <Container className="pb-14px mt-10">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense fallback>
              <Filters className="my-5" />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
