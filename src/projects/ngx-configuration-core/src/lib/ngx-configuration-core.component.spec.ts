import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxConfigurationCoreComponent } from './ngx-configuration-core.component';

describe('NgxConfigurationCoreComponent', () => {
  let component: NgxConfigurationCoreComponent;
  let fixture: ComponentFixture<NgxConfigurationCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxConfigurationCoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxConfigurationCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
