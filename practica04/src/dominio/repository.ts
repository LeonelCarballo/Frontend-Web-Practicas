export interface Repository<T, ID = string> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;
  save(entidad: T): Promise<T>;
  delete(id: ID): Promise<void>;
}
