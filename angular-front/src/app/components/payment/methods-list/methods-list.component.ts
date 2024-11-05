import { Component } from '@angular/core';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-methods-list',
  standalone: true,
  imports: [],
  templateUrl: './methods-list.component.html',
  styleUrl: './methods-list.component.css'
})
export class MethodsListComponent {
  @Output() linkClicked = new EventEmitter<string>();

  // Emit the component identifier when a link is clicked
  onLinkClick(component: string) {
    this.linkClicked.emit(component);
  }
}
