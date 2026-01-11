import { Component, signal } from '@angular/core';
import { LanguageSelectorComponent } from '@app/i18n';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [LanguageSelectorComponent, TranslateModule],
})
export class HeaderComponent {
  menuHidden = signal(true);
}
