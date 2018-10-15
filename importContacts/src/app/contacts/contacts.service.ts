import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }
  contacts: any;

  setContacts(contactsData) {
     this.contacts = contactsData;
  }

  getContacts() {
    return this.contacts;
  }
}
