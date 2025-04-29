import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUser } from '../../model/autheticated.user.type';
//import { JsonPipe } from '@angular/common';
import { LineLoaderComponent } from '../../components/line-loader/line-loader.component';
import {
  CirclePlusIcon, LucideAngularModule, CircleIcon,
  CircleCheckIcon, CirclePowerIcon, BedIcon, MapIcon,
  PercentIcon, ShieldUserIcon,
  BookmarkIcon,
  ChartLineIcon,
  EllipsisVerticalIcon,
  Trash2Icon
} from 'lucide-angular';
import { TopRightMenuComponent } from '../../components/top-right-menu/top-right-menu.component';
import { PropertiesService } from '../../services/properties.service';
import { catchError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import * as _ from 'lodash';

import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { SelectedProperty } from '../../model/properties.type';
import { LocalService } from '../../services/localstorage.service';
import { ListItemComponent } from "../../components/properties/list-item/list-item.component";

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [/*JsonPipe,*/ LineLoaderComponent, LucideAngularModule, TopRightMenuComponent, ListItemComponent],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(60px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(30px)' })),
      ]),
    ])
  ]
})
export class PropertiesComponent implements OnInit {
  // DOC: Sagas  
  auth_saga = inject(AuthService);
  properties_saga = inject(PropertiesService);
  localStore = inject(LocalService);

  // DOC: State
  list = signal<any[]>([]);
  bootstrapped = signal(false);
  selected = signal<SelectedProperty>({});
  me = signal<AuthenticatedUser>({ isLoggedIn: true });
  loading = signal(true);

  readonly CirclePlusIcon = CirclePlusIcon;
  readonly CircleIcon = CircleIcon;
  readonly CirclePowerIcon = CirclePowerIcon;
  readonly CircleCheckIcon = CircleCheckIcon;
  readonly BedIcon = BedIcon;
  readonly MapIcon = MapIcon;
  readonly PercentIcon = PercentIcon;
  readonly ShieldUserIcon = ShieldUserIcon;
  readonly BookmarkIcon = BookmarkIcon;
  readonly ChartLineIcon = ChartLineIcon;
  readonly EllipsisVerticalIcon = EllipsisVerticalIcon;
  readonly TrashIcon = Trash2Icon;


  
  onSetMainProperty(p: any) {
    this.localStore.setData('lb.ip', JSON.stringify({
      IdProperty: p.IdProperty,
      Name: p.PropertyName,
      CheckIn: p.PropertyCheckIn,
      CheckOut: p.PropertyCheckOut,
    }));
    this.selected.set(JSON.parse(this.localStore.getData('lb.ip') || '{}'));
  }

  // Component lifecycle mount
  ngOnInit(): void {

    // Set myself available for the UI and my childrens
    this.auth_saga.authUser().subscribe((user_object) => {
      this.me.set(user_object);
    });

    this.selected.set(JSON.parse(this.localStore.getData('lb.ip') || '{}'));

    // Fetch my properties
    this.properties_saga.fetch_all()
      .pipe(catchError(({ error: { error } }) => {
        // This catches anything other than http code 200
        console.error({ error });
        this.loading.set(false);
        this.bootstrapped.set(true);
        throw error; // <-- this stops the observable chain
      })).subscribe((response: any) => {
        const { success, properties } = response;
        console.log({ properties });
        console.log({ keys: _.keys(_.first(properties)) });
        this.list.set(properties);
        this.loading.set(false);
        this.bootstrapped.set(true);
      });
  }

  // TODO: I need to implement the browser history back
  onBack(e: MouseEvent) {
    // e.preventDefault();
    // e.stopPropagation();
    // this.router.navigate(['..']);
    // this.router.navigate(['..'], { relativeTo: this.route });
  }
}
