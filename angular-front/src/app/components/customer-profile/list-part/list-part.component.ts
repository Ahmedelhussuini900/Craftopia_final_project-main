import { Component, Output , EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-list-part',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './list-part.component.html',
  styleUrl: './list-part.component.css'
})
export class ListPartComponent {
  @Output() linkClicked = new EventEmitter<string>();

  // Emit the component identifier when a link is clicked
  onLinkClick(component: string) {
    this.linkClicked.emit(component);
  }



}
