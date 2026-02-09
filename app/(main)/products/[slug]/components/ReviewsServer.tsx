import { ProductType } from "@/features/products/types";
import ReviewsCleint from "./ReviewsClient";
import { getProductsReviews } from "@/features/products/server/getProductsBySlug";

const ReviewsServer = async ({product}:{product: ProductType}) => {
    const reviews = await getProductsReviews(product?._id);
    return (
        <ReviewsCleint reviews={reviews} product={product}/>
    )
};

export default ReviewsServer;