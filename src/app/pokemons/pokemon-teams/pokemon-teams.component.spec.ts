import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTeamsComponent } from './pokemon-teams.component';

describe('PokemonTeamsComponent', () => {
  let component: PokemonTeamsComponent;
  let fixture: ComponentFixture<PokemonTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
