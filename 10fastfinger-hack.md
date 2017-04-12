### Hack

## Proof Of Concept

Since words to type are not images, we can hook into the DOM to get the text content of each word and make our script type it for us in the game input field.
Then we would simulate a spacebar press by triggering a `KeyboardEvent` to let the game jump to the next word.

## Script

### Bind to the game input
Using the browser devtools we can easily get the element ID of the game input field. Since jQuery is defined in the page, it's very easy to create a reference to it:

```javascript
var inputField = $('#inputfield');
```

### Simulate the spacebar press
Every time a user presses a key in a web page, a `KeyboardEvent` is triggered.
We need to create an event of type `keyup` and assign it the keyCode of the spacebar, which is __32__.
To get this value we can use a simple function to log a keyup event object:

```javascript
window.addEventListener('keyup', function(event){
    console.log(event);
})
```

If we press the spacebar, the script above will make the console log a `KeyboardEvent`. Dig into its properties to find the `keyCode` we need.

![KeyboardEvent](https://raw.githubusercontent.com/ukaoskid/ukaoskid.github.io/master/demo/10fast-finger-hacked/screenshot1.png)

Each time we finish to write the right word we would call the `.trigger()` method on the input field, passing a [jQuery.Event](http://api.jquery.com/category/events/event-object/) of type `keyup` (which is very similar to the native DOM Event).
We store it once to avoid re-create an instance of it inside of each function call:

```javascript
var keyup = jQuery.Event('keyup');
keyup.which = 32;
```

### Get the right word
Since the `words` array is accessible in the global scope we can access it by referencing to `window.words`.
The array in object is containing all the words you are supposed to write during the run you are performing. It is used to forecast the words you should "type" to get the result wanted.

### Delay calculation
The delay is the exact time, in milliseconds, that has to pass between a word and another one. It is calculated starting from the expected words (`counter` variable) needed to reach the result you set. A run has a standard time of 60 seconds, then the delay is calculated for 59, in this way the last "typed" word will be always on time.

```javascript
function getDelay() {
    return Math.ceil((59 / counter) * 1000);
}
```

### Simulate the user typing
Once we have the word to type, we would simulate each letter typing in the game input field.
To get this done we'll use `setInterval`, which executes the function passed as the first argument every N milliseconds, passed as the second argument.

```javascript
function typeWordAndNext(word) {

    // split the word into an array of letters
    var chars = word.split('');

    var interval = setInterval(function() {

        if (chars.length) {

            /*
             * shift the chars array to remove the first letter from it
             * and assign it to a variable in a single shot
             */
            var char = chars.shift();

            // update the input field value adding that letter
            inputField.val(inputField.val() + char);

        } else {

            // if words array has been empty

            // clear this interval to stop its exec
            clearInterval(interval);

            // trigger the spacebar keyup to jump to the next word
            inputField.trigger(keyup);

        }

    }, 30); // type each letter every 30ms
}
```
