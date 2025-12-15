import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogComponent } from './catalog.component';

class MockProductService {
  list = () => [];
  toggleFavorite = () => {};
  isFavorite = () => false;
}

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent],
      providers: [{ provide: 'ProductService', useClass: MockProductService }]
    }).overrideComponent(CatalogComponent, {
      set: {
        providers: [{ provide: 'ProductService', useClass: MockProductService }]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
