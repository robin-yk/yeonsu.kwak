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
    // Scope to the published list only. The under-review section is a separate
    // block below and stays visible whatever is selected, which also keeps the
    // counts equal to the ones quoted on the CV.
    var lists = document.querySelectorAll("#published ol.bibliography");
    if (!bar || !lists.length) return;

    var items = [];
    lists.forEach(function (list) {
      list.querySelectorAll(":scope > li").forEach(function (li) {
        li.dataset.role = roleOf(li);
        items.push(li);
      });
    });

    // Label each button with how many papers it will show.
    var counts = { all: items.length, first: 0, co: 0 };
    items.forEach(function (li) {
      counts[li.dataset.role] += 1;
    });

    var buttons = bar.querySelectorAll("[data-filter]");

    function apply(role) {
      items.forEach(function (li) {
        li.hidden = role !== "all" && li.dataset.role !== role;
      });

      // A year heading is a sibling of its list, so hide any heading whose list
      // has nothing left to show.
      lists.forEach(function (list) {
        var visible = list.querySelector(":scope > li:not([hidden])");
        list.hidden = !visible;
        var heading = list.previousElementSibling;
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
    apply("all");
  });
})();
