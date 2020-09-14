import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faTools, faAtlas } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../lib/models/category';
import { CategoriaService } from '../../lib/services/categoria.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.scss']
})
export class CategComponent implements OnInit {


  icons = {
    faEdit,
    faTrash,
    faTools,
    faAtlas
  };
  page = 1;
  pageSize= 7;
  data: Category[];
  collectionSize: number;
  editForm: FormGroup;
  dtid: any;
  constructor(private categ: CategoriaService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  refresh() {
    try {
      console.log(this.pageSize, this.page)
      this.categ.len().subscribe(value => {
        this.collectionSize = value.len;
        this.categ.pag(this.pageSize, this.page).subscribe(value => {
          this.data= value;
          console.log(this.data, this.page);
        });
      });
    } catch (e) {
      throw e;
    }
  }
  
  ngOnInit(): void {
    this.refresh();
  }

  open(content, i?) {
    this.modalService.open(content);
    if (this.data[i]) {
      const dt = this.data[i];
      this.dtid = dt.id;
      this.editForm = new FormGroup({
        name: new FormControl(dt.name, [Validators.required]),
        description: new FormControl(dt.description, [Validators.required])
      });
      return;
    }
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  del() {
    this.editForm = null;
    this.dtid = null;
  }

  save() {
    if (this.dtid) {
      this.categ.update(this.dtid, this.editForm.value).subscribe(value => {
        console.log(value);
        this.refresh();
        this.del();
      });
      return;
    }
    this.categ.add(this.editForm.value).subscribe(value => {
      console.log(value);
      this.refresh();
      this.del()
    });
  }

  delete(id) {
    this.categ.delete(id).subscribe(value => {
      console.log(value);
      this.refresh();
    })
  }

}
