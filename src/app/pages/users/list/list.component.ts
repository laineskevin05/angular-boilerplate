import { Component, inject, OnInit, signal } from '@angular/core';
import { UseRandomUser } from '@core/usecases';
import { RandomUserEntity } from '@core/entities';
import { HotToastService } from '@ngxpert/hot-toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [CommonModule, ButtonModule],
})
export class ListComponent implements OnInit {
  private readonly _useRandomUser = new UseRandomUser();
  private readonly _toast = inject(HotToastService);

  users = signal<RandomUserEntity[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this._useRandomUser.getAllUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  userClicked() {
    this._toast.show('User clicked');
  }
}
