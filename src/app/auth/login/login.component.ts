import { Component, inject, signal, DestroyRef } from '@angular/core';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageSelectorComponent } from '@app/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LanguageSelectorComponent, TranslateModule, ButtonModule, InputTextModule, PasswordModule, CheckboxModule, CommonModule, FormsModule],
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthenticationService);
  private readonly _destroyRef = inject(DestroyRef);

  version = signal<string | null>(environment.version);
  rememberMe = signal<boolean>(false);

  login() {
    this._authService
      .login({
        username: 'johndoe',
        password: '123456',
      })
      // .pipe(takeUntil(this._destroyRef.onDestroy))
      .subscribe({
        next: (res) => {
          if (res) {
            console.log('Login successful');
            this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/dashboard'], { replaceUrl: true }).then(() => {
              console.log('Navigated to dashboard');
            });
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        },
      });
  }
}
