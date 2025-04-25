import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthenticatedUser } from '../../model/autheticated.user.type';
//import { JsonPipe } from '@angular/common';
import { LineLoaderComponent } from '../../components/line-loader/line-loader.component';
import { CirclePlusIcon, LucideAngularModule } from 'lucide-angular';
import { TopRightMenuComponent } from '../../components/top-right-menu/top-right-menu.component';
import { PropertiesService } from '../../services/properties.service';
import { catchError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [/*JsonPipe,*/ LineLoaderComponent, LucideAngularModule, TopRightMenuComponent],
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

  // DOC: State
  list = signal<any[]>([]);
  bootstrapped = signal(false);
  me = signal<AuthenticatedUser>({ isLoggedIn: true });
  loading = signal(true);

  readonly CirclePlusIcon = CirclePlusIcon;

  onSetMainProperty(e: MouseEvent, p: any) {
    /*
    localStorage.setItem('lb.ip', JSON.stringify(_.pick(p, 'IdProperty', 'Name', 'CheckIn', 'CheckOut', 'LogoUrl')));
                                this.forceUpdate();
    */
  }

  // Component lifecycle mount
  ngOnInit(): void {
    
    // Set myself available for the UI and my childrens
    this.auth_saga.authUser().subscribe((user_object) => {
      this.me.set(user_object);
    });

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
