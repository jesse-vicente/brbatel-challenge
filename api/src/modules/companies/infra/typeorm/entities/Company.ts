import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cnpj: string;

  @Column()
  demand: string;

  @Column()
  annual_billing: string;

  @Column()
  about: string;
}

export default Company;
