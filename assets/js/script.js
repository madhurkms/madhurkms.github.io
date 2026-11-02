"use strict";

const filters = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("[data-categories]");
const filterStatus = document.getElementById("filter-status");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      filter.setAttribute("aria-pressed", String(filter === button));
    });
    let visibleCount = 0;
    projects.forEach((project) => {
      const matches =
        selected === "all" ||
        project.dataset.categories.split(" ").includes(selected);
      project.hidden = !matches;
      if (matches) visibleCount++;
    });
    filterStatus.textContent = `Showing ${visibleCount} ${
      visibleCount === 1 ? "project" : "projects"
    }`;
  });
});

const videoDialog = document.getElementById("video-dialog");
const videoPlayer = document.getElementById("video-player");
const videoTitle = document.getElementById("video-title");
const videoError = document.querySelector(".video-error");
let videoTrigger;

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    videoTrigger = button;
    videoError.hidden = true;
    videoTitle.textContent = button.dataset.title;
    videoPlayer.setAttribute("aria-label", button.dataset.title);
    videoPlayer.src = button.dataset.video;
    videoPlayer.load();
    videoDialog.showModal();
  });
});

document.querySelector(".video-close").addEventListener("click", () => {
  videoDialog.close();
});

videoDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    videoDialog.close();
  }
});

videoDialog.addEventListener("click", (event) => {
  const bounds = videoDialog.getBoundingClientRect();
  if (
    event.target === videoDialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  ) {
    videoDialog.close();
  }
});

videoDialog.addEventListener("close", () => {
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  videoError.hidden = true;
  videoTrigger?.focus();
});

videoPlayer.addEventListener("error", () => {
  if (videoPlayer.hasAttribute("src")) videoError.hidden = false;
});
