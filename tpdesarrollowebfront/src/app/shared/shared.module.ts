import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule, 
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductCardComponent,
  ]
})
export class SharedModule {}
