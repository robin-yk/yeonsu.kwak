// Filters the publications list by authorship position.
//
// The role is derived from the rendered author line rather than kept in a second
// list that could drift out of step with the bibliography. A paper counts as
// first-authorship when Yeonsu is the first author, or when both he and the
// first author carry the equal-contribution dagger, which is the convention his
// CV already uses.

(function () {
  "use strict";

  var SELF = "Yeonsu Kwak";
  var DAGGER = "†";

  function roleOf(li) {
    var author = li.querySelector(".author");
    if (!author) return "co";

    var names = author.textContent
      .replace(/\s+/g, " ")
      .split(",")
      .map(function (part) {
        return part.trim();
      })
      .filter(Boolean);

    var mine = -1;
    for (var i = 0; i < names.length; i++) {
      if (names[i].indexOf(SELF) !== -1) {
        mine = i;
        break;
      }
    }

    if (mine === 0) return "first";
    if (mine > 0 && names[mine].indexOf(DAGGER) !== -1 && names[0].indexOf(DAGGER) !== -1) {
      return "first";
    }
    return "co";
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var bar = document.querySelector(".pub-filter");
    // Every list on the page, including the under-review block. Filtering only
    // the published one left an under-review paper of the wrong authorship on
    // screen, which reads as the filter being broken.
    var blocks = document.querySelectorAll(".publications");
    var lists = document.querySelectorAll(".publications ol.bibliography");
    if (!bar || !lists.length) return;

    var items = [];
    lists.forEach(function (list) {
      list.querySelectorAll(":scope > li").forEach(function (li) {
        li.dataset.role = roleOf(li);
        items.push(li);
      });
    });

    // Counts come from the published list alone, so they report peer-reviewed
    // papers only. Filtering still covers the under-review block below, which
    // is separately headed and reads as its own thing.
    var counted = [];
    document.querySelectorAll("#published ol.bibliography > li").forEach(function (li) {
      counted.push(li);
    });
    var counts = { all: counted.length, first: 0, co: 0 };
    counted.forEach(function (li) {
      counts[li.dataset.role] += 1;
    });

    var buttons = bar.querySelectorAll("[data-filter]");

    function apply(role) {
      items.forEach(function (li) {
        li.hidden = role !== "all" && li.dataset.role !== role;
      });

      // A year heading is the sibling immediately before its list, so hide any
      // heading whose list has nothing left to show.
      lists.forEach(function (list) {
        var visible = list.querySelector(":scope > li:not([hidden])");
        list.hidden = !visible;
        var heading = list.previousElementSibling;
        if (heading && heading.tagName === "H2") heading.hidden = !visible;
      });

      // Section headings sit outside their block, so they need the same
      // treatment one level up.
      blocks.forEach(function (block) {
        var visible = block.querySelector("ol.bibliography > li:not([hidden])");
        block.hidden = !visible;
        var heading = block.previousElementSibling;
        if (heading && heading.tagName === "H2") heading.hidden = !visible;
      });

      buttons.forEach(function (button) {
        var on = button.dataset.filter === role;
        button.classList.toggle("is-active", on);
        button.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    buttons.forEach(function (button) {
      var count = counts[button.dataset.filter];
      if (typeof count === "number") {
        var badge = document.createElement("span");
        badge.className = "pub-filter-count";
        badge.textContent = count;
        button.appendChild(badge);
      }
      button.addEventListener("click", function () {
        apply(button.dataset.filter);
      });
    });

    bar.hidden = false;
    // First authorship is the default view: it is the work Yeonsu led.
    apply("first");
  });
})();
