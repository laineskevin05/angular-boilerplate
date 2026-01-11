import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { environment } from '@env/environment';
import { filter } from 'rxjs/operators';
import { NavMode, ShellService } from '@app/shell/services/shell.service';
import { webSidebarMenuItems } from '@core/constants';
import { CredentialsService } from '@auth';
import { NavMenuItem } from '@core/interfaces';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [NgClass, RouterLink, TranslateModule],
})
export class SidebarComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _credentialsService = inject(CredentialsService);
  public shellService = inject(ShellService);

  version = signal(environment.version);
  year = signal(new Date().getFullYear());
  sidebarItems = signal<NavMenuItem[]>(webSidebarMenuItems);
  sidebarExtendedItem = signal(-1);
  navExpanded = signal(true);

  constructor() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.shellService.activeNavTab(this.sidebarItems(), this.sidebarExtendedItem());
      });

    this.shellService.navMode$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      this.navExpanded.set(mode === NavMode.Free);
    });
  }

  ngOnInit(): void {
    this.shellService.activeNavTab(this.sidebarItems(), this.sidebarExtendedItem());
  }

  toggleSidebar(isEnterEvent: boolean): void {
    this.shellService.navMode$.pipe(takeUntilDestroyed()).subscribe((mode) => {
      if (isEnterEvent) {
        this.navExpanded.set(true);
      } else if (!isEnterEvent && mode === NavMode.Free) {
        this.navExpanded.set(false);
      }
    });
  }

  activateSidebarItem(index: number): void {
    const items = this.sidebarItems();
    const item = items[index];
    if (item.disabled) return;

    if (index !== this.sidebarExtendedItem()) {
      this.sidebarExtendedItem.set(index);
    } else {
      this.sidebarExtendedItem.set(-1);
    }

    this.shellService.activateNavItem(index, this.sidebarItems());
  }

  activateSidebarSubItem(index: number, subItem: NavMenuItem): void {
    this.shellService.activateNavSubItem(index, subItem, this.sidebarItems());
  }
}
