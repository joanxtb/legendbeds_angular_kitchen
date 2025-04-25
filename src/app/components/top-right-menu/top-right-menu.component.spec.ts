import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRightMenuComponent } from './top-right-menu.component';

describe('TopRightMenuComponent', () => {
  let component: TopRightMenuComponent;
  let fixture: ComponentFixture<TopRightMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopRightMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopRightMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
