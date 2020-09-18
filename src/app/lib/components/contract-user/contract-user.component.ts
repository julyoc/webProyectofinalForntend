import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../services/creator.service';
import { Creator } from '../../models/creator';
import { Category } from '../../models/category';
import { CategoriaService } from '../../services/categoria.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contract-user',
  templateUrl: './contract-user.component.html',
  styleUrls: ['./contract-user.component.scss']
})
export class ContractUserComponent implements OnInit {

  len: number;
  data: Creator[];
  form: FormGroup;
  categData: Category[];
  fildata: Category[];

  constructor(private creator: CreatorService, private categ: CategoriaService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      selec: new FormControl('', [Validators.required])
    });
    try {
      this.categ.getAll().subscribe(value => {
        this.categData = value;
        this.fildata = value;
      });
    } catch (error) {
      
    }
    try {
      this.creator.len().subscribe(value => {
        this.len = value.len;
      });
    } catch (error) {
      this.len = 0;
    }
    this.refresh();
  }

  refresh() {
    try {
      this.creator.getAll().subscribe(value => {
        this.data = value;
      });
    } catch (error) {
      
    }
  }

  submit() {
    this.fildata = this.data.filter(value => value.categories == this.form.value.selec);
  }

  vertodo() {
    this.fildata = this.data;
  }

}
