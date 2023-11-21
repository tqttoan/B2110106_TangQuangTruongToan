import { RouterLink } from 'vue-router';
<template>
  <footer>
    <div class="container py-3">
      <div class="row">
        <div class="col-4" style="padding-right: 30px">
          <div class="footer-head">
            <router-link :to="{ name: 'home' }" class="head-name fs-1">
              <img src="../assets/images/logo.png" alt="" />
              <div>
                <p class="logo-name">BookStore</p>
                <p class="logo-slogan">better knowledge, better success</p>
              </div>
            </router-link>
            <p>
              "Kết hợp những điều hiểu biết với những kinh nghiệm và kiến thức
              sẵn có - đó là nguyên tắc cần thiết khi lựa chọn sách. -
              Krupxkaia"
            </p>
            <div class="about-us mt-5">
              <h4 class="text-uppercase fw-bold mb-4">Về BookStore</h4>
              <ul class="list-unstyled">
                <li>
                  <router-link
                    :to="{ name: 'home' }"
                    class="text-white text-decoration-none"
                    ><i class="fa-solid fa-angle-right"></i>Trang
                    chủ</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'products' }"
                    class="text-white text-decoration-none"
                    ><i class="fa-solid fa-angle-right"></i>Tủ sách</router-link
                  >
                </li>
                <li>
                  <router-link
                    :to="{ name: 'contact' }"
                    class="text-white text-decoration-none"
                    ><i class="fa-solid fa-angle-right"></i>Liên hệ</router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="policy-us mt-5">
            <h4 class="text-uppercase fw-bold mb-4">Chính sách</h4>
            <ul class="list-unstyled">
              <li>
                <router-link to="" class="text-white text-decoration-none"
                  ><i class="fa-solid fa-angle-right"></i>Chính sách đổi - trả -
                  hoàn tiền</router-link
                >
              </li>
              <li>
                <router-link to="" class="text-white text-decoration-none"
                  ><i class="fa-solid fa-angle-right"></i>Phương thức vận
                  chuyển</router-link
                >
              </li>
              <li>
                <router-link to="" class="text-white text-decoration-none"
                  ><i class="fa-solid fa-angle-right"></i>Điều khoản sử
                  dụng</router-link
                >
              </li>
              <li>
                <router-link to="" class="text-white text-decoration-none"
                  ><i class="fa-solid fa-angle-right"></i>Chính sách bảo
                  mật</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="col-4">
          <div class="contact-detail mt-5">
            <h4 class="text-uppercase fw-bold mb-4">Chi tiết liên hệ</h4>
            <div class="infomation">
              <div>
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <span>Đại Học Cần Thơ</span>
            </div>
            <div class="infomation">
              <div>
                <i class="fa-solid fa-envelope"></i>
              </div>
              <span>toanb2110106@student.ctu.edu.vn</span>
            </div>
            <div class="infomation">
              <div>
                <i class="fa-solid fa-phone"></i>
              </div>
              <span>077 709 8649</span>
            </div>
            <div class="social-page">
              <div>
                <i class="fa-brands fa-facebook"></i>
              </div>
              <div><i class="fa-brands fa-youtube"></i></div>
              <div><i class="fa-brands fa-twitter"></i></div>
              <div><i class="fa-brands fa-google"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right bg-dark">
      <span>&copy; toanb2110106@student.ctu.edu.vn</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: #f47920;
  min-height: 400px;
  color: #fff;
}
.head-name {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
}
.head-name img {
  width: 30%;
}
.head-name div {
  line-height: 20px;
  padding-top: 20px;
}
.logo-name {
  margin-bottom: 10px;
  font-size: 3rem;
  font-family: monospace;
  font-weight: 900;
}
.logo-slogan {
  font-size: 1rem;
  margin: 0;
}
.head-name + p {
  font-style: italic;
  font-size: 1.1rem;
  word-spacing: 3px;
  text-align: justify;
  margin: 0;
}
.infomation {
  margin-bottom: 15px;
}
.infomation div {
  border: 2px solid #fff;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 30px;
  margin-right: 15px;
  display: inline-block;
}
.infomation div i {
  font-size: 20px;
}
.infomation span,
.about-us ul,
.policy-us ul {
  font-size: 18px;
  font-weight: 400;
}
.about-us ul li:hover a,
.policy-us ul li:hover a {
  color: #000 !important;
}
.about-us ul li,
.policy-us ul li {
  margin-bottom: 20px;
}
.about-us i,
.policy-us i {
  margin-right: 8px;
}
.social-page div {
  background: #fff;
  width: 45px;
  height: 45px;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px;
  margin: 20px 25px 0 0;
  display: inline-block;
}
.social-page div i {
  color: #fd6900;
  font-size: 25px;
  /* transition: all 0.3s ease-in-out; */
}
.social-page div:hover {
  background: #f47920;
}
.social-page div:hover i {
  color: #fff;
}
.copy-right {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
