import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { GraficComponent } from './components/grafic/grafic.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, GraficComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    GraficComponent
  ]
})
export class LibModule { }
