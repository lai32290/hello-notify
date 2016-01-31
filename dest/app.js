angular.module('app', ['hello-notify']);

angular.module('app')
    .controller('mainCtrl', mainCtrl);

mainCtrl.$injector = ['notify'];

function mainCtrl(notify) {
    var self = this;

    self.valign = 'top';
    self.align = 'right';

    notify.valign = 'top';
    notify.duration = -1;
    notify.animation({
        remove: 1000
        , add: 800
    });

    self.id = 0;

    self.add = function() {
        self.id++;
        notify.valign = self.valign;
        notify.align = self.align;

        notify.notify({
            hoverClass: 'elementHover'
            , class: 'pointer color_blue'
            , message: 'Hello World!'
            , click: function(li) {
                notify.remove(li);
            }
        });
    };

    self.removeAll = function() {
        notify.removeAll();
    };

    self.hitme = function() {
        alert('Hello World!');
    };

    setTimeout(self.add, 1000);
    setTimeout(self.add, 1500);
    setTimeout(self.add, 2000);
    setTimeout(self.add, 2500);
    setTimeout(self.add, 3000);
}