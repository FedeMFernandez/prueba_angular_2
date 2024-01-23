import { of, throwError } from "rxjs";
import { RestService } from "./rest.service";

describe('RestService', () => {

  let service: RestService;
  let httpClientSpy: any;
  let loadingController: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    loadingController = jasmine.createSpyObj('LoadingController', ['show', 'hide']);

    service = new RestService(httpClientSpy, loadingController);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    it('should resolve', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(
        of({
          status: 200,
        })
      );

      service.get('login').then((response: any) => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should reject', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(
        throwError(() => {
          return {
            status: 404,
          }
        })
      );

      service.get('login').catch((error: any) => {
        expect(error).toBeTruthy();
        done();
      });
    });
  });

  describe('post()', () => {
    it('should resolve', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(
        of({
          status: 200,
        })
      );

      service.post('login', {}).then((response: any) => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should reject', (done: DoneFn) => {
      httpClientSpy.post.and.returnValue(
        throwError(() => {
          return {
            status: 404,
          }
        })
      );

      service.post('login', {}).catch((error: any) => {
        expect(error).toBeTruthy();
        done();
      });
    });
  });
});
