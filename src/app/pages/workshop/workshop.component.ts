import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// import { WorkshopService } from './workshop.service';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent implements OnInit {

  constructor(
    // private workshopService: WorkshopService,
  ) { }

  ngOnInit() {
    // this.workshopService.getWorkshop(1);
    // this.workshopService.workshop.subscribe(data => console.log(data));
  }

}
