import { Component, OnInit, Input } from '@angular/core';
import { IJournalEntry } from 'src/app/models/IJournalEntry';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  @Input() journalPhotos!: any[];
  masonryItems : any[] = [

  ];
  constructor(private journalService: JournalService) {

  }



  ngOnInit(): void {


    this.masonryItems = [
      { url: 'https://plantas-api.davidinformatico.com/assets/f513cd6e-806d-4f17-8331-3d6c7f136969' },
      { url: 'https://plantas-api.davidinformatico.com/assets/cd0eafee-0f2f-4f58-94d1-ff2712b3865e' },
      { url: 'https://plantas-api.davidinformatico.com/assets/f513cd6e-806d-4f17-8331-3d6c7f136969' },
    ]
  }
}
