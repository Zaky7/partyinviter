import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from '../contacts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() contacts: any = [];


  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }
}
