import { ShoppingService } from "./shopping.service";

describe('ShoppingService', () => {

  let service: ShoppingService;
  let restService: any;

  beforeEach(() => {
    restService = jasmine.createSpyObj('RestService', ['get']);
    service = new ShoppingService(restService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts()', () => {
    it('should return empty list and resolve', (done: DoneFn) => {
      restService.get.and.returnValue(
        Promise.resolve([])
      );

      service.getProducts().then((response: any) => {
        expect(response).toEqual([]);
        done();
      })
    });

    it('should reject', (done: DoneFn) => {
      restService.get.and.returnValue(
        Promise.reject(new Error())
      );

      service.getProducts().catch((error: any) => {
        expect(error).toBeTruthy();
        done();
      });
    });
  });
});
