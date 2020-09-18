import { Component, OnInit } from '@angular/core';
import { CreatorService } from '../../services/creator.service';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-contract-reporte',
  templateUrl: './contract-reporte.component.html',
  styleUrls: ['./contract-reporte.component.scss']
})
export class ContractReporteComponent implements OnInit {

  data: Array<{name: string, series: Array<{name: string, value: any}>}>=[];
  constructor(private categserv: CategoriaService, private creatorserv: CreatorService) { }

  ngOnInit(): void {
    this.categserv.getAll().subscribe(categ => {
      this.creatorserv.getAll().subscribe(creator => {
        const crea = creator.map(value => {
          var v = value;
          v['categories']=categ.find(valu => valu.id == value.categories).name;
          return v;
        });
        console.log(crea);
        var ciudadArr: string[] = [];
        var categArr: string[] = [];
        crea.forEach(elem => {
          if (!ciudadArr.find(value => value == elem.ciudad)) ciudadArr.push(elem.ciudad);
        });
        ciudadArr.forEach(elem => {
          crea.forEach(elem2 => {
            if (elem === elem2.ciudad) {
              if (!categArr.find(value => value == elem2.categories.toString())) categArr.push(elem2.categories.toString());
            }
          });
        });
        console.log(ciudadArr, categArr);
        var dd: any[] = [];
        ciudadArr.forEach(elem => {
          var data: {name: string, series: Array<{name: string, value: any}>} = {name: elem, series: []};
          var serie: Array<{name: string, value: any}> = [];
          categArr.forEach(elem1 => {
            var dat: {name: string, value: any} = {name: elem1, value: 0}
            crea.forEach(elem2 => {
              if (elem2.categories === elem1 && elem === elem2.ciudad) dat.value = dat.value +1;
            });
            if (dat.value != 0) serie.push(dat);
          });
          data.series = serie;
          dd.push(data);
        });
        Object.assign(this, {data: dd});
        console.log(this.data);
      });
    });
  }

}
