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
  const { title, background, alias, details } = post;

  return (
    <div>
      <NextSeo
        title={`${title} - Memoravel.vn`}
        description={`${details.meta_description}`}
        openGraph={{
          url: `https://memoravel.vn/blogs/${alias}`,
          title: `${title} - Memoravel.vn`,
          description: `${details.meta_description || ""}`,
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
        additionalMetaTags={[
          {
            name: "keywords",
            content: `${details.meta_keywords || ""}`,
          },
          {
            name: "description",
            content: `${details.meta_description || ""}`,
          },
        ]}
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
