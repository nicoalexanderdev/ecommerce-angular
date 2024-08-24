import { Categoria } from "./categoria";
import { Marca } from "./marca";

export class Product {
    id: number = 0;
    nombre: string = "";
    precio: number = 0;
    descripcion: string = "";
    image_url: string = "";
    stock: number = 0;
    marca?: Marca;
    categoria?: Categoria;
}
