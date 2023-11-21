const { ObjectId } = require("mongodb");

class ProductService {
  constructor(client) {
    this.product = client.db().collection("products");
    this.category = client.db().collection("categories");
    this.image = client.db().collection("images");
  }

  // Dinh nghia cac phuong thuc truy xuat CSDL

  // create a new type of drink
  async createCategory(data) {
    const result = await this.category.findOneAndUpdate(
      data,
      { $set: data },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  // create a new product
  async create(data) {
    const result = await this.product.findOneAndUpdate(
      data,
      { $set: data },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return result;
  }

  // save image
  async saveImage(data) {
    return await this.image.findOneAndUpdate(
      data,
      { $set: data },
      { returnDocument: "after", upsert: true }
    );
  }
  // get image
  async findImage(product) {
    return await this.image.findOne({ product: product });
  }

  // update image
  async updateImage(product, data) {
    return await this.image.findOneAndUpdate(
      { product: product },
      { $set: data },
      { returnDocument: "after", upsert: true }
    );
  }

  // delete image
  async deleteImage(product) {
    return await this.image.findOneAndDelete({ product: product });
  }

  // delete all images of all products
  async deleteAllImages() {
    const result = await this.image.deleteMany({});
    return result.deletedCount;
  }

  // find all categories
  async findAllCategories() {
    // return await this.category.find({}).toArray();
    return await this.category.aggregate([{ $sort: { name: 1 } }]).toArray();
  }

  // find product by product ID
  async findByID(id) {
    return await this.product.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // find all products
  async findAll() {
    return await this.product.find({}).toArray();
  }

  // update product with its id
  async updateProduct(id, data) {
    const result = await this.product.findOneAndUpdate(
      {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
      },
      { $set: data },
      { returnDocument: "after" }
    );

    return result;
  }

  // delete a product with its id
  async deleteProduct(id) {
    return await this.product.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // delete all products
  async deleteAllProducts() {
    const result = await this.product.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ProductService;
