import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WarComponent } from "./war.component";
import { PlayingCardsComponent } from '../playing-cards/playing-cards.component';

describe("WarComponent", () => {
  let component: WarComponent;
  let fixture: ComponentFixture<WarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WarComponent,
        PlayingCardsComponent
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

})