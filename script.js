const inputText = document.getElementById("inputText");
const previewContent = document.getElementById("previewContent");
const characterCount = document.getElementById("characterCount");
const progressFill = document.getElementById("progressFill");

const cleanBtn = document.getElementById("cleanBtn");
const bulletBtn = document.getElementById("bulletBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");

const professionalTemplate = document.getElementById("professionalTemplate");
const freelancerTemplate = document.getElementById("freelancerTemplate");
const jobSeekerTemplate = document.getElementById("jobSeekerTemplate");

const themeToggle = document.getElementById("themeToggle");

function updatePreview() {

  if (!inputText || !previewContent) return;

  previewContent.textContent = inputText.value;

  const chars = inputText.value.length;

  const words = inputText.value
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;

  if (characterCount) {

    characterCount.textContent =
      `${chars} / 2600 characters | ${words} words`;

    if (chars <= 2400) {
      characterCount.style.color = "green";
    } else if (chars <= 2600) {
      characterCount.style.color = "orange";
    } else {
      characterCount.style.color = "red";
    }

  }

  if (progressFill) {

    const percentage =
      Math.min((chars / 2600) * 100, 100);

    progressFill.style.width =
      percentage + "%";

  }

}

if (inputText) {
  inputText.addEventListener(
    "input",
    updatePreview
  );
}

if (cleanBtn) {

  cleanBtn.addEventListener(
    "click",
    () => {

      let text = inputText.value;

      text =
        text.replace(/[ \t]+/g, " ");

      text =
        text.replace(/\n{3,}/g, "\n\n");

      inputText.value = text;

      updatePreview();

    }
  );

}

if (bulletBtn) {

  bulletBtn.addEventListener(
    "click",
    () => {

      const lines =
        inputText.value
          .split("\n")
          .filter(
            line =>
              line.trim() !== ""
          );

      inputText.value =
        lines
          .map(
            line =>
              "• " +
              line.trim()
          )
          .join("\n");

      updatePreview();

    }
  );

}

if (clearBtn) {

  clearBtn.addEventListener(
    "click",
    () => {

      inputText.value = "";

      updatePreview();

    }
  );

}

if (copyBtn) {

  copyBtn.addEventListener(
    "click",
    async () => {

      try {

        await navigator.clipboard
          .writeText(
            inputText.value
          );

        copyBtn.textContent =
          "Copied!";

        setTimeout(() => {

          copyBtn.textContent =
            "Copy Formatted Text";

        }, 2000);

      } catch {

        alert(
          "Unable to copy text."
        );

      }

    }
  );

}

if (professionalTemplate) {

  professionalTemplate.addEventListener(
    "click",
    () => {

      inputText.value =
`Hi, I'm [Your Name].

I help [Audience] achieve [Result].

My expertise includes:

• Skill 1
• Skill 2
• Skill 3

Let's connect.`;

      updatePreview();

    }
  );

}

if (freelancerTemplate) {

  freelancerTemplate.addEventListener(
    "click",
    () => {

      inputText.value =
`Freelancer helping businesses with:

• SEO
• Content Marketing
• Digital Strategy

Available for projects and collaborations.`;

      updatePreview();

    }
  );

}

if (jobSeekerTemplate) {

  jobSeekerTemplate.addEventListener(
    "click",
    () => {

      inputText.value =
`Passionate professional with experience in:

• Skill 1
• Skill 2
• Skill 3

Always learning and looking for new opportunities.`;

      updatePreview();

    }
  );

}

function updateThemeButton() {

  if (!themeToggle) return;

  themeToggle.textContent =
    document.body.classList.contains(
      "dark-mode"
    )
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";

}

if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        document.body.classList.contains(
          "dark-mode"
        )
          ? "dark"
          : "light"
      );

      updateThemeButton();

    }
  );

}

if (
  localStorage.getItem("theme")
  === "dark"
) {

  document.body.classList.add(
    "dark-mode"
  );

}

updateThemeButton();

window.addEventListener(
  "DOMContentLoaded",
  updatePreview
);