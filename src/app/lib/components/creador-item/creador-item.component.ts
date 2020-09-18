import { Component, Input, OnInit } from '@angular/core';
import { Creator } from '../../models/creator';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creador-item',
  templateUrl: './creador-item.component.html',
  styleUrls: ['./creador-item.component.scss']
})
export class CreadorItemComponent implements OnInit {

  @Input() data: Creator;
  icons = {
    adress: faAddressCard
  }

  constructor(private rute: Router) { }

  ngOnInit(): void {
  }

  selec(id) {
    this.rute.navigate(['/', 'contract', 'new'], {queryParams: {id}});
  }

}
