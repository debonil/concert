import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JourneyplannerModule } from './journeyplanner/journeyplanner.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { ServicesModule } from './services/services.module';
import { MyMaterialComponentsModule } from './my-material-components/my-material-components.module';
import { CancellationModule } from './cancellation/cancellation.module';
import { ModificationModule } from './modification/modification.module';
import { MyAccountModule } from './my-account/my-account.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule, ReactiveFormsModule,
    MyMaterialComponentsModule,
    JourneyplannerModule,
    EnquiriesModule,
    CancellationModule,
    ModificationModule,
    MyAccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
