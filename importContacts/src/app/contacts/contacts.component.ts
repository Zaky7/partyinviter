import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact-list/contact.model';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './contacts.service';
declare var gapi: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  constructor(private http: HttpClient, private contactService: ContactService) {}
  authConfig: any;
  contactList: any;
  @Output() valueChange: EventEmitter<any>  = new EventEmitter();

  ngOnInit() {
    this.authConfig = {
      client_id:
        '137487034693-7jlkkn3rbhr2vp66f2n2uodfo7gan8is.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/contacts.readonly'
    };
  }

  googleContacts() {
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
          console.log(response.feed.entry);
          this.saveContacts(response.feed.entry);
        }
      });
    }
  }

  saveContacts(ContactEntry) {

    this.contactList = [];

    ContactEntry.forEach((entry)=> {
      //console.log(entry.gd$name);
      var contact = {
        name: '',
        email: ''
      };

      if(entry.gd$name != undefined) {
        contact.name = entry.gd$name.gd$fullName.$t;
        console.log("Name of contact: " + contact.name);
      }

      if(Array.isArray(entry.gd$email)) {
         entry.gd$email.forEach((emailEntry) => {
         var email;
         if(emailEntry.address != undefined) {
             console.log("Email of contact: " + emailEntry.address);
             email = emailEntry.address
         }
         contact.email = email;
      });

         this.contactList.push(contact);
      }

    });

    console.log(this.contactList);
    this.contactService.setContacts(this.contactList);
  }
}
