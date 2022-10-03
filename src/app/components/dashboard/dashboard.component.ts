import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/shared/interfaces/hero';
import { HeroService } from 'src/shared/services/hero.service';
import { MessageDialogService } from 'src/shared/services/message-dialog.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[];
  showTemplate: boolean = false;

  constructor(private heroService: HeroService,
    private router: Router,
    private messagDialog: MessageDialogService) {
    this.heroes = [];
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.showTemplate = false;
    this.heroService.getHeroes().subscribe(heroes => {
      this.showTemplate = true;
      this.heroes = heroes ? heroes : [];
    });
  }

  addHero() {
    this.router.navigate(['/heroForm'])
  }

  editHero(id: number) {
    this.router.navigate(['/heroForm', { id: id }])
  }

  deleteHero(id: number) {
    this.confirmDeleteDialog(id);
  }

  confirmDeleteDialog(id: number) {
    this.messagDialog
      .confirmDialog({
        title: 'Delete Hero',
        message: "Are you sure you want to delete this hero?",
        confirmCaption: 'Confirm',
        showCancelOption: true,
        cancelCaption: "Cancel"
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.delete(id);
        }
      });
  }

  delete(id: number) {
    this.showTemplate = false;
    this.heroService.deleteHero(id).subscribe(() => {
      this.heroes = this.heroes.filter(hero => hero.id !== id);
      this.showTemplate = true;
    })
  }

}
