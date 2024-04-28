import { Component, OnInit } from '@angular/core';
import { UserService } from '../../sevices/user.service';
import { BracketProduct } from '../../types/FitProduct';
import { FitOrderService } from '../../sevices/fit-order.service';
import { FitOrderUpsert } from '../../types/FitOrder';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-bracket',
  templateUrl: './user-bracket.component.html',
  styleUrl: './user-bracket.component.scss',
})
export class UserBracketComponent implements OnInit {
  public bracketProducts: BracketProduct[] = [];
  public totalSum = 0;

  constructor(
    private readonly userService: UserService,
    private readonly fitOrderService: FitOrderService,
    private readonly messageService: MessageService,
  ) { }

  public ngOnInit(): void {
    if (!this.userService.user) return;

    this.bracketProducts = Array.isArray(this.fitOrderService.bracketProducts)
      ? [...this.fitOrderService.bracketProducts]
      : [];
    this.updateTotalSum();
  }

  public changeProductQuantity(product: BracketProduct, mode: 'increase' | 'decrease'): void {
    switch (mode) {
      case 'increase':
        if (product.userBuyQty >= product.availableQty) {
          this.messageService.add({ severity: 'info', summary: `В наявності - ${product.availableQty} одиниць`});
          return;
        }
        product.userBuyQty++;
        break;
      case 'decrease':
        if (product.userBuyQty <= 1) return;
        product.userBuyQty--;
        break;
    }

    product.buyCost = product.cost * product.userBuyQty;
    this.updateTotalSum();
    this.fitOrderService.bracketProducts = [...this.bracketProducts];
  }

  public removeProductFromBracket(product: BracketProduct): void {
    this.bracketProducts = this.bracketProducts.filter((bracketProduct) => bracketProduct.id !== product.id);
    this.fitOrderService.bracketProducts = [...this.bracketProducts];
    this.updateTotalSum();
  }

  public updateTotalSum(): void {
    this.totalSum = this.bracketProducts.reduce((total, bracketProduct) => total + bracketProduct.buyCost, 0);
  }

  public createOrder(): void {
    if (!this.userService.user) return;

    if (this.userService.user.fitCentAmount < this.totalSum) {
      this.messageService.add({ severity: 'error', summary: 'Недостатньо бонусних коштів' });
      return;
    }

    const fitOrderToCreate: FitOrderUpsert = {
      fitOrderProducts: this.bracketProducts?.map((product) => {
        return { productId: product.id, quantity: product.userBuyQty };
      }) || [],
      userId: this.userService.user.id,
    };

    this.fitOrderService.createFitOrder(fitOrderToCreate).subscribe((response) => {
      if (response.status === 'success') {
        this.userService.user = response.result;
        this.messageService.add({ severity: response.status, summary: 'Замовлення прийнято. Отримання на Вашому наступному зайнятті відвовідно до розкладу' });
      } else {
        this.messageService.add({ severity: response.status, summary: response.message || 'Помилка створення замовлення' });
      }
    });
  }
}
