import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery, useGetTopProductsQuery } from "../redux/api/productSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  // console.log('Keyword:', keyword);
  // const { data, isLoading, isError } = useGetProductsQuery( {keyword });
  const { data, isLoading, isError } = useGetTopProductsQuery();
  console.log(data);
  // console.log(data.products);

  return (
    <>
      {!keyword ? <Header /> : null}

      <div className="flex justify-between items-center">
        <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
          Special Products
        </h1>

        <Link
          to="/shop"
          className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
        >
          Shop
        </Link>
      </div>

      <div>
        <div className="flex justify-center flex-wrap mt-[2rem]">
          {data ? (
            data.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))
          ) : (
            // You can display a loading indicator or a message here
            isLoading ? <Loader /> : isError ? <Message variant="error">Error loading products</Message> : null
          )
          }
        </div>
      </div>
    </>
  );
};

export default Home;