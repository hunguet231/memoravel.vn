import axios from "axios";
import { ApiConstant, AppConstant } from "const";
import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  const { data: posts } = await axios.get(
    `${ApiConstant.BASE_URL}/post?size=99999999999`
  );

  const fields = posts.data.map((post) => ({
    loc: `${AppConstant.LANDING_URL}blogs/${post.alias}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
