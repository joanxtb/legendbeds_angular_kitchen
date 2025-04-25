import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineLoaderComponent } from './line-loader.component';

describe('LineLoaderComponent', () => {
  let component: LineLoaderComponent;
  let fixture: ComponentFixture<LineLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
