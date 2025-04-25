import { Component, input } from '@angular/core';
import { AuthenticatedUser } from '../../model/autheticated.user.type';
import { LucideAngularModule, ChevronDownIcon } from 'lucide-angular';

@Component({
  selector: 'app-top-right-menu',
  imports: [LucideAngularModule],
  templateUrl: './top-right-menu.component.html',
  styleUrl: './top-right-menu.component.scss'
})
export class TopRightMenuComponent {
  me = input.required<AuthenticatedUser>({});
  readonly ChevronDownIcon = ChevronDownIcon;
  popMenu(e:MouseEvent){}

}
