import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../product/productApiSlice";
import { useEffect } from "react";
import {
  setCurrentPage,
  setNextPage,
  setPrevPage,
  setProducts,
} from "../product/productSlice";
import Categories from "../category/Categories";
import Navbar from "../../../components/Navbar";
import Loading from "../../../components/Loading";
import Container from "../../../components/Container";
import ProductCard from "../product/ProductCard";
import { formatPrice } from "../../../helpers/formatPrice";
import { config } from "../../../config";
import { addItem } from "../cart/cartSlice";
import Pagination from "../../../components/Pagination";
import Heading from "../../../components/Heading";

const Home = () => {
  const dispatch = useDispatch();

  const {
    products,
    currentPage,
    perPage,
    keyword,
    category,
    tags,
    totalItems,
  } = useSelector((state) => state.products);

  const params = {
    limit: perPage,
    skip: currentPage * perPage - perPage,
    q: keyword,
    tags,
    category,
  };

  const {
    isLoading: productIsLoading,
    isFetching: productIsFetching,
    isError: productIsError,
    error: productError,
    isSuccess: productIsSuccess,
    data: productData,
  } = useGetProductsQuery(params);

  const loading = productIsLoading || productIsFetching;

  useEffect(() => {
    if (productIsSuccess && productData) {
      dispatch(setProducts(productData));
    }

    if (productIsError) {
      console.log(productError);
    }
  }, [
    productIsError,
    productError,
    loading,
    productIsSuccess,
    productData,
    dispatch,
  ]);

  let categoryContent;
  categoryContent = <Categories />;

  return (
    <>
      <Navbar category={categoryContent} />

      {loading && <Loading />}

      <div className="pb-9 pt-44 md:pt-52">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.name}
                price={formatPrice(product.price)}
                imgSrc={config.server.image_url + product.image}
                alt={product.name}
                desc={product.description}
                actionLabel={"ADD TO CART"}
                onClick={() => dispatch(addItem(product))}
              />
            ))}
            {!products.length && (
              <div className="mt-10 sm:col-span-2 lg:col-span-3 xl:col-span-4 2xl:col-span-5">
                <Heading
                  center
                  title="No Result Found"
                  subtitle={`We couldn't find any matches for ${keyword}`}
                />
              </div>
            )}
          </div>

          <div className="my-12">
            <Pagination
              currentPage={currentPage}
              totalCount={totalItems}
              pageSize={perPage}
              onPage={(page) => dispatch(setCurrentPage(page))}
              onNext={() => dispatch(setNextPage())}
              onPrev={() => dispatch(setPrevPage())}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;
