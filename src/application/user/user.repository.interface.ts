export interface UserRepositoryInterface {
  findById(id: string): string;
  findAll(page: number, size: number): string;
  create(): string;
  update(): string;
}
