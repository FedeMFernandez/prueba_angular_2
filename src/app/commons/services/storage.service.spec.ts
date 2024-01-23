import { StorageService } from "./storage.service";

describe('StorageService', () => {

  let service: StorageService;
  let mockLocalStorage: {
    [key: string]: string,
  } = {
    'not-null': 'true',
  };

  beforeEach(() => {
    service = new StorageService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('exists()', () => {
    it('should return true', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.exists('not-null')).toBe(true);
      done();
    });

    it('should return false', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.exists('null')).toBe(false);
      done();
    });
  });

  describe('get()', () => {
    it('should return value', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.get('not-null')).toBe('true');
      done();
    });

    it('should return null', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.get('null')).toBe(null);
      done();
    });
  });

  describe('set()', () => {
    it('should set value on storage', (done: DoneFn) => {
      const spy = spyOn(Storage.prototype, 'setItem').and.callFake((key, value) =>
        mockLocalStorage[key] = value
      );

      service.set('not-null', 'true');
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('remove()', () => {
    it('should remove value of storage', (done: DoneFn) => {
      const spy = spyOn(Storage.prototype, 'removeItem').and.callFake((key) => { });

      service.remove('not-null');
      expect(spy).toHaveBeenCalled();
      done();
    });
  });

  describe('getBoolean()', () => {
    it('should return true if boolean exists', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.getBoolean('not-null')).toBeTrue();
      done();
    });

    it('should return false if boolean does not exists', (done: DoneFn) => {
      spyOn(Storage.prototype, 'getItem').and.callFake((key) =>
        key in mockLocalStorage ? mockLocalStorage[key] : null
      );

      expect(service.getBoolean('null')).toBeFalse();
      done();
    });
  });

  describe('setBoolean()', () => {
    it('should set boolean on localStorage', (done: DoneFn) => {
      const spy = spyOn(Storage.prototype, 'setItem').and.callFake((key, value) =>
        mockLocalStorage[key] = value
      );

      service.setBoolean('not-null', true);
      expect(spy).toHaveBeenCalled();
      done();
    });
  });
});
