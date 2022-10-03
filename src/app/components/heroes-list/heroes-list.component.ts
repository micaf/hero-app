import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from 'src/shared/interfaces/hero';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'description', 'actions'];
  @Input() heroes: Hero[] = [];
  @Output() addHero = new EventEmitter<any>();
  @Output() editHero = new EventEmitter<number>();
  @Output() deleteHero = new EventEmitter<number>();

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  dataSource = new MatTableDataSource<Hero>();

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = this.heroes;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
