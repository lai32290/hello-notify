angular.module('app', ['hello-notify']);

angular.module('app')
    .controller('mainCtrl', mainCtrl);

mainCtrl.$injector = ['notify'];

function mainCtrl(notify) {
    var self = this;

    notify.valign = 'top';
    notify.duration = 1500;
    notify.animation({
        remove: 1000
        , add: 800
    });

    self.add = function() {
        notify.notify('fjia');
    };
}