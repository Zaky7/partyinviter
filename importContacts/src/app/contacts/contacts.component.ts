import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactService } from './contacts.service';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';
import { ContactListComponent } from './contact-list/contact-list.component';
declare var gapi: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  constructor(private http: HttpClient, private contactService: ContactService) {}
  authConfig: any;
  contactsList: Contact[] = [];
  ContactsFound = true;
  ngOnInit() {

    this.ContactsFound = false;

    this.authConfig = {
      client_id:
        '137487034693-7jlkkn3rbhr2vp66f2n2uodfo7gan8is.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/contacts.readonly'
    };

  }

  fetchGoogleContacts() {
    gapi.client.setApiKey('AIzaSyC8ugCg_7KVs1If9l06d6luCMQk9GUIGUw');
    gapi.auth2.authorize(this.authConfig, this.handleAuthorization);
  }

  handleAuthorization = authorizationResult => {
    if (authorizationResult && !authorizationResult.error) {
      const url: string =
        'https://www.google.com/m8/feeds/contacts/default/thin?' +
        'alt=json&max-results=500&v=3.0&access_token=' +
        authorizationResult.access_token;
      console.log('Authorization success, URL: ', url);
      this.http.get<any>(url).subscribe(response => {
        if (response.feed && response.feed.entry) {
          // console.log(response.feed.entry);
          this.saveContacts(response.feed.entry);
        }
      });
    }
  }

  saveContacts(ContactEntry) {

    this.contactsList = [];

    ContactEntry.forEach((entry) => {
      // tslint:disable-next-line:prefer-const
      let contact: Contact = { email: '', name: '' };

      if (entry.gd$name !== undefined) {
        contact.name = entry.gd$name.gd$fullName.$t;
        // console.log('Name of contact: ' + contact.name);
      }

      if (Array.isArray(entry.gd$email)) {
        entry.gd$email.forEach((emailEntry) => {
          if (emailEntry.address !== undefined) {
           // console.log('Email of contact: ' + emailEntry.address);
            contact.email = emailEntry.address;
          }
        });
      }

      this.contactsList.push(contact);
    });

    this.ContactsFound = true;
    this.contactService.contactsArrived(this.contactsList);
    console.log(`Contacts List Length ${this.contactsList.length}`);

  }






}
