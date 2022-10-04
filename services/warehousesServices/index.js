import getWarehousesHandler from './getWarehouses'
import getWarehouseProductsHandler from './getWarehouseProducts'
import addWarehouseProductHandler from './addProductWarehouse'
import deleteWarehouseHandler from './deleteWarehouse'
import createWarehouseHandler from './createWarehouse'
import mutateWarehouseHandler from './mutateWarehouse'

export const WarehousesServices = fetchService => {
  return {
    getWarehouses: getWarehousesHandler(fetchService).getWarehouses,
    getWarehouseProducts: getWarehouseProductsHandler(fetchService).getWarehouseProducts,
    addWarehouseProduct: addWarehouseProductHandler(fetchService).addWarehouseProduct,
    deleteWarehouse: deleteWarehouseHandler(fetchService).deleteWarehouse,
    createWarehouse: createWarehouseHandler(fetchService).createWarehouse,
    mutateWarehouse: mutateWarehouseHandler(fetchService).mutateWarehouse
  }
}
