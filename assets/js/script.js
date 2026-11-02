"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  const isExpanded = sidebar.classList.contains("active");
  this.setAttribute("aria-expanded", isExpanded);
  this.setAttribute(
    "aria-label",
    isExpanded ? "Hide contact details" : "Show contact details"
  );
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  const selected = selectedValue.trim().toLowerCase();

  filterItems.forEach((item) => {
    const categories = item.dataset.category
      .split("|")
      .map((cat) => cat.trim().toLowerCase());

    item.classList.toggle(
      "active",
      selected === "all" || categories.includes(selected)
    );
  });
};

const updateFilterControls = function (selectedValue) {
  filterBtn.forEach((button) => {
    const isSelected = button.dataset.filterValue === selectedValue;
    button.classList.toggle("active", isSelected);
    button.setAttribute("aria-pressed", isSelected);
  });

  selectItems.forEach((item) => {
    const isSelected = item.dataset.filterValue === selectedValue;
    item.classList.toggle("active", isSelected);
    item.setAttribute("aria-selected", isSelected);
    if (isSelected) {
      selectValue.textContent = item.textContent.trim();
    }
  });

  filterFunc(selectedValue);
};

select.addEventListener("click", function () {
  elementToggleFunc(this);
  this.setAttribute("aria-expanded", this.classList.contains("active"));
});

selectItems.forEach((item) => {
  item.addEventListener("click", function () {
    updateFilterControls(this.dataset.filterValue);
    select.classList.remove("active");
    select.setAttribute("aria-expanded", "false");
  });
});

filterBtn.forEach((button) => {
  button.addEventListener("click", function () {
    updateFilterControls(this.dataset.filterValue);
  });
});

updateFilterControls("all");

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.dataset.navLink;

    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    navigationLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        Boolean(link.closest(".navbar")) && link.dataset.navLink === targetPage
      );
    });

    window.scrollTo(0, 0);
  });
}
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("videoModal");
  const videoPlayer = document.getElementById("videoPlayer");
  const videoError = document.querySelector(".video-error");
  const closeBtn = document.querySelector(".modal .close");
  let lastVideoTrigger;

  const closeVideoModal = function () {
    modal.style.display = "none";
    videoPlayer.pause();
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
    videoError.hidden = true;
    lastVideoTrigger?.focus();
  };

  videoPlayer.addEventListener("error", function () {
    videoError.hidden = false;
  });

  document.querySelectorAll(".watch-video-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      lastVideoTrigger = link;
      videoError.hidden = true;
      videoPlayer.src = link.dataset.video;
      videoPlayer.load();
      modal.style.display = "block";
      closeBtn.focus();
    });
  });

  closeBtn.addEventListener("click", closeVideoModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeVideoModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.style.display === "block") {
      closeVideoModal();
    }
  });
});
