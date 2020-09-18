import { Component, OnInit, Input } from '@angular/core';
import { CatractService } from '../../services/catract.service';
import { Contract } from '../../models/contract';

@Component({
  selector: 'app-contract-creator',
  templateUrl: './contract-creator.component.html',
  styleUrls: ['./contract-creator.component.scss']
})
export class ContractCreatorComponent implements OnInit {


  @Input() id: string;
  data: Contract[];

  constructor(private contratserv: CatractService) { }

  ngOnInit(): void {
    this.contratserv.getAll().subscribe(value => {
      this.data = value.filter(value => this.id == value.creatorId);
      console.log(value.filter(value => this.id == value.creatorId));
    });
  }

}
