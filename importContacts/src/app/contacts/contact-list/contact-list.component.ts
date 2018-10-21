import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { ContactService } from '../contacts.service';

import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Input('contacts') _contacts: Contact[];

  subscription: Subscription;

  constructor(private contactService: ContactService, private _ngzone: NgZone) {
  }

  get contacts() {
    return this._contacts;
  }

  set contacts(contacts) {
    this._contacts = contacts;
  }

  ngOnInit() {
    this.subscription = this.contactService.contactArrived$.subscribe(data => {
      console.log(data);
      this._ngzone.run(() => {
        this._contacts = data;
      });

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
