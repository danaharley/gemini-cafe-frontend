import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "./productApiSlice";
import Heading from "../../../components/Heading";
import { config } from "../../../config";
import Loading from "../../../components/Loading";
import { formatPrice } from "../../../helpers/formatPrice";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import Container from "../../../components/Container";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    data: productData,
    isFetching: productIsFetching,
    isLoading: productIsLoading,
    isSuccess: productIsSuccess,
  } = useGetProductQuery(id);

  const loading = productIsFetching || productIsLoading;

  return (
    <Container>
      {loading && <Loading />}
      {productIsSuccess && (
        <div className="grid md:grid-cols-2">
          <div className="aspect-video w-full overflow-hidden rounded-md">
            <img
              src={config.server.image_url + productData.product.image}
              alt={productData.product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-4 p-2 py-6 md:pl-8">
            <Heading
              title={productData.product.name}
              subtitle={productData.product.category.name}
            />

            <div className="text-lg font-bold">
              {formatPrice(productData.product.price)}
            </div>

            <div className="text-base text-neutral-600">
              {productData.product.description}
            </div>
            <Button
              label="ADD TO CART"
              onClick={() => dispatch(addItem(productData.product))}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;
