angular.module('hello-notify', []);

angular.module('hello-notify')
    .factory('notify', notify);

function notify() {
    var self = this;

    self.align  = 'right';
    self.valign = 'bottom';

    self.top    = '50px';
    self.bottom = '50px';
    self.left   = '50px';
    self.right  = '50px';

    self.distance = 50;
    self.duration = -1;

    self.animationsTime = {
        remove: 1000
        , add: 800
    };
    self.animation      = true;

    self.privateConfig = {
        showAnimationKeyframe: 'hello-notify'
        , removeAnimationKeyframe: 'hello-notify-clean'
    };

    self.notify = function (args) {
        var list = document.querySelector("#hello-notify-list");

        if (!list) {
            list    = document.createElement("div");
            list.id = "hello-notify-list";

            document.body.appendChild(list);
        }

        var li = document.createElement("li");

        switch (typeof  args) {
            case 'string':
                li.classList.add('hello-notify-message');
                li.innerHTML = args;
                break;

            case 'object':
                if (args.message != undefined) {
                    li.classList.add('hello-notify-message');
                    li.innerHTML = args.message;
                }

                if (args.template !== undefined) {
                    var template     = document.querySelector(args.template);
                    li               = template.cloneNode(true);
                    li.style.display = 'inline-block';
                }

                if (args.element !== undefined) {
                    li               = document.querySelector(args.element);
                    li.style.display = 'inline-block';
                }

                if (args.hoverClass !== undefined) {
                    li.addEventListener('mouseenter', function () {
                        li.classList.add(args.hoverClass);
                    });

                    li.addEventListener('mouseleave', function () {
                        li.classList.remove(args.hoverClass);
                    });
                }

                if (args.click !== undefined) {
                    li.addEventListener('click', function () {
                        args.click(li);
                    });
                }

                if (args.class !== undefined) {
                    var classes = args.class.split(' ');

                    classes.forEach(function (cla) {
                        li.classList.add(cla);
                    });
                }
        }

        li.classList.add('hello-notify-item');
        setStyle(li);


        if (document.querySelectorAll('.hello-notify-item').length == 0)
            list.appendChild(li);
        else
            list.insertBefore(li, list.querySelector(':first-child'));

        if (self.duration != -1) {
            setTimeout(function () {
                self.remove(li);
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

    self.removeAll = function () {
        var itens = getAllItens();

        for (var i = 0; i < itens.length; i++) {
            self.remove(itens[i]);
        }
    };

    self.remove = function (item) {
        var li = item;
        var removeDelay = 0;

        if (self.animation) {
            li.style.animation = self.privateConfig.removeAnimationKeyframe + ' ' + self.animationsTime.remove + 'ms';
            removeDelay = self.animationsTime.remove - 100;
        }

        setTimeout(function () {
            li.style.display = 'none';
            li.parentNode.removeChild(li);

            calcPosition();
        }, removeDelay);
    };

    function getAllItens() {
        return document.querySelectorAll('.hello-notify-item');
    }

    function calcPosition() {
        var itens = getAllItens();

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

            default:
                valignPosition = self.bottom;
                break;
        }

        li.style[self.align]  = alignPosition;
        li.style[self.valign] = valignPosition;

        if (self.animation) {
            li.style.animation = self.privateConfig.showAnimationKeyframe + ' ' + self.animationsTime.add + 'ms';

            li.style.transition = 'top .8s, bottom .8s, right .8s, left .8s';

        }
        else {
            li.style.animation  = '';
            li.style.transition = '';
        }
    }

    return self;
}