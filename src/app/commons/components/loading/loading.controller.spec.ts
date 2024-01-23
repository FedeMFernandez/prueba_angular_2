import { LoadingController } from "./loading.controller";

describe('LoadingController', () => {

  let controller: LoadingController;

  beforeEach(() => {
    controller = new LoadingController();
  });

  it('should create the controller', () => {
    expect(controller).toBeTruthy();
  });

  describe('show()', () => {
    it('should set loading true', (done: DoneFn) => {
      controller.onLoading.subscribe((value) => {
        expect(value).toBe(true);
        done();
      });
      controller.show();
    });
  });

  describe('hide()', () => {
    it('should set loading false', (done: DoneFn) => {
      controller.show();
      controller.onLoading.subscribe((value) => {
        expect(value).toBe(false);
        done();
      });
      controller.hide();
    });

    it('should return when call are 0', (done: DoneFn) => {
      controller.show();
      controller.onLoading.subscribe((value) => {
        expect(value).toBe(false);
        done();
      });
      controller.hide();
      controller.hide();
    });
  });

});
