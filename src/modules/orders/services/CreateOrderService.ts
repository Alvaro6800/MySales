import { Product } from "@modules/products/infra/database/entities/Product";
import AppError from "@shared/errors/AppError";
import { productsRepositories } from "@modules/products/infra/database/repositories/ProductsRepositories";
import { Order } from "../infra/database/entities/Orders";
import { orderRepositories } from "../infra/database/repositories/OrderRepositories";
import { customersRepositories } from "@modules/customers/infra/database/repositories/CustomersRepositories";

interface ICreateOrder {
  customer_id: string;
  products: Product[];
}

export class CreateOrderService {
  //async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
  //  const customerExists = await customersRepositories.findById(
  //    Number(customer_id),
  //  );
  //
  //  if (!customerExists)
  //    throw new AppError("Could not find any customer with the given id");
  //
  //  const existsProducts = await productsRepositories.findAllByIds(products);
  //
  //  if (!existsProducts.length)
  //    throw new AppError("Could not find any product with the given ids");
  //
  //  const existsProductsIds = existsProducts.map((product) => product.id);
  //
  //  const checkInexistentProducts = products.filter(
  //    (p) => !existsProductsIds.includes(p.id),
  //  );
  //
  //  if (checkInexistentProducts.length)
  //    throw new AppError(
  //      `Could not find the products: ${checkInexistentProducts.map((inexistentProduct) => inexistentProduct.id).join(", ")}`,
  //    );
  //
  //  const quantityUnavailableProducts = products.filter((product) => {
  //    if (
  //      existsProducts.filter(
  //        (productExisten) => productExisten.id == product.id,
  //      )[0].quantity < product.quantity
  //    )
  //      return product;
  //  });
  //
  //  if (quantityUnavailableProducts.length)
  //    throw new AppError(
  //      `The quantity of the follow products is not available: ${quantityUnavailableProducts.map((productUnavailableQuantity) => productUnavailableQuantity.id).join(", ")}`,
  //    );
  //
  //  const serializedProducts = products.map((product) => ({
  //    product_id: product.id,
  //    quantity: product.quantity,
  //    price: existsProducts.filter((p) => p.id === product.id)[0].price,
  //  }));
  //
  //  const order = await orderRepositories.createOrder({
  //    customer: customerExists,
  //    products: serializedProducts,
  //  });
  //
  //  const { order_products } = order;
  //
  //  const updateProductQuantity = order_products.map((prod) => ({
  //    id: prod.product_id,
  //    quantity:
  //      existsProducts.filter((p) => p.id === prod.product_id)[0].quantity -
  //      prod.quantity,
  //  }));
  //
  //  await productsRepositories.save(updateProductQuantity);
  //
  //  return order;
  //}

  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customer = await this.validateCustomer(customer_id);
    const validatedProducts = await this.validateProducts(products);
    this.validateInexistentProducts(products, validatedProducts);
    this.validateProductsRequestedQuantity(products, validatedProducts);

    const serializedProducts = await this.serializeProducts(
      products,
      validatedProducts,
    );

    const order = await orderRepositories.createOrder({
      customer: customer,
      products: serializedProducts,
    });

    await this.updateProductsStock(order, validatedProducts);

    return order;
  }

  //Valida se o [Cliente] enviado é valido
  async validateCustomer(customer_id: string) {
    const customer = await customersRepositories.findById(Number(customer_id));

    if (!customer)
      throw new AppError("Could not find any customer with the given id");

    return customer;
  }

  //Valida os [Produtos] validos enviados
  async validateProducts(products: Product[]) {
    const existingsProducts = await productsRepositories.findAllByIds(products);

    if (!existingsProducts.length)
      throw new AppError("Could not find any product with the given ids");

    return existingsProducts;
  }

  //Valida se existe [Produtos] invalidos enviados
  async validateInexistentProducts(
    products: Product[],
    validatedProducts: Product[],
  ) {
    const validatedProductsIds = validatedProducts.map((product) => product.id);

    const inexistentProducts = products.filter(
      (p) => !validatedProductsIds.includes(p.id),
    );

    if (inexistentProducts.length)
      throw new AppError(
        `Could not find the products: ${inexistentProducts.map((inexistentProduct) => inexistentProduct.id).join(", ")}`,
      );
  }

  //Valida se a quantidade solicitada do [Produto] é valida
  async validateProductsRequestedQuantity(
    products: Product[],
    validatedProducts: Product[],
  ) {
    const productsUnvalidatedQuantities = products.filter((product) => {
      const isValidProduct =
        validatedProducts.filter(
          (validatedProduct) => validatedProduct.id == product.id,
        )[0].quantity < product.quantity;

      if (isValidProduct) return product;
    });

    if (productsUnvalidatedQuantities.length)
      throw new AppError(
        `The quantity of the follow products is not available: ${productsUnvalidatedQuantities.map((productUnvalidateQuantities) => productUnvalidateQuantities.id).join(", ")}`,
      );
  }

  //Serializa o [Produto]
  async serializeProducts(products: Product[], validatedProducts: Product[]) {
    return products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: validatedProducts.filter((p) => p.id === product.id)[0].price,
    }));
  }

  //Atualiza a quantidade do [Produto] apos o [Pedido]
  async updateProductsStock(order: Order, validatedProducts: Product[]) {
    const { order_products } = order;

    const updateProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        validatedProducts.filter(
          (validatedProduct) => validatedProduct.id === product.product_id,
        )[0].quantity - product.quantity,
    }));

    await productsRepositories.save(updateProductQuantity);
  }
}
