import React from "react";
import { getData } from "../../utils/fetchData";

const shopProfile = ({ user }) => {
  return (
    <div>
      <h1>SHOP: {user.shop_name}</h1>
    </div>
  );
};

export default shopProfile;

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`users/${id}`);

  return {
    props: {
      user: res.user,
    },
  };
}
