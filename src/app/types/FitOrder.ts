import { User } from './User';
import { FitProduct } from './FitProduct';
import { FitOrderStatus } from '../enums/fit-order-status.enum';

export type FitOrder = {
  id?: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  comment: string,
  user?: User,
  fitProducts: FitProduct[],
}

export type FitOrderUpsert = {
  comment?: string,
  status?: FitOrderStatus,
  fitOrderProducts: FitOrderProduct[],
  userId: string,
}

export type FitOrderProduct = {
  productId: string,
  quantity: number,
}