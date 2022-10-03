import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HERO } from 'src/shared/mock-data';
import { HeroService } from 'src/shared/services/hero.service';
import { HeroFormComponent } from './hero-form.component';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let route: ActivatedRoute;
  let router: Router;
  let mockHeroService: HeroService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    mockHeroService = TestBed.inject(HeroService);
    router = TestBed.inject(Router)
    route = TestBed.inject(ActivatedRoute)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should take the id of route param and render Edit Form', () => {
    const { debugElement } = fixture;
    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue('1');
    spyOn(mockHeroService, 'getHeroById').and.returnValue(of(HERO));
    fixture.detectChanges();
   
    component.ngOnInit();
    fixture.detectChanges();   
    
    const title = debugElement.query(By.css('.title'));
    const button = debugElement.query(By.css('.submit-button'));
    expect(component.isEdit).toBeTrue();
    expect(title.nativeElement.innerHTML).toEqual('Edit your hero!');
    expect(button.nativeElement.innerHTML).toEqual('Edit');
  });

  it('should render a Add Hero form if is not route param', () => {
    const { debugElement } = fixture;
    const spyRoute = spyOn(route.snapshot.paramMap, 'get')
    spyRoute.and.returnValue(null);
    fixture.detectChanges();
   
    component.ngOnInit();
    fixture.detectChanges();   
    
    const title = debugElement.query(By.css('.title'));
    const button = debugElement.query(By.css('.submit-button'));
    expect(component.isEdit).toBeFalse();
    expect(title.nativeElement.innerHTML).toEqual('Add your hero!');
    expect(button.nativeElement.innerHTML).toEqual('Add');
  });
});
