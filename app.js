const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobilePanel = document.querySelector(".mobile-panel");
const modal = document.querySelector(".player-modal");
const modalVideo = document.querySelector(".modal-video");
const playerTitle = document.querySelector(".player-title");
const closePlayer = document.querySelector(".close-player");
const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

const playVideo = (video) => {
  const playPromise = video.play();
  return playPromise && typeof playPromise.catch === "function" ? playPromise.catch(() => {}) : playPromise;
};

const setHeaderState = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  mobilePanel.setAttribute("aria-hidden", String(!isOpen));
});

document.querySelectorAll(".mobile-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobilePanel.setAttribute("aria-hidden", "true");
  });
});

const setupHeroVideoUpgrade = () => {
  const hero = document.querySelector(".hero");
  const lowVideo = document.querySelector(".hero-video-low");
  const hdVideo = document.querySelector(".hero-video-hd");
  const hdSrc = hdVideo?.dataset.hdSrc;

  if (!hero || !lowVideo) {
    return;
  }

  playVideo(lowVideo);

  if (!hdVideo || !hdSrc) {
    return;
  }

  if (navigator.connection?.saveData) {
    return;
  }

  const revealHdVideo = () => {
    try {
      if (Number.isFinite(hdVideo.duration) && hdVideo.duration > 0) {
        hdVideo.currentTime = lowVideo.currentTime % hdVideo.duration;
      }
    } catch {
      // Some browsers disallow seeking before enough video data is buffered.
    }

    Promise.resolve(playVideo(hdVideo)).finally(() => {
      hero.classList.add("is-hd-ready");
    });
  };

  const loadHdVideo = () => {
    hdVideo.src = hdSrc;
    hdVideo.load();
  };

  hdVideo.addEventListener("canplay", revealHdVideo, { once: true });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadHdVideo, { timeout: 2400 });
  } else {
    window.setTimeout(loadHdVideo, 1200);
  }
};

const setupLazyVideos = () => {
  const videos = document.querySelectorAll("video[data-src]");

  const loadVideo = (video) => {
    if (video.src) {
      return;
    }

    video.src = video.dataset.src;
    video.load();
    playVideo(video);
  };

  if (!("IntersectionObserver" in window)) {
    videos.forEach(loadVideo);
    return;
  }

  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          videoObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "420px 0px", threshold: 0.01 }
  );

  videos.forEach((video) => videoObserver.observe(video));
};

setupHeroVideoUpgrade();
setupLazyVideos();

const openPlayer = (trigger) => {
  const video = trigger.dataset.video;
  const poster = trigger.dataset.poster;
  const title = trigger.dataset.title || "作品片段";

  playerTitle.textContent = title;
  modalVideo.poster = poster || "";
  modalVideo.src = video;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("is-locked");
  closePlayer.focus();
};

const closeModal = () => {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-locked");
};

document.querySelectorAll("[data-video]").forEach((trigger) => {
  trigger.addEventListener("click", () => openPlayer(trigger));
});

closePlayer.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "表单骨架已接好。后续可连接邮箱、企微、Notion、Airtable 或项目管理系统。";
  form.reset();
});
