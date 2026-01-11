import { Component, inject, signal } from '@angular/core';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageSelectorComponent } from '@app/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [LanguageSelectorComponent, TranslateModule, ButtonModule, CommonModule],
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _authService = inject(AuthenticationService);

  version = signal<string | null>(environment.version);

  login() {
    this._authService
      .login({
        username: 'johndoe',
        password: '123456',
      })
      .pipe(takeUntilDestroyed())
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
