angular.module('app', ['hello-notify']);

angular.module('app')
    .controller('mainCtrl', mainCtrl);

mainCtrl.$injector = ['notify'];

function mainCtrl(notify) {
    var self = this;

    notify.align  = 'left';
    notify.valign = 'top';

    self.name    = "";
    self.confirm = function () {

        if (self.name != "")
            notify.notify("Hello " + self.name);
    };
}