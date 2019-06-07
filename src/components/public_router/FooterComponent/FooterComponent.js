import React, { Component } from "react";
import "./FooterComponent.css";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const greenColorText = {
  color: "#30c8dc"
};

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Footer-app" id="Footer">
        <div className="Reset-margin Footer-app">
          <div className="Full-width Footer-background-first " id="Footer-menu">
            <div className= "Adding-footer"> </div>
            <Row className="Center Footer-contact Max-width">
              <Col xs={12} sm={6} md={3} lg={3} className="Text-left Col-footer No-padding " >
                 <p>THÔNG TIN CÔNG TY</p>
                 <p>Trang chủ</p>
                 <p>Về chúng tôi</p>
                 <p>Điều khoản</p>
                 <p>Tin tức</p>
                 <p>Liên hệ</p>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3} className="Text-left Col-footer No-padding " >
                  <p>DANH MỤC CHÍNH</p>
                  <p>Thời trang</p>
                  <p>Điện thoại và phụ kiện</p>
                  <p>Thiết bị gia dụng</p>
                  <p>Sản phẩm khác</p>
                  <p>Ô tô - Xe máy- Xe đạp</p>
                  <p>Du lịch thể thao</p>
                  <p>Đồ chơi</p>
                  <p>Nhà sách Online</p>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3} className="Text-left Col-footer No-padding " >
                <p>DANH MỤC KHÁC</p>
                <p>Mẹ và bé</p>
                <p>Sức khỏe và làm đẹp</p>
                <p>Máy ảnh và quay phim</p>
                <p>Máy tính và Laptop</p>
                <p>Chăm sóc thú cưng</p>
              </Col>
              <Col xs={12} sm={6} md={3} lg={3} className="Text-left Col-footer No-padding ">
                <p>THANH TOÁN</p>   
              </Col>
            </Row>
            <Row className="Center Footer-contact">
              <div className="Container-custom">
                <p className="Footer-title Padding-footer">
                  BEEGO - MUA SẮM VÀ BÁN HÀNG ONLINE ĐƠN GIẢN, NHANH CHÓNG TRÊN
                  ĐIỆN THOẠI DI ĐỘNG
                </p>
                <p className="Footer-content">
                  Nếu bạn đang tìm kiếm một trang web để mua và bán hàng trực
                  tuyến thì Beego.vn là một sự lựa chọn hiệu quả dành cho bạn.
                  Bản chất của BEEGO là một social ecommerce platform - nền tảng
                  cho phép người bán hàng có thể xem như một trang web thương
                  mại điện tử tích hợp mạng xã hội để tương tác, thay đổi thông
                  tin để cho khách hàng có thể dễ dàng tiếp cận được. Nhờ nền
                  tảng đó, việc mua hàng trên Beego trở nên nhanh chóng và đơn
                  giản hơn. Bạn có thể trò chuyện trực tiếp với nhà bán hàng để
                  hỏi trực tiếp về mặt hàng cần mua. Còn nếu bạn muốn tìm mua
                  những dòng sản phẩm chính hãng, uy tín, Beego Mall chính là sự
                  lựa chọn lí tưởng dành cho bạn. Đến với Beego, cơ hội để trở
                  thành một nhà bán hàng dễ dàng hơn bao giờ hết. Chỉ với vài
                  thao tác trên ứng dụng, bạn đã có thể đăng bán ngay những sản
                  phẩm của mình. Không những thế, các nhà bán hàng có thể tùy
                  chọn các tính năng “Shop tạm nghỉ” hoặc tự tạo riêng cho mình
                  một chương trình khuyến mãi để thu hút người mua với những sản
                  phẩm có mức giá hấp dẫn. Khi đăng nhập tại Beego Kênh người
                  bán, bạn có thể dễ dàng phân loại sản phẩm, theo dõi đơn hàng,
                  chăm sóc khách hàng và cập nhập ngay các hoạt động của shop.
                </p>
              </div>
            </Row>
            <Row className="Center Footer-contact">
              <div className="Container-custom">
                <p className="Footer-title">
                  TẢI ỨNG DỤNG BEEGO NGAY ĐỂ MUA VÀ BÁN HÀNG ONLINE MỌI LÚC MỌI
                  NƠI
                </p>
                <p className="Footer-content">
                  Ứng dụng BEEGO với ưu điểm đó là cho phép bạn có thể mua và
                  bán hàng chỉ với 30 giây ở mọi lúc, mọi nơi. Bạn có thể tải
                  ứng dụng BEEGO cũng như đăng sản phẩm bán hàng miễn phí mà
                  không phải chịu bất kỳ một khoản phí hoa hồng nào. Ứng dụng
                  Beego gồm có những ưu điểm chính sau: - Giao diện thân thiện,
                  đơn giản, dễ sử dụng. Bạn sẽ dễ dàng thấy được ngay những sản
                  phẩm nổi bật cũng như dễ dàng tìm đến các ô tìm kiếm, giỏ hàng
                  hoặc tính năng chat liền tay. - Ứng dụng tích hợp công nghệ
                  quản lý đơn mua và bán hàng tiện lợi trên cùng một tài khoản.
                  Bạn sẽ vừa là người mua hàng, vừa là người bán hàng rất linh
                  hoạt, dễ dàng. - Cập nhập thông tin khuyến mãi nhanh chóng,
                  liên tục. Tại Beego, bạn có thể cập nhập các mã giảm giá, mã
                  khuyến mãi Beego. Bên cạnh đó, Beego cũng sẽ có những chiến
                  dịch khuyến mãi lớn hằng năm như Beego 9.9, Beego Tết Sale,
                  Beego quẩy lễ, Beego Flash Sale. Đây là thời điểm để người mua
                  hàng có thể nhanh tay chọn ngay cho mình những mặt hàng ưa
                  thích với mức giá giảm kỉ lục.
                </p>
              </div>
            </Row>
            <Row> <div className="padding-bottom"></div></Row>
          </div>
        </div>
      </div>
    );
  }
}

// listState : tên đặt cho danh sách các state mà lấy ra được từ store
// state là danh sách tất cả các state => có thể lấy riêng rẽ => state.isLogin

const FooterWithRouter = withRouter(FooterComponent);

export default FooterWithRouter;
