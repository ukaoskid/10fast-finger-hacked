var i = 0;
var delay = 0;
var counter = 0;
var resultYouWant = 107;

var inputField = $('#inputfield');
var keyup = jQuery.Event('keyup');
keyup.which = 32;

function typeWordAndNext(word) {
    var chars = word.split('');
    var interval = setInterval(function() {

        if (!chars.length) {

            clearInterval(interval);
            inputField.trigger(keyup);

        } else {

            var char = chars.shift();
            inputField.val(inputField.val() + char);

        }

    }, 30);
}

function writeForMePlease() {

    var totalKeystrokes = 0;

    for (counter = 0; counter < words.length; counter++) {

        // 1 WPM = 5 Keystrokes.
        if (totalKeystrokes / 5 >= resultYouWant) {
            break;
        }

        // Running total for keystrokes and adding space to calculation.
        totalKeystrokes = (totalKeystrokes + words[counter].length) + 1;
    }

    // Delay calculation.
    delay = Math.ceil((59 / counter) * 1000);
    emulator();
}

function emulator() {

    if (i < counter) {

        // Emulation.
        inputField.focus();

        typeWordAndNext(words[i]);
        i++;

        setTimeout(emulator, delay);
    }
}

writeForMePlease();