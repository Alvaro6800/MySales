import { Order } from "@modules/orders/database/entities/Orders";
import { Product } from "@modules/products/database/entities/Product";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders_products")
export class OrdersProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  price: number;

  @Column("quantity")
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
