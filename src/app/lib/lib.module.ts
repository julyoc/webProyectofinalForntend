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
import { ContractUserComponent } from './components/contract-user/contract-user.component';
import { ContractCreatorComponent } from './components/contract-creator/contract-creator.component';
import { CreadorItemComponent } from './components/creador-item/creador-item.component';
import { ContractItemComponent } from './components/contract-item/contract-item.component';
import { ContractReporteComponent } from './components/contract-reporte/contract-reporte.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    GraficComponent, 
    ContractUserComponent, 
    ContractCreatorComponent, 
    CreadorItemComponent, ContractItemComponent, ContractReporteComponent
  ],
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
    GraficComponent,
    ContractUserComponent,
    ContractCreatorComponent,
    CreadorItemComponent,
    ContractReporteComponent
  ]
})
export class LibModule { }
