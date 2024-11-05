import { Component } from '@angular/core';
import { GuestHeaderComponent } from "../guest-header/guest-header.component";
import { ContactInfoComponent } from "./contact-info/contact-info.component";
import { ContactMsgComponent } from "./contact-msg/contact-msg.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GuestHeaderComponent, ContactInfoComponent, ContactMsgComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
