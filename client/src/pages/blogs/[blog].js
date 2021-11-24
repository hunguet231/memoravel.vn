import React from "react";
import PropTypes from "prop-types";
import { fetchData } from "api";
import { ApiConstant, AppConstant } from "const";
import BlogContent from "components/blog/BlogContent";
import ContactForm from "components/common/ContactForm";
import Header from "components/common/Header";
import Footer from "components/common/Footer";
import BlogLayout from "layouts/blog-layout";

const BlogDetails = ({ post }) => {
  return (
    <div>
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