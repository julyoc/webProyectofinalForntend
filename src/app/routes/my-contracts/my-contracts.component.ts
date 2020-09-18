import { Component, OnInit } from '@angular/core';
import { CatractService } from '../../lib/services/catract.service';
import { Contract } from '../../lib/models/contract';
import { LocalStorageService } from 'ngx-localstorage';
import { CreatorService } from '../../lib/services/creator.service';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.scss']
})
export class MyContractsComponent implements OnInit {


  data: Contract[];

  constructor(private contractServ: CatractService, private ls: LocalStorageService, private crea: CreatorService) { }

  ngOnInit(): void {
    this.contractServ.getAll().subscribe(value => {
      this.crea.getAll().subscribe(creador => {
        this.data = value.filter(value => value.userId == JSON.parse(this.ls.get('user')).uid).map(value => {
          var v = value;
          v.creatorId = creador.find(cr => cr.id == value.creatorId).name;
          return v;
        });
      });
    })
  }

}
