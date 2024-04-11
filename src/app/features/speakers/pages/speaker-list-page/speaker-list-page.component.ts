import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { SpeakerListComponent } from '../../components/speaker-list/speaker-list.component';
import { SpeakerDataService } from '../../services/speaker-data/speaker-data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { controlValue$ } from '../../../../core/forms/utils/control-value$';
import { RouterOutlet } from '@angular/router';
import { PaginatorComponent } from '../../../../core/tables/paginator/paginator.component';
import { FormGroup } from '@angular/forms';
import { BindQueryParamsFactory } from '@ngneat/bind-query-params';

@Component({
  selector: 'app-speaker-list-page',
  standalone: true,
  imports: [
    AsyncPipe,
    SpeakerListComponent,
    ReactiveFormsModule,
    RouterOutlet,
    PaginatorComponent,
  ],
  templateUrl: './speaker-list-page.component.html',
  styleUrl: './speaker-list-page.component.scss',
})
export class SpeakerListPageComponent {
  private readonly speakerDataService = inject(SpeakerDataService);
  private readonly queryParamBinder = inject(BindQueryParamsFactory);

  filters = new FormGroup({
    search: new FormControl<string>(''),
    page: new FormControl<number>(1),
  });

  bindQueryParams = this.queryParamBinder
    .create([{ queryKey: 'search' }, { queryKey: 'page', type: 'number' }])
    .connect(this.filters);

  speakers$ = this.speakerDataService.filteredSpeakers$(
    controlValue$(this.filters.controls.search),
    controlValue$(this.filters.controls.page)
  );

  onPage(offset: number) {
    const currentPage = this.filters.controls.page.value ?? 1;

    this.filters.controls.page.setValue(currentPage + offset);
  }
}
