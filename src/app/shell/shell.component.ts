import { Component, inject, OnInit, signal } from '@angular/core';
import { ShellService } from '@app/shell/services/shell.service';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, NgClass],
})
export class ShellComponent implements OnInit {
  private readonly _shellService = inject(ShellService);
  private readonly _router = inject(Router);

  isSidebarActive = signal(false);

  ngOnInit() {
    // this._socketService.connect();
  }

  sidebarToggle(toggleState: boolean) {
    this.isSidebarActive.set(toggleState);
  }

  private _reloadCurrentRoute(path?: string) {
    const currentUrl = path || this._router.url;
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this._router.navigate([currentUrl]);
    });
  }
}
