/* eslint-disable react/prop-types */
import ContactForm from "components/common/ContactForm";
import Footer from "components/common/Footer";
import Header from "components/common/Header";
import PolicyDetails from "components/policy/PolicyDetails";
import { MainLayout } from "layouts";
import React from "react";

const PolicySingle = ({ id }) => {
  return (
    <div>
      <MainLayout>
        <Header />
        <PolicyDetails id={id} />
        <ContactForm />
        <Footer />
      </MainLayout>
    </div>
  );
};

export default PolicySingle;

export async function getServerSideProps({ params: { id } }) {
  return {
    props: { id },
  };
}
