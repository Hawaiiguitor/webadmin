import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import {ProductFormValues, formSchema  } from '@/lib/utils';

const ProductPage = async ({ params }: { params: Promise<{ productId: string, storeId: string }> }) => {
    const { storeId, productId } = await params;
    const dataResult : ProductFormValues = {
        name: '',
        images: [],
        price: 0,
        categoryId: '',
        colorId: '',
        sizeId: '',
        isFeatured: false,
        isArchived: false,
        description: '',
    };
    var notInit: boolean = false;
    const product = await prismadb.product.findUnique({ 
        where: {
            id: productId
        },
        include: {
            images: true,
            tieredPrices: true,
        }
    });

    if (product) {
        notInit = true;
        // console.log("#### status: ", notInit)
        dataResult.name = product.name;
        dataResult.images = product.images;
        dataResult.categoryId = product.categoryId;
        dataResult.sizeId = product.sizeId;
        dataResult.isFeatured = product.isFeatured;
        dataResult.isArchived = product.isArchived;
        dataResult.description = product.description;
        dataResult.price = product.price.toNumber();
        dataResult.colorId = product.colorId;
        dataResult.tieredPrices = product.tieredPrices.map(tier => ({
            ...tier,
            price: tier.price.toNumber(),
        }));
    }
    const categories = await prismadb.category.findMany({
        where: {
            storeId: storeId
        },
    })

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: storeId
        },
    })

    const colors = await prismadb.color.findMany({
        where: {
            storeId: storeId
        },
    })

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductForm
                    fetchData={dataResult}
                    colors={colors}
                    sizes={sizes}
                    categories={categories}
                    notInit={notInit}
                />
            </div>
        </div>
    )
}

export default ProductPage;