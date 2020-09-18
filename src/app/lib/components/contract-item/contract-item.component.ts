import { Component, OnInit, Input } from '@angular/core';
import { CatractService } from '../../services/catract.service';
import { Contract } from '../../models/contract';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-contract-item',
  templateUrl: './contract-item.component.html',
  styleUrls: ['./contract-item.component.scss']
})
export class ContractItemComponent implements OnInit {

  @Input() data: Contract;
  form: FormGroup;
  issubmit: boolean=false;

  constructor(private contratserv: CatractService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      precio: new FormControl(this.data.precio || 0),
      valid: new FormControl(true)
    });
  }

  onSubmit() {
    this.issubmit = true;
    this.contratserv.update(this.data.id, this.form.value).subscribe(value => {
      console.log(value);
    })
  }

}
