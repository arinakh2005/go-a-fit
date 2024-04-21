import { Component, OnDestroy, OnInit } from '@angular/core';
import { FitProductService } from '../../sevices/fit-product.service';
import { FitProduct } from '../../types/FitProduct';
import { Subscription } from 'rxjs';
import { FitProductAvailability, FitProductAvailabilityStatus } from '../../enums/fit-product-availability.enum';

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

  constructor(private fitProductService: FitProductService) { }

  public ngOnInit(): void {
    this.subscriptions.push(this.fitProductService.getFitProducts().subscribe((response) => {
      if (!response.status) return;

      this.fitProducts.push(...response.result);
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
