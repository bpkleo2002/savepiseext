/*
 *Save pasie Affiliate Link
 *http://savepaise.com
 *
 *This program is free software; you can redistribute it and/or
 *modify it under the terms of the GNU General Public License
 *as published by the Free Software Foundation; either version 2
 *of the License, or (at your option) any later version.
 *
 *This program is distributed in the hope that it will be useful,
 *but WITHOUT ANY WARRANTY; without even the implied warranty of
 *MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *GNU General Public License for more details.
 *
 *http://www.gnu.org/licenses/gpl-3.0.txt 
 */

var _trackIdKey = "trackId";
var _trackIdKeyIn = "trackId.in";
var _trackIdKeyDefaultIn = "trackIdDefault.in";
var _trackIdKeyFlipkart = "trackId.flipkart";
var _trackIdKeyDefaultFlipkart = "trackIdDefault.flipkart";

// Saves value to localStorage.
function save_options() {
    localStorage[_trackIdKeyIn] = document.getElementById(_trackIdKeyIn).value;
    localStorage[_trackIdKeyFlipkart] = document.getElementById(_trackIdKeyFlipkart).value;

    // Update status to let user know options were saved.
    document.querySelector('button').innerHTML = "Saved.";
    // Close tab/popup
    setTimeout(
            function () {
                window.close();
            }, 750);
}

// Restores saved value from localStorage.
function restore_options() {
    var trackIdIn = localStorage[_trackIdKeyIn];
    var trackIdFlipkart = localStorage[_trackIdKeyFlipkart];

    if (trackId === undefined || trackId == localStorage[_trackIdKeyDefault]) {
        trackId = '';
    }

    if (trackIdIn === undefined || trackIdIn == localStorage[_trackIdKeyDefaultIn]) {
        trackIdIn = '';
    }
    if (trackIdFlipkart === undefined || trackIdFlipkart == localStorage[_trackIdKeyDefaultFlipkart]) {
        trackIdFlipkart = '';
    }

    var inputbox = document.getElementById(_trackIdKey);
    inputbox.value = trackId;

    document.getElementById(_trackIdKeyIn).value = trackIdIn;
    document.getElementById(_trackIdKeyFlipkart).value = trackIdFlipkart;

    inputbox.focus();
}

// pass Save button clicks to save_options with a small delay
function clickHandler(e) {
    setTimeout(save_options, 100);
}

// if the user pressed enter, imitate the user clicking the Save button.
function keydownHandler(e) {
    var keyCode = e.keyCode;

    // enter key code = 13
    if (keyCode == 13) {
        clickHandler();
    }
}

// Add listeners after the DOM has loaded
document.addEventListener('DOMContentLoaded',
        function () {
            // listen for clicks on the Save button
            document.querySelector('button').addEventListener('click', clickHandler);
            // listen for keypresses
            document.addEventListener('keydown', keydownHandler);
            // Run restore options to load saved values.
            restore_options();
        }
);