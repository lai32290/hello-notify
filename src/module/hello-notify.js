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

    self.animationsTime = {
        remove: 1000
        , add: 800
    };

    self.privateConfig = {
        showAnimationKeyframe: 'hello-notify'
        , removeAnimationKeyframe: 'hello-notify-clean'
    };

    self.notify = function (args) {
        var ul = document.querySelector("#hello-notify-list");

        if (!ul) {
            ul    = document.createElement("ul");
            ul.id = "hello-notify-list";

            document.body.appendChild(ul);
        }

        var li = document.createElement("li");
        li.classList.add('hello-notify-item');

        setStyle(li);

        switch (typeof  args) {
            case 'string':
                li.classList.add('hello-notify-message');
                li.innerHTML = args;
                break;
        }

        if (document.querySelectorAll('li.hello-notify-item').length == 0)
            ul.appendChild(li);
        else
            ul.insertBefore(li, ul.querySelector('li:first-child'));

        if (self.duration != -1) {
            setTimeout(function () {
                li.style.animation = self.privateConfig.removeAnimationKeyframe + ' ' + self.animationsTime.remove + 'ms';

                setTimeout(function () {
                    li.parentNode.removeChild(li);
                }, self.animationsTime.remove);
            }, self.duration);
        }

        calcPosition();
    };

    self.animation = function () {
        if (arguments.length == 0) {
            return self.animationsTime;
        }

        self.animationsTime = angular.extend(self.animationsTime, arguments[0]);

        return self.animationsTime;
    };

    function calcPosition() {
        var itens = document.querySelectorAll('li.hello-notify-item');

        for (var i = 1; i <= itens.length; i++) {
            itens[i - 1].style[self.valign] = (i * self.distance) + "px";
        }
    }

    function setStyle(li) {
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

        li.style[self.align]  = alignPosition;
        li.style[self.valign] = valignPosition;
        li.style.animation    = self.privateConfig.showAnimationKeyframe + ' ' + self.animationsTime.add + 'ms';
    }

    return self;
}