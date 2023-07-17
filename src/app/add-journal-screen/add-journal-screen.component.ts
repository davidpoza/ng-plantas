import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Location} from '@angular/common';
import moment from 'moment';
import {  ActivatedRoute, Params, Router } from '@angular/router';

import { IPlant } from '../models/Iplant';
import { IJournalEntry, JournalEntryType } from '../models/IJournalEntry';
import { TranslateJournalTypePipe } from '../pipes/translate-journal-type.pipe';
import { JournalService } from '../services/journal.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadfileService } from '../services/uploadfile.service';

@Component({
  selector: 'app-add-journal-screen',
  templateUrl: './add-journal-screen.component.html',
  styleUrls: ['./add-journal-screen.component.scss']
})
export class AddJournalScreenComponent implements OnInit {
  journalEntryType = JournalEntryType;
  plant!: IPlant;
  journalEntry!: IJournalEntry;
  type!: JournalEntryType;
  journalForm! : FormGroup;
  isEdit: boolean;
  activeRoutePath!: string;
  selectedFile: any = null;

  constructor(
    private _location: Location,
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private translateJournalType: TranslateJournalTypePipe,
    private journalService: JournalService,
    private authService : AuthService,
    private loaderService: LoaderService,
    private _snackBar: MatSnackBar,
    private uploadService: UploadfileService
  ) {
    this.activeRoutePath = this.router.url;
    this.isEdit = this.activeRoutePath.startsWith('/edit-journal');


    if (this.isEdit) {
      this.journalEntry = <IJournalEntry>this.router.getCurrentNavigation()?.extras.state?.['entry'];
      this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state?.['plant'];

    } else {
      this.plant = <IPlant>this.router.getCurrentNavigation()?.extras.state;
    }

    this.journalForm = this.initForm();
  }

  initForm() : FormGroup {
    if (!this.isEdit) {
      this.route.params.subscribe((params: Params) => {
        this.type = params['type'];
      });
    } else {
      this.type = this.journalEntry.type;
    }

    return this.fb.group({
      date: [this.isEdit ? moment(this.journalEntry.timestamp * 1000) : moment(), [Validators.required]],
      text: [
        this.isEdit
          ? this.journalEntry.text
          : `${this.translateJournalType.transform(this.type)} realizado a las ${moment().format('HH:mm')}`,
        [Validators.required]],
      photo: ['', []]
    })
  }

  ngOnInit() {

  }

  goBack() {
    this._location.back();
  }


  addJournal() {
    if (this.isEdit) {
      this.loaderService.setVisibility(true);
      this.journalService.editJournalEntry(this.journalEntry.id, {
        plantId: this.plant.id,
        text: this.journalForm.get('text')?.value,
        type: this.journalEntry.type,
        timestamp: moment(this.journalForm.get('date')?.value, 'DD/MM/YYYY').unix(),
      })
        .subscribe({
          next: result => {
            this.loaderService.setVisibility(false);
            this._location.back();
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });
    } else {
      this.loaderService.setVisibility(true);

      this.journalService.addJournalEntry({
        plantId: this.plant.id,
        text: this.journalForm.get('text')?.value,
        type: this.type,
        timestamp: moment(this.journalForm.get('date')?.value, 'DD/MM/YYYY').unix(),
      })
        .subscribe({
          next: result => {
            this.loaderService.setVisibility(false);
            if (this.type === JournalEntryType.photo) {
              const form = new FormData();
              form.append('file', this.journalForm.get('photo')?.value);
              this.uploadService.upload(form)
                .subscribe({
                  next: imageResult => {
                    this.journalService.editJournalEntry(result.id, { photo: imageResult.id })
                      .subscribe({
                        error: (e: string) => {
                          this.loaderService.setVisibility(false);
                          this._snackBar.open(e, "OK", { duration: 3000 });
                        }
                      })
                  },
                  error: (e: string) => {
                    this.loaderService.setVisibility(false);
                    this._snackBar.open(e, "OK", { duration: 3000 });
                  }
                });
            }
            this._location.back();
          },
          error: (e: string) => {
            this.loaderService.setVisibility(false);
            this._snackBar.open(e, "OK", { duration: 3000 });
          }
        });

    }

  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] ?? null;
      this.selectedFile = file;
      this.journalForm.patchValue({
        photo: file
      });
    }

  }
}
