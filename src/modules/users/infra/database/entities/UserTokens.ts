import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user_tokens")
export class UserTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
