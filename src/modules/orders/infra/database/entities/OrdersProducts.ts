import { Order } from "./Orders";
import { Product } from "@modules/products/infra/database/entities/Product";
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

  @Column("integer")
  quantity: number;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  order_id: string;

  @ManyToOne(() => Product, (product) => product.order_products)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column()
  product_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
