angular.module('hello-notify', []);

angular.module('hello-notify')
    .factory('notify', notify);

function notify() {
    return function(args) {
        var ul = $("#hello-notify-list");

        if(ul.length == 0) {
            ul = $("<ul id='hello-notify-list'></ul>");

            $("body").append(ul);
        }

        var li = $("<li class='hello-notify-item'></li>");

        if(typeof args == 'string') {
            li.addClass('hello-notify-message');
            li.html(args);
        }

        ul.prepend(li);

        calcPosition();
    };

    function calcPosition() {
        $('li.hello-notify-item').each(function (k, e) {
            $(e).css('bottom', k * 50);
        });
    }
}