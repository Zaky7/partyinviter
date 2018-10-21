import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {  BehaviorSubject, Subject } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';



@Injectable()
export class ContactService {
  contacts: Contact[] = [];
  private contactsSubject = new Subject<Contact[]>();
  contactArrived$ = this.contactsSubject.asObservable();

  constructor() {
  }

  contactsArrived(contacts: Contact[]) {
     console.log(`Contacts Arrived in Contact Service`);
     if (contacts) {
        this.contactsSubject.next(contacts);
     }
  }
}
