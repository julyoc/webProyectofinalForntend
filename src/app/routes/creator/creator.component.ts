import { Component, OnInit } from '@angular/core';
import { Creator } from '../../lib/models/creator';
import { faEdit, faTrash, faTools } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../lib/services/auth.service';
import { CreatorService } from '../../lib/services/creator.service';
import { CategoriaService } from '../../lib/services/categoria.service';
import { User } from '../../lib/models/user';
import { Category } from '../../lib/models/category';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  icons = {
    faEdit,
    faTrash,
    faTools
  };
  page = 1;
  pageSize= 4;
  collectionSize: number;
  data: Creator[];
  userid: User;
  users: User[];
  categorias: Category[];
  form: FormGroup;
  isedit: Creator;

  constructor(config: NgbModalConfig, 
    private modalService: NgbModal, 
    private actrute: ActivatedRoute, 
    private usr: AuthService, 
    private categ: CategoriaService,
    private creatorser: CreatorService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  refresh() {
    try {
      this.creatorser.len().subscribe(value => {
        this.collectionSize = value.len;
        this.creatorser.pag(this.pageSize, this.page).subscribe(value => {
          this.data = value;
        })
      })
    } catch (error) {
      throw error;
    }
  }
  
  ngOnInit(): void {
    this.refresh();
  }
  
  openWithUsr(content) {
    this.actrute.queryParams.subscribe(value => {
      if (value.id) this.usr.getUser(value.id).subscribe(value => {
        this.userid = value;
        if (value) this.open(content);
      });
    });
  }

  open(content, i?) {
    this.usr.getAllUsers().subscribe(value => {
      this.users = value.filter(value => value.customClaims.role === 'creator');
      this.categ.getAll().subscribe(value => {
        this.categorias = value;
        this.modalService.open(content);
        if (this.userid) {
          this.form = new FormGroup({
            userId: new FormControl(this.userid.uid, [Validators.required]),
            name: new FormControl(this.userid.customClaims.name, [Validators.required]),
            creations: new FormControl('', [Validators.required]),
            categories: new FormControl('', [Validators.required]),
            ciudad: new FormControl('', [Validators.required])
          });
          return;
        }
        if (this.data[i]) {
          this.isedit = this.data[i];
          this.form = new FormGroup({
            userId: new FormControl(this.data[i].userId, [Validators.required]),
            name: new FormControl(this.data[i].name, [Validators.required]),
            creations: new FormControl(this.data[i].creations, [Validators.required]),
            categories: new FormControl(this.data[i].categories, [Validators.required]),
            ciudad: new FormControl(this.data[i].ciudad, [Validators.required])
          });
          return;
        }
        this.form = new FormGroup({
          userId: new FormControl('', [Validators.required]),
          name: new FormControl('', [Validators.required]),
          creations: new FormControl('', [Validators.required]),
          categories: new FormControl('', [Validators.required]),
          ciudad: new FormControl('', [Validators.required])
        });
      });
    });
  }

  save() {
    if (this.isedit) {
      this.creatorser.update(this.isedit.id, this.form.value).subscribe(value => {
        console.log(value);
        this.edt();
        this.refresh();
      });
      return;
    }
    this.creatorser.add(this.form.value).subscribe(value => {
      console.log(value);
      this.edt();
      this.refresh();
    });
  }

  edt() {
    this.isedit = null;
  }

  delete(id) {
    this.creatorser.delete(id).subscribe(value => {
      console.log(value);
      this.refresh();
    })
  }

}
