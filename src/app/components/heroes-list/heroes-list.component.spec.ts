import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { HEROES } from 'src/shared/mock-data';
import { HeroesListComponent } from './heroes-list.component';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroesListComponent ], 
      imports: [MatTableModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table with Heroes', () => {
    component.dataSource.data  = HEROES;
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(10);

    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe(' Name ');
    expect(headerRow.cells[1].innerHTML).toBe(' Description ');
    expect(headerRow.cells[2].innerHTML).toBe(' Actions ');

    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML).toBe(' Elektra ');
    expect(row1.cells[1].innerHTML).toBe(' Trained by the Hand to become an assassin, Elektra Natchios works as a deadly mercenary for anyone willing to pay her price. ');
  });

  it('should emit editHero when click on the edit icon', () => {
    const editHero =  spyOn(component.editHero, 'emit');
    const { debugElement } = fixture;
    component.dataSource.data  = HEROES;
    fixture.detectChanges();
    const editHeroCell = debugElement.query(By.css('.edit-hero'));
    editHeroCell.nativeElement.click();
    expect(editHero).toHaveBeenCalled();
  });

  it('should emit deleteHero when click on the delete icon', () => {
    const deleteHero =  spyOn(component.deleteHero, 'emit');
    const { debugElement } = fixture;
    component.dataSource.data  = HEROES;
    fixture.detectChanges();
    const deleteHeroCell = debugElement.query(By.css('.delete-hero'));
    deleteHeroCell.nativeElement.click();
    expect(deleteHero).toHaveBeenCalled();
  });

  it('should emit addHero when click on the add button', () => {
    const addHero =  spyOn(component.addHero, 'emit');
    const { debugElement } = fixture;
    component.dataSource.data  = HEROES;
    fixture.detectChanges();
    const addHeroCell = debugElement.query(By.css('.add-hero'));
    addHeroCell.nativeElement.click();
    expect(addHero).toHaveBeenCalled();
  });

  it('should applyFilter when the user enters an input be called', () => {
    const applyFilter =  spyOn(component, 'applyFilter');
    const { debugElement } = fixture;
    component.dataSource.data  = HEROES;
    fixture.detectChanges();
    const filterHeroCell = debugElement.query(By.css('.input-filter'));
    const mockEvent: Event = <Event><any>{
      target: {
          value: 'Elektra'      
      }}
    filterHeroCell.triggerEventHandler('keyup', mockEvent )
    fixture.detectChanges();
    expect(applyFilter).toHaveBeenCalled();
    expect(applyFilter).toHaveBeenCalledWith(mockEvent);
  });


});
