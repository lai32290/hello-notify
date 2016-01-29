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
        var ul = document.querySelector("#hello-notify-list");

        if (!ul) {
            ul = document.createElement("ul");
            ul.id = "hello-notify-list";

            document.body.appendChild(ul);
        }

        var li = document.createElement("li");
        li.classList.add('hello-notify-item');

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

        li.style[self.align] = alignPosition;
        li.style[self.valign] = valignPosition;

        switch (typeof  args) {
            case 'string':
                li.classList.add('hello-notify-message');
                li.innerHTML = args;
                break;
        }

        if(document.querySelectorAll('li.hello-notify-item').length == 0)
            ul.appendChild(li);
        else
            ul.insertBefore(li, ul.querySelector('li:first-child'));

        if(self.duration != -1) {
            setTimeout(function() {
                li.classList.add('hello-notify-clean');

                setTimeout(function () {
                    li.remove();
                }, 500);
            }, self.duration);
        }

        calcPosition();
    };

    function calcPosition()
    {
        var itens = document.querySelectorAll('li.hello-notify-item');

        for (var i = 1; i <= itens.length; i++)
        {
            itens[i - 1].style[self.valign] = (i * self.distance) + "px";
        }
    }

    return self;
}