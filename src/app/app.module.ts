import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent, ThemeDialogComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { JourneyplannerModule } from './journeyplanner/journeyplanner.module';
import { EnquiriesModule } from './enquiries/enquiries.module';
import { ServicesModule } from './services/services.module';
import { DtcTxnComponent } from './dtc-txn/dtc-txn.component';
import { MyMaterialComponentsModule } from './my-material-components/my-material-components.module';
import { CancellationComponent } from './cancellation/cancellation.component';
import { ModificationComponent } from './modification/modification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, ThemeDialogComponent,
    FooterComponent,
    DtcTxnComponent,
    CancellationComponent,
    ModificationComponent
  ],
  entryComponents: [ThemeDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ServicesModule,
    FormsModule, ReactiveFormsModule,
    MyMaterialComponentsModule,
    JourneyplannerModule,
    EnquiriesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
