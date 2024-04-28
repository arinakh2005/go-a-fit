import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitProductService } from '../../sevices/fit-product.service';
import { FitProduct } from '../../types/FitProduct';
import { Subscription } from 'rxjs';
import { FitProductAvailability, FitProductAvailabilityStatus } from '../../enums/fit-product-availability.enum';
import { UserService } from '../../sevices/user.service';
import { MessageService } from 'primeng/api';
import { FitOrderService } from '../../sevices/fit-order.service';

@Component({
  selector: 'app-fit-products',
  templateUrl: './fit-products.component.html',
  styleUrl: './fit-products.component.scss'
})
export class FitProductsComponent implements OnInit, OnDestroy {
  public layout: 'list' | 'grid' = 'list';
  public fitProducts: FitProduct[] = [];
  public fitProductAvailability = FitProductAvailability;
  public fitProductAvailabilityStatus = FitProductAvailabilityStatus;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly fitProductService: FitProductService,
    private readonly fitOrderService: FitOrderService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.fitProductService.getFitProducts().subscribe((response) => {
      if (!response.status) return;

      this.fitProducts.push(...response.result);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public addProductToBracket(product: FitProduct): void {
    if (!this.userService.user) return;

    const previousBracketProducts = this.fitOrderService.bracketProducts?.length ? [...this.fitOrderService.bracketProducts] : [];
    const updatedBracketProducts = [...previousBracketProducts];
    const existedBracketProduct = previousBracketProducts.find((existedProduct) => existedProduct.id === product.id);

    if (existedBracketProduct) {
      this.messageService.add({ severity: 'info', summary: 'Товар вже додано до кошика' });
    } else {
      updatedBracketProducts.push({
        id: product.id,
        title: product.title,
        imageUrl: product.imageUrl,
        category: product.category,
        cost: product.cost,
        buyCost: product.cost,
        availableQty: product.quantity,
        userBuyQty: 1,
      });
    }

    this.fitOrderService.bracketProducts = updatedBracketProducts;
  }
}
