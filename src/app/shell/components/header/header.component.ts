import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguageSelectorComponent } from '@app/i18n';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [LanguageSelectorComponent, TranslateModule, CommonModule, RouterLink],
})
export class HeaderComponent {
  private readonly _router = inject(Router);

  menuHidden = signal(true);
  showUserMenu = signal(false);

  toggleUserMenu() {
    this.showUserMenu.update((val) => !val);
  }

  closeUserMenu() {
    this.showUserMenu.set(false);
  }
}
