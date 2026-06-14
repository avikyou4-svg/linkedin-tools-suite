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

  previewContent.textContent = inputText.value;

  const characterCountValue = inputText.value.length;

  const wordCountValue = inputText.value
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;

  characterCount.textContent =
    `${characterCountValue} / 2600 characters | ${wordCountValue} words`;

  if (characterCountValue <= 2400) {
    characterCount.style.color = "green";
  } else if (characterCountValue <= 2600) {
    characterCount.style.color = "orange";
  } else {
    characterCount.style.color = "red";
  }

  const percentage = Math.min(
    (characterCountValue / 2600) * 100,
    100
  );

  progressFill.style.width = percentage + "%";
}

inputText.addEventListener("input", updatePreview);

cleanBtn.addEventListener("click", () => {

  let text = inputText.value;

  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");

  inputText.value = text;

  updatePreview();
});

bulletBtn.addEventListener("click", () => {

  const lines = inputText.value
    .split("\n")
    .filter(line => line.trim() !== "");

  const bulletText = lines
    .map(line => "• " + line.trim())
    .join("\n");

  inputText.value = bulletText;

  updatePreview();
});

clearBtn.addEventListener("click", () => {

  inputText.value = "";

  updatePreview();
});

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      inputText.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy Formatted Text";
    }, 2000);

  } catch {

    alert("Copy failed.");

  }

});

professionalTemplate.addEventListener("click", () => {

  inputText.value =
`Hi, I'm [Your Name].

I help [Audience] achieve [Result].

My expertise includes:

• Skill 1
• Skill 2
• Skill 3

Let's connect.`;

  updatePreview();
});

freelancerTemplate.addEventListener("click", () => {

  inputText.value =
`Freelancer helping businesses with:

• SEO
• Content Marketing
• Digital Strategy

Available for projects and collaborations.`;

  updatePreview();
});

jobSeekerTemplate.addEventListener("click", () => {

  inputText.value =
`Passionate professional with experience in:

• Skill 1
• Skill 2
• Skill 3

Always learning and looking for new opportunities.`;

  updatePreview();
});

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-mode")
      ? "dark"
      : "light"
  );

});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

window.addEventListener("DOMContentLoaded", () => {
  updatePreview();
});