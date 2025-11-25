import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Carrito } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) {}

  // Obtener carrito usando el token del usuario logueado
  getCartByUserToken(): Observable<any> {
    return this.http.get(environment.api.carts.byUserToken);
  }

  // Agregar producto al carrito
  createCart(cart: Carrito): Observable<any> {
    return this.http.post(environment.api.carts.create, cart);
  }

  // Realizar checkout
  checkout(): Observable<any> {
    return this.http.post(environment.api.carts.checkout, {});
  }
}
