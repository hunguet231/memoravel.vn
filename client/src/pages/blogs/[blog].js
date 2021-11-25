import { fetchData } from "api";
import BlogContent from "components/blog/BlogContent";
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import { ApiConstant, AppConstant } from "const";
import BlogLayout from "layouts/blog-layout";
import { NextSeo } from "next-seo";
import PropTypes from "prop-types";
import React from "react";

const BlogDetails = ({ post }) => {
  const { title, description, background, alias } = post;
  return (
    <div>
      <NextSeo
        title={`${title} - Memoravel.vn`}
        description={`${description}`}
        openGraph={{
          url: `https://memoravel.vn/blogs/${alias}`,
          title: `${title} - Memoravel.vn`,
          description: `${description}`,
          images: [
            {
              url: `${background}`,
              width: 800,
              height: 600,
              alt: `${title}`,
            },
          ],
          site_name: `${title} - Memoravel.vn`,
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "https://memoravel.vn/images/favicon.ico",
          },
        ]}
      />
      <BlogLayout>
        <Header />
        <BlogContent post={post} />
        <ContactForm />
        <Footer />
      </BlogLayout>
    </div>
  );
};

BlogDetails.propTypes = {
  post: PropTypes.object,
};

BlogDetails.defaultProps = {};

export default BlogDetails;

export async function getServerSideProps({ params: { blog } }) {
  const url = ApiConstant.GET_POST + `/${blog}`;
  const response = await fetchData(url, ApiConstant.METHOD.get);
  if (response?.status === AppConstant.STATUS_OK) {
    // console.log(response.data);
    return {
      props: { post: response.data },
    };
  }
}
