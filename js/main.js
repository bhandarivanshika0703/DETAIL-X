document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // LOAD HEADER
  // ===============================
  fetch("components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
      initNavbar(); // 🔥 init navbar AFTER header loads
    })
    .catch(err => console.error("Header load error:", err));

  // ===============================
  // LOAD FOOTER
  // ===============================
  fetch("components/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    })
    .catch(err => console.error("Footer load error:", err));
});

// =====================================
// NAVBAR LOGIC (MOBILE + DROPDOWN)
// =====================================
function initNavbar() {
  const toggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!toggle || !mobileMenu) {
    console.warn("Navbar elements not found");
    return;
  }

  // ===============================
  // HAMBURGER TOGGLE
  // ===============================
  toggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    toggle.classList.toggle("active");
  });

  // ===============================
  // MOBILE SERVICES DROPDOWN
  // ===============================
  const dropBtn = document.querySelector(".mobile-drop-btn");
  const submenu = document.querySelector(".mobile-submenu");

  if (dropBtn && submenu) {
    dropBtn.addEventListener("click", () => {
      submenu.classList.toggle("open");
    });
  }

  // ===============================
  // CLOSE MENU ON LINK CLICK
  // ===============================
  const links = document.querySelectorAll(".mobile-menu a");
  links.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggle.classList.remove("active");
    });
  });
}




const slider = document.getElementById("beforeAfter");
const afterWrapper = slider?.querySelector(".after-wrapper");
const handle = slider?.querySelector(".slider-handle");

if (slider && afterWrapper && handle) {
  const slide = (x) => {
    const rect = slider.getBoundingClientRect();
    let position = x - rect.left;

    if (position < 0) position = 0;
    if (position > rect.width) position = rect.width;

    const percent = (position / rect.width) * 100;

    afterWrapper.style.width = percent + "%";
    handle.style.left = percent + "%";
  };

  const startSlide = (e) => {
    e.preventDefault();

    const move = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      slide(x);
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
  };

  slider.addEventListener("mousedown", startSlide);
  slider.addEventListener("touchstart", startSlide);
}




document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach(item => {
      item.classList.remove("active");
    });

    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});



document.querySelectorAll(".slider").forEach(slider => {
  slider.addEventListener("input", e => {
    const afterImg = e.target.parentElement.querySelector(".after-img");
    afterImg.style.width = e.target.value + "%";
  });
});



document.querySelectorAll(".slider").forEach(sl=>{
  sl.addEventListener("input",e=>{
    e.target.parentElement.querySelector(".after-img").style.width = e.target.value + "%";
  });
});



 const form = document.getElementById("bookingForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" }
  });

  if (response.ok) {
    successMsg.style.display = "block";
    form.reset();
    setTimeout(() => successMsg.style.display = "none", 5000);
  } else {
    alert("Something went wrong. Please try again.");
  }
});

