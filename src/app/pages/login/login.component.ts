import { Component, inject, OnInit, signal } from '@angular/core';
import { DarkOverlayComponent } from '../../components/dark-overlay/dark-overlay.component';
import { FormComponent } from '../../components/login/form/form.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [DarkOverlayComponent, FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  auth_saga = inject(AuthService);
  bootstrapped = signal(false);

  // DOC: Component lifecycle (mount | hook useEffect([]))
  ngOnInit(): void {
    // Here I want to tap into the isLoggedIn of the auth service, 
    // and if its already logged in, redirect to somewhere else accordingly
    this.auth_saga.isLoggedIn().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // Redirect to dashboard or any other page
        this.auth_saga.authUser().subscribe((user_object) => {
          console.log({ user_object });
          if (user_object?.property?.id) {
            window.location.href = `/dashboard/${user_object.property.id}`;
          } else window.location.href = '/properties';
        });
      } else {
        // This is to prevent the blink of the login form component
        this.bootstrapped.set(true);
      }
    });
  }
}
