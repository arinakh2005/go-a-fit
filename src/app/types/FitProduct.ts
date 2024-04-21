import { FitProductAvailability } from '../enums/fit-product-availability.enum';
import { FitProductCategory } from '../enums/fit-product-category.enum';

export type FitProduct = {
  id?: string,
  createdAt: string,
  updatedAt: string,
  deletedAt: string | null,
  title: string,
  description: string,
  category: FitProductCategory,
  imageUrl?: string,
  availabilityStatus: FitProductAvailability,
  quantity: number,
  rating: number,
  cost: number,
}