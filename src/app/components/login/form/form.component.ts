import { CommonModule } from '@angular/common';
import { Component, input, signal, inject } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { LucideAngularModule, AtSignIcon, LockIcon, EyeClosedIcon, EyeIcon, LoaderCircleIcon } from 'lucide-angular';
import { NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalService } from '../../../services/localstorage.service';
import { AuthenticatedUser, AuthenticatedUserProperty } from '../../../model/autheticated.user.type';

// Decorator
@Component({
  selector: 'app-form',
  imports: [CommonModule, LogoComponent, RouterLink, LucideAngularModule, NgbPopoverModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  // DOC: Angular data-binding
  // This is basically const [wrongEmail, setWrongEmail] = useState(false)  
  wrongEmail = signal(false);
  wrongEmailMessage = signal('Email invalido');
  wrongPasswordMessage = signal('Contraseña invalida');
  wrongPassword = signal(false);
  passwordVisible = signal(false);
  microTransac = signal(false);
  form = signal({
    // TODO: this is preloading.
    email: 'joanxtb@gmail.com',
    password: 'cambiame'
  });
  readonly AtSignIcon = AtSignIcon;
  readonly LockIcon = LockIcon;
  readonly EyeClosedIcon = EyeClosedIcon;
  readonly EyeIcon = EyeIcon;
  readonly LoaderCircleIcon = LoaderCircleIcon;
  //


  auth_saga = inject(AuthService);
  router = inject(Router);
  localStore = inject(LocalService);

  // DOC: This comes from the parent page / component
  // It tells angular that it can (and should) receive 
  // something from outside. (React => props)
  title = input();

  // HANDLERS
  onToggleVisiblePassword(e: MouseEvent) {
    // DOC: updte the signal with a set
    // this is basically useState(passwordVisible, setPasswordVisible)    
    this.passwordVisible.set(!this.passwordVisible());
  }
  onClick(e: SubmitEvent, popoverEmail: NgbPopover, popoverPassword: NgbPopover) {
    e.preventDefault();


    // Reset form validation classes
    this.wrongEmail.set(false);
    this.wrongPassword.set(false);

    // Form values
    const emailInput = (document.getElementById('txtEmail') as HTMLInputElement)?.value;
    const passwordInput = (document.getElementById('txtPassword') as HTMLInputElement)?.value;

    // Form validation
    if (!emailInput) {
      this.wrongEmail.set(true);
      this.wrongEmailMessage.set('Email requerido');
      popoverEmail?.open();
      return;
    }
    if (!passwordInput) {
      this.wrongPassword.set(true);
      this.wrongPasswordMessage.set('Contraseña requerida');
      popoverPassword?.open();
      return;
    }
    //

    // spinner
    this.microTransac.set(true);

    // Observer pattern (RxJS)    
    this.auth_saga.login(emailInput, passwordInput)
      .pipe(catchError(({ error: { error } }) => {
        // This catches anything other than http code 200
        console.error({ error });
        this.wrongEmail.set(true);
        this.wrongPassword.set(true);
        this.microTransac.set(false);
        this.wrongEmailMessage.set('Email o Contraseña incorrectos');
        popoverEmail?.open();
        throw error; // <- This prevents the pipe to continue
      }))
      .subscribe((response: any) => {
        const { success, family } = response;
        if (success) {
          let user = family[0];
          // Decrypt          
          this.auth_saga.humanize(user);
          // Persist localstorage data
          let persistedProperty: AuthenticatedUserProperty = {
            id: user.IdProperty,
            name: user.PropertyName,
            check_in: user.PropertyCheckIn,
            check_out: user.PropertyCheckOut
          }
          let persistedUser: AuthenticatedUser = {
            id: user.IdUser,
            staff: user.IdStaff,
            email: user.Email,
            name: `${user.FirstName} ${user.LastName}`,
            token: user.Token,
            isLoggedIn: true,
            property: persistedProperty
          }
          this.auth_saga.persist(persistedUser);

          // This is to make things faster
          this.localStore.setData('legendbeds.authtoken', user.Token);

          if (user.IdProperty && user.IdStaff) {
            // Persist some info about the property this person is working on
            this.localStore.setData('lb.ip', JSON.stringify({
              IdProperty: user.IdProperty,
              Name: user.PropertyName,
              CheckIn: user.PropertyCheckIn,
              CheckOut: user.PropertyCheckOut,
            }));
            this.router.navigate([`/dashboard/${user.IdProperty}`]);
          } else this.router.navigate(['/properties']);
        } else {
          // TODO: show some error message
        }
      });
  }
}
