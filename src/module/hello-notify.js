angular.module('hello-notify', []);

angular.module('hello-notify')
    .factory('notify', notify);

function notify() {
    var self = this;

    self.align  = 'right';
    self.valign = 'bottom';

    self.top    = 50;
    self.bottom = 50;
    self.left   = 50;
    self.right  = 50;

    self.distance = 50;

    self.duration = -1;

    self.notify = function (args) {
        var ul = $("#hello-notify-list");

        if (ul.length == 0) {
            ul = $("<ul id='hello-notify-list'></ul>");

            $("body").append(ul);
        }

        var li = $("<li class='hello-notify-item'></li>");

        var alignPosition  = self.right;
        var valignPosition = self.bottom;

        switch (self.align) {
            case 'left' :
                alignPosition = self.left;
                break;

            case 'center':
                break;

            default:
                alignPosition = self.right;
                break;
        }

        switch (self.valign) {
            case 'top':
                valignPosition = self.top;
                break;

            case 'middle':
                break;

            default:
                valignPosition = self.bottom;
        }

        li.css(self.align, alignPosition);
        li.css(self.valign, valignPosition);

        switch (typeof  args) {
            case 'string':
                li.addClass('hello-notify-message');
                li.html(args);
                break;
        }

        ul.prepend(li);

        if(self.duration != -1) {
            setTimeout(function() {
                li.addClass('hello-notify-clean');

                setTimeout(function () {
                    li.remove();
                }, 500);
            }, self.duration);
        }

        calcPosition();
    };

    function calcPosition() {
        $('li.hello-notify-item').each(function (k, e) {
            $(e).css(self.valign, (k + 1) * self.distance);
        });
    }

    return self;
}