const professionalTemplate =
  document.getElementById("professionalTemplate");

const freelancerTemplate =
  document.getElementById("freelancerTemplate");

const jobSeekerTemplate =
  document.getElementById("jobSeekerTemplate");
const inputText = document.getElementById("inputText");
const previewContent = document.getElementById("previewContent");
const characterCount = document.getElementById("characterCount");

const cleanBtn = document.getElementById("cleanBtn");
const bulletBtn = document.getElementById("bulletBtn");
const clearBtn = document.getElementById("clearBtn");
const copyBtn = document.getElementById("copyBtn");
const count = inputText.value.length;

function updatePreview() {
  previewContent.textContent = inputText.value;
  characterCount.textContent =
   count + " / 2600 characters";
   if (count > 2400) {
  characterCount.style.color = "orange";
}

if (count > 2600) {
  characterCount.style.color = "red";
}

if (count <= 2400) {
  characterCount.style.color = "green";
}
}

inputText.addEventListener("input", updatePreview);

updatePreview();


// CLEAN SPACING

cleanBtn.addEventListener("click", () => {

  let text = inputText.value;

  text = text.replace(/[ \t]+/g, " ");

  text = text.replace(/\n{3,}/g, "\n\n");

  inputText.value = text;

  updatePreview();
});


// ADD BULLETS

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


// CLEAR

clearBtn.addEventListener("click", () => {

  inputText.value = "";

  updatePreview();
});


// COPY

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      inputText.value
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy Formatted Text";
    }, 2000);

  } catch (error) {

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