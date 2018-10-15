import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactService } from './contacts/contacts.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
