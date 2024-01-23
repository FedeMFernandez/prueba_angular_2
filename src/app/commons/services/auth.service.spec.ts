import { AuthService } from "./auth.service";

describe('AuthService', () => {

  let service: AuthService;
  let restService: any;
  let storageService: any;

  beforeEach(() => {
    restService = jasmine.createSpyObj('RestService', ['post']);
    storageService = jasmine.createSpyObj('StorageService', ['getBoolean','setBoolean', 'remove']);
    service = new AuthService(restService, storageService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('#loggedIn should get', () => {
      service.loggedIn;
      expect(storageService.getBoolean).toHaveBeenCalledTimes(1);
    });

  describe('login()', () => {
    it('should login user and resolve', (done: DoneFn) => {
      restService.post.and.returnValue(
        Promise.resolve({
          status: 200,
        })
      );

      service.login({
        email: 'user@demo.com',
        password: '123456',
      }).then((response: any) => {
        expect(storageService.setBoolean).toHaveBeenCalledTimes(1);
        done();
      })
    });

    it('should reject', (done: DoneFn) => {
      restService.post.and.returnValue(
        Promise.reject({
          message: 'Invalid username or password',
        })
      );
      service.login({
        email: 'user@demo.com',
        password: '123455',
      }).catch((error: any) => {
        expect(error.message).toBe('Invalid username or password');
        done();
      })
    });
  });

  describe('logout()', () => {
    it('should logout user', () => {
      restService.post.and.returnValue(Promise.resolve());

      service.logout();

      expect(storageService.remove).toHaveBeenCalledTimes(1);
    });
  });
});
