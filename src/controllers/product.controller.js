import ProductService from "../services/product.service.js"

const ProductController = {
  // function to create a product
  createProduct: async (req, res) => {
    try {

      const { name, description, price, category } = req.body;
      // verify if all fields are filled
      if (!name || !description || !price || !category) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productService = await ProductService.createProduct(req.body);
      res.status(201).json(productService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // function to get all products
  getProducts: async (req, res) => {
    try {
      const productService = await ProductService.getProducts();
      res.status(200).json(productService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // function to get a product by id
  getProductById: async (req, res) => {
    try {
      const productService = await ProductService.findByIdProduct(req.params.id);

      // verify if product exists
      if (!productService) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(productService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // function to update a product by id
  updateProduct: async (req, res) => {
    try {
      // verify if all fields are filled
      if (!req.body) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const productService = await ProductService.updateProduct(req.params.id, req.body);

      // verify if product exists
      if (!productService) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(productService);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default ProductController;