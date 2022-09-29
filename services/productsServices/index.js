import getProductsHandler from './getProducts'
import deleteProductHandler from './deleteProduct'
import createProductHandler from './createProduct'

export const ProductsServices = fetchService => {
  return {
    getProducts: getProductsHandler(fetchService).getProducts,
    deleteProduct: deleteProductHandler(fetchService).deleteProduct,
    createProduct: createProductHandler(fetchService).createProduct
  }
}
