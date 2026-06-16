const profession =
  document.getElementById("profession");

const skills =
  document.getElementById("skills");

const goal =
  document.getElementById("goal");

const generateBtn =
  document.getElementById("generateBtn");

const results =
  document.getElementById("results");

const copyBtn =
  document.getElementById("copyBtn");

generateBtn.addEventListener("click", () => {

  const p = profession.value;
  const s = skills.value.trim() || "Professional";
  const g = goal.value;

  const headlines = [

    `${p} | ${s} Specialist | ${g}`,

    `${p} | Helping Businesses Grow Through ${s}`,

    `${p} | ${s} Expert | Open to Opportunities`,

    `${p} | Passionate About ${s}`,

    `${p} | Building Meaningful Solutions with ${s}`,

    `${p} | Problem Solver | ${s}`,

    `${p} | Lifelong Learner | ${s}`,

    `${p} | Delivering Results Through ${s}`,

    `${p} | Creating Value with ${s}`,

    `${p} | ${s} Enthusiast`
  ];

  results.innerHTML = "";

  headlines.forEach((headline, index) => {

    results.innerHTML += `
      <p>
        ${index + 1}. ${headline}
      </p>
    `;

  });

});

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      results.innerText
    );

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
      copyBtn.textContent = "Copy All Headlines";
    }, 2000);

  } catch {

    alert("Copy failed.");

  }

});