import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, faTools } from '@fortawesome/free-solid-svg-icons';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../lib/models/user';
import { AuthService } from '../../lib/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const roles = ['admin', 'creator', 'client'];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  icons = {
    faEdit,
    faTrash,
    faTools
  };
  page = 1;
  pageSize= 7;
  collectionSize: number;
  data: User[];
  dataAll: User[];
  dtid: any;
  creatorForm: FormGroup;
  role = roles;
  repdata: Array<{name: string, value: any}>;;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private usr: AuthService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  refresh() {
    this.usr.getAllUsers().subscribe(value => {
      console.log(value);
      this.data = value;
      this.dataAll = value;
      this.repdata = [];
      this.repdata.push({name: 'admin', value: value.filter(value => value.customClaims.role === 'admin').length});
      this.repdata.push({name: 'client', value: value.filter(value => value.customClaims.role === 'client').length});
      this.repdata.push({name: 'creator', value: value.filter(value => value.customClaims.role === 'creator').length});
    });
  }

  onlyAdmin() {
    this.data = this.dataAll.filter(value => {
      if (value.customClaims.role === "admin") return true;
      return false;
    })
  }

  onlyClient() {
    this.data = this.dataAll.filter(value => {
      if (value.customClaims.role === "client") return true;
      return false;
    })
  }

  onlyCreator() {
    this.data = this.dataAll.filter(value => {
      if (value.customClaims.role === "creator") return true;
      return false;
    })
  }

  viewAll() {
    this.data = this.dataAll;
  }

  ngOnInit(): void {
    this.refresh();
  }

  open(content, i?) {
    this.modalService.open(content);
    if (this.data[i]) {
      const dt = this.data[i];
      this.dtid = dt.uid;
      this.creatorForm = new FormGroup({
        name: new FormControl(dt.customClaims.name, [Validators.required]),
        email: new FormControl(dt.email, [Validators.required, Validators.email]),
        username: new FormControl(dt.customClaims.username, [Validators.required]),
        role: new FormControl(dt.customClaims.role, [Validators.required])
      });
      return;
    }
    this.creatorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl(roles[2], [Validators.required])
    });
  }

  del() {
    this.creatorForm = null;
    this.dtid = null;
  }

  save() {
    if (this.dtid) {
      var dd = this.creatorForm.value;
      dd['uid']=this.dtid;
      this.usr.updateUser(dd).subscribe(value => {
        console.log(value);
        this.refresh();
        this.del();
      });
      return;
    }
    this.usr.register(this.creatorForm.value).subscribe(value => {
      console.log(value);
      this.refresh();
      this.del();
    })
  }

}
