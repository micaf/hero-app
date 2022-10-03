import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { HEROES } from 'src/shared/mock-data';
import { HeroService } from 'src/shared/services/hero.service';
import { MessageDialogService } from 'src/shared/services/message-dialog.service';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockHeroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroesListComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [MessageDialogService]
    })
      .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    mockHeroService = TestBed.inject(HeroService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroes in ngOnInit', () => {
    const getHeroes = spyOn(component, 'getHeroes');
    component.ngOnInit();
    expect(getHeroes).toHaveBeenCalled();
  })

  it('should call getHeroes and set Heroes', () => {
    spyOn(mockHeroService, 'getHeroes').and.returnValue(of(HEROES));
    component.ngOnInit();
    expect(component.heroes).toBe(HEROES);
  })

  it('should render HeroListComponent if showTemplate', () => {
    const { debugElement } = fixture;
    component.showTemplate = true;
    fixture.detectChanges();
    const heroListComponent = debugElement.query(By.css('app-heroes-list'));
    expect(heroListComponent).toBeTruthy();
  })

  it('should render LoadingSpinnerComponent if !showTemplate', () => {
    const { debugElement } = fixture;
    component.showTemplate = false;
    fixture.detectChanges();
    const loadingSpinnerComponent = debugElement.query(By.css('loading-spinner'));
    expect(loadingSpinnerComponent).toBeTruthy();
  })

  it('should passes heroes to input of HeroListComponent', () => {
    component.showTemplate = true;
    component.heroes = HEROES;
    fixture.detectChanges();
    const heroListDebugEl = fixture.debugElement.query(By.directive(HeroesListComponent));
    const heroListComponent = heroListDebugEl.injector.get(HeroesListComponent);
    expect(heroListComponent.heroes).toBe(HEROES);
  });

  it('should call deleteHero when HeroListComponent emit the event', () => {
    const deleteHero = spyOn(component, 'deleteHero');
    component.showTemplate = true;
    fixture.detectChanges();
    const heroListDebugEl = fixture.debugElement.query(By.directive(HeroesListComponent));
    const heroListComponent = heroListDebugEl.injector.get(HeroesListComponent);
    heroListComponent.deleteHero.emit(1);
    expect(deleteHero).toHaveBeenCalled()
  });

  it('should call editHero when HeroListComponent emit the event', () => {
    const editHero = spyOn(component, 'editHero');
    component.showTemplate = true;
    fixture.detectChanges();
    const heroListDebugEl = fixture.debugElement.query(By.directive(HeroesListComponent));
    const heroListComponent = heroListDebugEl.injector.get(HeroesListComponent);
    heroListComponent.editHero.emit(1);
    expect(editHero).toHaveBeenCalled();
  });

  it('should call addHero when HeroListComponent emit the event', () => {
    const addHero = spyOn(component, 'addHero');
    component.showTemplate = true;
    fixture.detectChanges();
    const heroListDebugEl = fixture.debugElement.query(By.directive(HeroesListComponent));
    const heroListComponent = heroListDebugEl.injector.get(HeroesListComponent);
    heroListComponent.addHero.emit('');
    expect(addHero).toHaveBeenCalled();
  });
}); 
