/* eslint-disable react/prop-types */
import BoxImage from "components/common/BoxImage";
import Button from "components/common/Button";
import Tag from "components/common/Tag";
import React from "react";
import Link from "next/link";
import useWindowSize from "utils/useWindowSize";
import styles from "../../styles/NewsHome.module.scss";

const News = ({ news }) => {
  const size = useWindowSize();
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.news}>
          <div className="flex items-center justify-between">
            <h1 className="heading heading-section">Tin tức mới nhất</h1>
            <Link href={`/blogs`}>
              <p className={styles.more}>Xem thêm</p>
            </Link>
          </div>
          <div className={styles.boxes}>
            {news &&
              news.length > 0 &&
              news.map((post) => (
                <BoxImage
                  key={post.id}
                  className={styles.box}
                  imgUrl={post.background}
                  subHeading={
                    <>
                      {size.width > 600 && <Tag text={post.topics[0].title} />}
                      <span>
                        {new Date(post.created).toLocaleDateString()}
                      </span>{" "}
                    </>
                  }
                  heading={post.title}
                  textMore={"Đọc thêm"}
                  link={post.alias}
                />
              ))}
          </div>
          <div className={styles.button}>
            <Link href={`/blogs`}>
              <Button type="secondary">Xem tất cả</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
