import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;
  
  @Column({ default: true })
  isActive: boolean;
}
