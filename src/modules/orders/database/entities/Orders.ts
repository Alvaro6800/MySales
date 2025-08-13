import { Customer } from "@modules/customers/database/entities/Customer";
import { OrdersProducts } from "@modules/orders/database/entities/OrdersProducts";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
