import getProductsHandler from './getProducts'
import deleteProductHandler from './deleteProduct'

export const ProductsServices = fetchService => {
  return {
    getProducts: getProductsHandler(fetchService).getProducts,
    deleteProduct: deleteProductHandler(fetchService).deleteProduct
  }
}
