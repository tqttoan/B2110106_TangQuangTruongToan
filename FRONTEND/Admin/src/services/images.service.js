import axios from "axios";

// export default (data) => {
//   axios
//     .post("/api/product/images/upload", data, {
//       headers: {
//         "Content-Type": "multipart/form-data; boundary=${form._boundary}",
//       },
//     })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

class ImageService {
  constructor() {
    this.configHeader = {
      headers: {
        "Content-Type": "multipart/form-data; boundary=${form._boundary}",
      },
    };
  }
  async uploadImage(data) {
    axios
      .post("/api/product/images/upload", data, this.configHeader)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async updateImage(product, data) {
    axios
      .put(`/api/product/images/update/${product}`, data, this.configHeader)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new ImageService();
