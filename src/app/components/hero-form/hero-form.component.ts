import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/shared/interfaces/hero';
import { HeroService } from 'src/shared/services/hero.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {
  isEdit: boolean = false;
  showTemplate: boolean = false;
  hero: Hero;
  heroForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
  })

  constructor(private route: ActivatedRoute,
    private heroService: HeroService,
    private router: Router) {
    this.hero = {
      id: null,
      name: '',
      description: ''
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.checkEditForm(id);
    this.heroForm.valueChanges.subscribe(() => {
      this.hero = {
        id: this.heroForm.value.id ? this.heroForm.value.id : null,
        name: this.heroForm.value.name ? this.heroForm.value.name : '',
        description: this.heroForm.value.description ? this.heroForm.value.description : ''
      }
    });
  }

  checkEditForm(id: string | null) {
    this.showTemplate = false;
    if (id) {
      this.isEdit = true;
      return this.getHeroById(parseInt(id))
    }
    return this.showTemplate = true;
  }

  getHeroById(idHero: number) {
    this.heroService.getHeroById(idHero).subscribe(hero => {
      this.showTemplate = true;
      if (hero) { this.heroForm.setValue(hero); }
    })
  }

  onSubmit() {
    this.showTemplate = false;
    if (this.isEdit) {
      return this.editHero();
    }
    return this.addHero();
  }

  editHero() {
    this.heroService.updateHero(this.hero).subscribe(() => {
      return this.router.navigate(['']);
    })
  }

  addHero() {
    this.capitalizeFirstLetter();
    this.heroService.addHero(this.hero).subscribe(() => {
      this.router.navigate(['']);
    })
  }

  capitalizeFirstLetter() {
    const name = this.hero.name.toLowerCase();
    const firstLetter = name.slice(0, 1);
    this.hero.name = name.replace(firstLetter, firstLetter.toUpperCase());
  }

  goBack() {
    this.router.navigate(['']);
  }

  get formValidation() {
    return this.heroForm.controls;
  }

}
