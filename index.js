"use strict";

(function() {
  let correctCount = 0;
  let testCount = 1;
  let badgeCount = 0;

  const BADGE_ARRAY = [];
  BADGE_ARRAY[0] = new Image();
  BADGE_ARRAY[0].src = "dundie.PNG";
  BADGE_ARRAY[1] = new Image();
  BADGE_ARRAY[1].src = "bucket-hat.PNG";
  BADGE_ARRAY[2] = new Image();
  BADGE_ARRAY[2].src = "boba.PNG";

  const BADGE_ALT = [];
  BADGE_ALT[0] = "pixel art dundie";
  BADGE_ALT[1] = "pixel art bucket hat";
  BADGE_ALT[2] = "pixel art boba";

  const BADGE_CAP_ARRAY = [];
  BADGE_CAP_ARRAY[0] = "Dundie";
  BADGE_CAP_ARRAY[1] = "bucket hat";
  BADGE_CAP_ARRAY[2] = "boba";

  window.addEventListener("load", init);

  /** Initializes all functions*/
  function init() {
    let okBtns = qsa(".ok-btn");

    for (let i = 0; i < okBtns.length; i++) {
      okBtns[i].addEventListener("click", countCorrect);
      okBtns[i].addEventListener("click", showResults);
    }

    qs("#totebag figure").addEventListener("mouseover", function() {
      this.classList.add("hover");
    });
    qs("#totebag figure").addEventListener("mouseout", function() {
      this.classList.remove("hover");
    });

    qs("#totebag figure").addEventListener("mouseover", function() {
      id("totebag-contents").classList.remove("hidden");
    });
    qs("#totebag figure").addEventListener("mouseout", function() {
      id("totebag-contents").classList.add("hidden");
    });

  }

  /** counts the number of correct answers inputted by the user */
  function countCorrect() {
    let input = qsa("input");
    let userAns = [];

    for (let i = 0; i < input.length; i++) {
      if (input[i].checked) {
        userAns[i] = input[i];
      }
    }

    userAns = userAns.filter(function(el) {
      return el !== null;
    });

    for (let i = 0; i < userAns.length; i++) {
      if (userAns[i].classList.contains("correct")) {
        correctCount++;
      }
    }

    for (let i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  }

  /** shows whether or not user got a badge for current test */
  function showResults() {
    let tests = qsa(".test");
    tests[testCount - 1].classList.toggle("hidden");

    if (correctCount >= 2) {
      id("badge").innerHTML = "";
      badgeCount++;
      let badgeImg = gen("img");
      badgeImg.src = BADGE_ARRAY[testCount - 1].src;
      let badgeCap = gen("figcaption");
      badgeCap.textContent = BADGE_CAP_ARRAY[testCount - 1];

      let badgeEl = gen("figure");

      badgeEl.appendChild(badgeImg);
      badgeEl.appendChild(badgeCap);

      addToTote();

      id("badge").appendChild(badgeEl);
      id("got-badge").classList.toggle("hidden");

    } else {
      id("no-badge").classList.toggle("hidden");
    }

    let continueBtns = qsa(".continue");
    for (let i = 0; i < continueBtns.length; i++) {
      continueBtns[i].addEventListener("click", nextTest);
    }

    testCount++;
  }

  /** adds badge to add to tote */
  function addToTote() {
    let badgeImg = gen("img");
    badgeImg.src = BADGE_ARRAY[testCount - 1].src;
    badgeImg.alt = BADGE_ALT[testCount - 1];
    let badgeCap = gen("figcaption");
    badgeCap.textContent = BADGE_CAP_ARRAY[testCount - 1];

    let badgeEl = gen("figure");

    badgeEl.appendChild(badgeImg);
    badgeEl.appendChild(badgeCap);

    id("totebag-contents").appendChild(badgeEl);
  }

  /** hides results page of previous test and displays next test */
  function nextTest() {
    let tests = qsa(".test");
    if (correctCount >= 2) {
      id("got-badge").classList.add("hidden");
    } else {
      id("no-badge").classList.add("hidden");
    }

    correctCount = 0;

    if (testCount > 3) {
      if (badgeCount === 3) {
        id("won").classList.remove("hidden");
      } else {
        id("lost").classList.remove("hidden");
      }
    } else {
      tests[testCount - 1].classList.remove("hidden");
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query.
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Creates and returns a new empty DOM node of a type that matches the given element type.
   * @param {string} elType - node type
   * @return {Node} New empty DOM node that matches the given type.
   */
  function gen(elType) {
    return document.createElement(elType);
  }
})();