import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibModule } from './lib/lib.module';
import { IndexComponent } from './routes/index/index.component';
import { CreatorComponent } from './routes/creator/creator.component';
import { CategComponent } from './routes/categ/categ.component';
import { ContractComponent } from './routes/contract/contract.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SubCategComponent } from './routes/sub-categ/sub-categ.component';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { AngularFireModule } from '@angular/fire';
import { credentials } from './credentials';
import { UsersComponent } from './routes/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    CreatorComponent,
    CategComponent,
    ContractComponent,
    SubCategComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    LibModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    AngularFireModule.initializeApp(credentials),
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
