import React from "react";
import styles from "../../styles/MemoStory.module.scss";

export default function MemoStory() {
  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.storyWrapper}>
          <div className={styles.row}>
            <div className={styles.col}>
              <div className="heading heading-section">
                Câu chuyện của <br /> Memoravel
              </div>
              <div className={styles.storyDescription}>
                <p>
                  Memoravel.vn là sàn thương mại điện tử chuyên biệt dành riêng
                  cho sản phẩm thủ công mỹ nghệ Việt Nam ứng dụng công nghệ thực
                  tế ảo tăng cường AR. Chỉ bằng một chạm quét mã QR, sản phẩm sẽ
                  hiện lên trong không gian thực qua màn hình điện thoại giúp
                  khách hàng dễ dàng tương tác với sản phẩm và tìm một vị trí
                  trưng bày phù hợp.
                </p>
                <p>
                  Sự phát triển của Internet như một đòn bẩy cho sự giao thoa
                  văn hóa giữa các quốc gia trên thế giới. Nhưng chính điều này
                  đã vô hình làm phai mờ đi những nét đẹp văn hóa truyền thống
                  Việt Nam ta. Từ thực tại này, mong muốn của Memoravel là cùng
                  các nghệ nhân bảo tồn, lan tỏa giá trị truyền thống. Đồng thời
                  được góp phần giúp gia tăng doanh thu, lợi nhuận cho các làng
                  nghề qua mặt tích cực của sử dụng Internet.
                </p>
                <p>
                  Memoravel.vn mở ra một không gian văn hóa ngập tràn những giá
                  trị truyền thống được hiện thực trên các sản phẩm đến từ bốn
                  làng nghề chính là Gốm Bát Tràng, Tranh Đông Hồ, Lụa Vạn Phúc
                  và Mây tre đan Phú Vinh. Các sản phẩm đều được tạo ra bởi
                  chính những con người Việt, nghệ thuật Việt và được chào bán
                  bởi người Việt. Hãy cùng Memoravel chung tay gìn giữ nét đẹp
                  Việt bạn nhé!
                </p>
              </div>
              {/* <a href="#" className={styles.storyLink}>
                Đọc tất cả câu chuyện
              </a> */}
            </div>
            <div className={styles.col}>
              <div className={`${styles.img} flex justify-center`}>
                <img src="/images/story.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
