const images = document.querySelectorAll('.cover img');
const body = document.body;

const colorMap = {
  "backstagetalks_cover_issue_5.png": "#00c1b5",
  "backstagetalks_cover_issue_4.png": "#ff651a",
  "backstagetalks_cover_issue_3.png": "#ffbe00",
  "backstagetalks_cover2017.png": "#1d3fbb"
};

const alreadyScrolled = new Set();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const src = entry.target.src;
      const fileName = src.substring(src.lastIndexOf("/") + 1);
      const color = colorMap[fileName] || "#ffffff";
      body.style.backgroundColor = color;

      // Only scroll the second image once, and only when it just starts appearing
      if (!alreadyScrolled.has(fileName)) {
        alreadyScrolled.add(fileName);

        // Scroll it to the top of the screen
        entry.target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  });
}, {
  threshold: 0.1 // triggers when just a small part is visible
});

images.forEach(img => observer.observe(img));
