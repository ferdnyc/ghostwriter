/***********************************************************************
 *
 * Copyright (C) 2018-2020 wereturtle
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 ***********************************************************************/

// Placeholder div element where updated HTML is to be inserted.
var placeholder = document.getElementById('livepreviewplaceholder');

/**
 * Scrolls to the anchor with ID 'livepreviewmodifypoint'.
 */
function scrollToModifyPoint() {
    var modifyPoint = document.getElementById('livepreviewmodifypoint');

    if (modifyPoint) {
        modifyPoint.scrollIntoView();
    }
}

/**
 * Loops through all heading tags and inserts a span tag with a unique ID for
 * use in navigating headings (via scrolling) with the Outline HUD.
 */
function insertAnchorsForHeadings() {
    var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

    for (var i = 0; i < headers.length; i++) {
        var h = headers[i];
        var span = document.createElement('span');
        span.id = "livepreviewhnbr" + (i + 1);
        h.before(span);
    }
}

/**
 * Dynamically loads a different style sheet.
 */
var loadStyleSheet = function(css) {
    var cssElem = document.getElementById('ghostwriter_css');

    if (cssElem) {
        cssElem.textContent = css;
    }
    else {
        cssElem  = document.createElement('style');
        cssElem.id   = 'ghostwriter_css';
        cssElem.type = 'text/css';
        cssElem.media = 'all';
        cssElem.textContent = css;
    }
}

/**
 * Updates inner HTML of div element with ID of 'livepreviewplaceholder'.
 * This is necessary (as opposed to calling QWebEngineView's setHtml() method)
 * so that Chromium does not scroll to the top of the page when loading the new
 * HTML preview contents before scrolling back to the 'livepreviewmodifypoint'.
 */
var updateText = function(text) {
    placeholder.innerHTML = text;
    insertAnchorsForHeadings();

    // Call MathJax to update document, if the library is available.
    if (typeof window.MathJax !== 'undefined') {
        window.MathJax.typeset();
    }

    scrollToModifyPoint();
}
