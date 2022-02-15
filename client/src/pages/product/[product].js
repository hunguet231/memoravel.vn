import { fetchData } from "api";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import ProductDetails from "components/product/ProductDetails";
import { ApiConstant, AppConstant } from "const";
import BlogLayout from "layouts/blog-layout";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

const ProductSingle = ({ product }) => {
  const { alias, description, images, name } = product;
  return (
    <div>
      <NextSeo
        title={`${name} | Memoravel Shop`}
        description={`${description}`}
        openGraph={{
          url: `https://memoravel.vn/product/${alias}`,
          title: `${name} | Memoravel Shop`,
          description: `${description}`,
          images: [
            {
              url: `${images?.[0]?.image}`,
              width: 800,
              height: 600,
              alt: `${name}`,
            },
          ],
          site_name: `${name} | Memoravel Shop`,
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://memoravel.vn/images/favicon.ico",
          },
          {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
          },
        ]}
      />
      <BlogLayout>
        <Header />
        <ProductDetails product={product} />
        <ContactForm />
        <Footer />
      </BlogLayout>
    </div>
  );
};

ProductSingle.propTypes = {
  product: PropTypes.object,
};

ProductSingle.defaultProps = {};

export default ProductSingle;

export async function getServerSideProps({ params: { product } }) {
  const url = ApiConstant.GET_PRODUCT + `/${product}`;
  const response = await fetchData(url, ApiConstant.METHOD.get);
  if (response?.status === AppConstant.STATUS_OK) {
    return {
      props: { product: response.data },
    };
  }
}
