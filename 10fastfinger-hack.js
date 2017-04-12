(function (window, $) {

    // globals

    var i = 0;
    var delay = 0;
    var counter = 0;

    // desired result
    var resultYouWant = 107;

    var inputField = $('#inputfield');

    // jQuery key up event
    var keyup = jQuery.Event('keyup');
    keyup.which = 32;

    // functions definition

    function typeWordAndNext(word) {
        var chars = word.split('');
        var interval = setInterval(function() {

            if (chars.length) {

                var char = chars.shift();
                inputField.val(inputField.val() + char);

            } else {

                clearInterval(interval);
                inputField.trigger(keyup);

            }

        }, 30);
    }

    function getDelay() {
        return Math.ceil((59 / counter) * 1000);
    }

    function writeForMePlease() {

        var totalKeystrokes = 0;

        for (counter = 0; counter < window.words.length; counter++) {

            // 1 WPM = 5 Keystrokes
            if (totalKeystrokes / 5 >= resultYouWant) {
                break;
            }

            // running total for keystrokes and adding space to calculation
            totalKeystrokes = (totalKeystrokes + window.words[counter].length) + 1;
        }

        // delay calculation
        delay = getDelay();
        emulator();
    }

    function emulator() {

        if (i < counter) {

            // emulation
            inputField.focus();

            typeWordAndNext(window.words[i]);
            i++;

            setTimeout(emulator, delay);
        }
    }

    // exec

    writeForMePlease();

})(window, jQuery);
