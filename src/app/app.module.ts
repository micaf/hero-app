import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';

//Material
import { MaterialModule } from 'src/shared/material.module';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroFormComponent } from './components/hero-form/hero-form.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';

// Services && Interceptor
import { InMemoryDataService } from 'src/shared/services/in-memory-data.service';
import { ErrorInterceptor } from 'src/shared/interceptors/error-interceptor';
import { HeroService } from 'src/shared/services/hero.service';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroFormComponent,
    HeroesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }),
    SharedModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
