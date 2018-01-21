describe('ZendeskWidgetProvider', function() {
  'use strict';

  var subject, mockService, $window;

  beforeEach(module('zendeskWidget'));
  beforeEach(inject(function(_$window_, _ZendeskWidget_) {
    subject    = _ZendeskWidget_;
    $window    = _$window_;
  }));

  describe('a set of API methods', function() {
    var originalAccountUrl;

    beforeEach(function() {
      var apiMethods = ['setLocale', 'identify', 'hide', 'show', 'activate'];
      // Stub out $window.zE() wrapper and all apiMethods
      mockService = $window.zE = function(fn) { fn(); };
      for (var i = 0; i < apiMethods.length; i++) {
        var apiMethod = apiMethods[i];
        $window.zE[apiMethod] = function() {};
        spyOn($window.zE, apiMethod).and.callThrough();
      }
    });
    beforeEach(inject(function(_zendeskWidgetSettings_) {
      originalAccountUrl = _zendeskWidgetSettings_.accountUrl;
      _zendeskWidgetSettings_.accountUrl = 'test.zendesk.con';
    }));
    afterEach(inject(function(_zendeskWidgetSettings_) {
      _zendeskWidgetSettings_.accountUrl = originalAccountUrl;
    }));


    it("delegates to Zendesk's Web Widget API", function() {
      var anyArgs = ['foo', 'bar', 'baz'];

      subject.identify(anyArgs);
      subject.hide(anyArgs);
      subject.show(anyArgs);
      subject.activate(anyArgs);
      subject.setLocale(anyArgs);

      expect(mockService.identify).toHaveBeenCalledWith(anyArgs);
      expect(mockService.hide).toHaveBeenCalledWith(anyArgs);
      expect(mockService.show).toHaveBeenCalledWith(anyArgs);
      expect(mockService.activate).toHaveBeenCalledWith(anyArgs);
      expect(mockService.setLocale).toHaveBeenCalledWith(anyArgs);
    });
  });
})
