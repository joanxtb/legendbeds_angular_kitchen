import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

// DOC: Decorator. This gives information to angular about this component
// like what's the html, what's the css, what injected components or services it has
// and how it will be called as component from others (in this case 'app-root')
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  authUser = inject(AuthService);
  //isLoggedIn = signal(this.authUser.authUser.isLoggedIn);

}
