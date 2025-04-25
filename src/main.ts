import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// DOC: This tells angular: "hey, you need to render the App Component at the top
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
