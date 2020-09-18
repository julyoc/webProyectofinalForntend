import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { CreatorService } from '../../lib/services/creator.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Creator } from '../../lib/models/creator';
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {


  role: string;
  adminrole: 'cre' | 'cli' | 'rep';
  form: FormGroup;
  data: Creator[];
  creatorid: string;

  constructor(private ls: LocalStorageService, private cre: CreatorService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      selec: new FormControl('', [Validators.required])
    });
    this.role = JSON.parse(this.ls.get('role'));
    console.log(this.role);
    this.cre.getAll().subscribe(value => {
      this.data=value;
    });
  }

  asCreador() {
    this.adminrole = 'cre';
    this.creatorid = this.form.value.selec;
  }

  asCliente() {
    this.adminrole = 'cli';
  }

  asRep() {
    this.adminrole = 'rep';
  }

}
