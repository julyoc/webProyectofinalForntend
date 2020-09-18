import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CatractService } from '../../lib/services/catract.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-contract-new',
  templateUrl: './contract-new.component.html',
  styleUrls: ['./contract-new.component.scss']
})
export class ContractNewComponent implements OnInit {


  form: FormGroup;
  formArr: FormArray;

  constructor(private contracServ: CatractService, private actrute: ActivatedRoute, private ls: LocalStorageService, private rute: Router) { }

  ngOnInit(): void {

    this.actrute.queryParams.subscribe(value => {
      this.formArr = new FormArray([new FormControl('', [Validators.required])]);
      this.form = new FormGroup({
        userId: new FormControl(JSON.parse(this.ls.get('user')).uid),
        creatorId: new FormControl(value.id),
        name: new FormControl('', [Validators.required]),
        reqcant: new FormControl(1, [Validators.required, Validators.min(1)]),
        valid: new FormControl(false),
        precio: new FormControl()
      });
    });

  }

  configFormArr() {
    this.formArr = new FormArray([]);
    for (let i = 0; i < this.form.value.reqcant; i++) {
      this.formArr.push(new FormControl('', [Validators.required]));
    }
    this.form.removeControl('requerimientos');
    this.form.setControl('requerimientos', this.formArr);
  }

  submit() {
    const pr =this.form.value.reqcant*50;
    this.contracServ.add(this.form.value).subscribe(value => {
      console.log(value);
      this.rute.navigate(['/']);
    });
  }

}
