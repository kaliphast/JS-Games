$(document).ready(function(){
    var startgame = function(){

        var $container = $('<div>',{
            id: 'game-container'
        });

        var maxnumber = 20;

        var maxresult = 20;

        var firstnumber = {
            value: 0,
            reset: function(){
                this.value = Math.floor(Math.random()*maxnumber);
            }
        };

        var secondnumber = {
            value: 0,
            reset: function(){
                this.value = Math.floor(Math.random()*maxnumber);
            }
        };

        var action = {
            value: '',
            actions: ['+','-'],
            reset: function(){
                this.value = this.actions[Math.floor(Math.random()*this.actions.length)];
            }
        };

        var $firstnumber = $('<span>',{
            id: 'first-number',
        });

        var $secondnumber = $('<span>',{
            id: 'second-number',
        });

        var $action = $('<span>',{
            id: 'action',
        });

        var $equals = $('<span>',{
            html: ' = '
        });

        var $result = $('<input>',{
            type: 'text',
            value: '',
            id: 'result',
            size: 2
        });

        var $verify = $('<button>',{
            type: 'button',
            html: 'Sprawdź',
            id: 'verify'
        });

        var $commentContainer = $('<div>',{
            id: 'comment-container'
        });

        var $comment = $('<div>',{
            id: 'comment'
        });

        $commentContainer.append($comment);

        var $finalresult = $('<div>',{
            id: 'finalresult',
            html: 'Twój wynik: <span id=\'score\'>0</span> pkt.'
        });

        var finalresult = {
            value: 0,
            calculate: {
                '+': function(x,y){return x+y},
                '-': function(x,y){return x-y}
            }
        };

        $verify.on('click',function(){
            var $score = $('span#score');
            var response = $result.val();
            var correct = finalresult.calculate[action.value](firstnumber.value,secondnumber.value);
            if (response == correct){
                $comment.toggleClass('success',true);
                $comment.toggleClass('failure',false);
                $comment.html('Brawo! Prawidłowa odpowiedź!');
                drawtask();
                $score.html(++finalresult.value);
            } else {$comment.toggleClass('success',false);
                $comment.toggleClass('failure',true);
                $comment.html('Spróbuj jeszcze raz...');
                $result.val('');
                $score.html(--finalresult.value);
            }
            $comment.show();
            setTimeout(function(){$comment.fadeOut(750);},1000);
            if (finalresult.value < 0){
                $score.addClass('underzero');
            } else {
                $score.removeClass('underzero');
            }
            if (finalresult.value == maxresult){
                endgame();
            }
        });

        $result.on('keyup',function(e){
            if (e.which == 13){
                $verify.trigger('click');
            }
        });

        var drawtask = function(){
            firstnumber.reset();
            action.reset();
            if (action.value === '-'){
                do {
                    secondnumber.reset();
                } while (secondnumber.value > firstnumber.value);
            } else {
                secondnumber.reset();
            }
            $firstnumber.html(firstnumber.value);
            $action.html(action.value);
            $secondnumber.html(secondnumber.value);
            $result.val('');
            $result.focus();
        };

        var endgame = function(){
            var $congratulations = $('<div>',{
                id: 'congratulations',
                html: 'Gratulacje, wygrałeś osiągając '+maxresult+' punktów!'
            });
            $('#game-area').empty().append($congratulations);
        };


        $('#game-area').append($container);
        $container
            .append($firstnumber)
            .append($action)
            .append($secondnumber)
            .append($equals)
            .append($result)
            .append($verify)
            .append($finalresult)
            .append($commentContainer);

        drawtask();
    };

    $('#new-game').click(function(){
        $('#game-area').empty();
        startgame();
    });
});