import { OrdersProducts } from "@modules/orders/infra/database/entities/OrdersProducts";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @Column({ type: "int" })
  quantity: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;
}
