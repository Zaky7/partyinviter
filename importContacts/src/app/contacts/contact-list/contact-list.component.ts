import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: any;
  @Output() contactsFoundEvent = new EventEmitter<any>();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactsFound($event) {
    this.contacts = this.contactService.getContacts();
  }


}
