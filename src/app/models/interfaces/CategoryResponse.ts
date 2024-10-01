import { Product } from "../product";

export interface CategoryResponse {
    categoria: string;
    productos: Product[];
}