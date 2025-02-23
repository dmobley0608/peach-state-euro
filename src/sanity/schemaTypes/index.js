import { productCategory } from "./schemas/product-category"
import { product } from "./schemas/product"
import { galleryImage } from "./schemas/galleryImage"


export const schema = {
  types: [product, productCategory, galleryImage],
}
