import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grafic',
  templateUrl: './grafic.component.html',
  styleUrls: ['./grafic.component.scss']
})
export class GraficComponent implements OnInit {


  @Input() data: Array<{name: string, value: any}>;

  @Input() tipo: 'pie' | 'hbar' | 'vbar' | 'three' | 'piegrid' | 'apie';

  constructor(config: NgbModalConfig, private modalService: NgbModal) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }
  
  open(content) {
    this.modalService.open(content, {size: 'xl', centered: true, backdropClass: 'light-blue-backdrop'});
    console.log(this.data);
  }

}
