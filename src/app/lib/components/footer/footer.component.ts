import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


const roles = ['admin', 'creator', 'client'];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  role = roles;
  form: FormGroup;
  formreg: FormGroup;
  isl: boolean = false;
  isloged: boolean = false;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private auth: AuthService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.formreg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl(this.role[2], [Validators.required])
    });
    try {
      this.auth.authorize().subscribe(value => {
        console.log(value);
        if (value.id) this.isloged = true;
      });
    } catch (e) {
      this.isloged = false;
      throw e;
    }
  }

  change(isl: boolean) {
    this.isl = isl;
  }

  open(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop', centered: true});
  }

  sendForm() {
    this.auth.login(this.form.value.email, this.form.value.password, () => {
      console.log('ha iniciado session');
      this.isloged=true;
    });
    this.form = null;
  }

  sendFormreg() {
    this.auth.register(this.formreg.value).subscribe(value => {
      console.log(value);
      this.auth.login(this.formreg.value.email, this.formreg.value.password, () => {
        this.isloged=true;
      });
    });
    this.form = null;
  }

  logOut() {
    this.auth.logout();
    this.isloged=false;
  }

}
