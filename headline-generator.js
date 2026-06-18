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
  
const characterCount =
  document.getElementById("characterCount");

const headlineScore =
  document.getElementById("headlineScore");  

const openToWork =
  document.getElementById("openToWork");

const emojiMode =
  document.getElementById("emojiMode");  

const moreBtn =
  document.getElementById("moreBtn"); 

const historyList =
  document.getElementById("historyList");  
  
const themeToggle =
  document.getElementById(
    "themeToggle"
  );  

generateBtn.addEventListener("click", () => {

    const p = profession.value;
    const s = skills.value.trim() || "Professional";
    const g = goal.value;

    const templates = {

        "Software Engineer": [
            "{profession} | {skills} Specialist | Building Scalable Applications",
            "{profession} | Full Stack Developer | Passionate About Technology",
            "{profession} | {skills} Expert | Open to Opportunities",
            "{profession} | Problem Solver | Creating Modern Solutions",
            "{profession} | Building User-Focused Applications"
        ],

        "Digital Marketer": [
            "{profession} | SEO & Growth Specialist",
            "{profession} | Driving Organic Traffic and Conversions",
            "{profession} | Helping Brands Grow Online",
            "{profession} | Performance Marketing Enthusiast",
            "{profession} | Building Strong Digital Presence"
        ],

        "Designer": [
            "{profession} | UI/UX Specialist",
            "{profession} | Creating Meaningful Experiences",
            "{profession} | Designing User-Centered Solutions",
            "{profession} | Creative Problem Solver",
            "{profession} | Transforming Ideas into Designs"
        ],

        "Freelancer": [
            "Freelance {skills} Expert | Helping Businesses Grow",
            "{profession} | Delivering Results That Matter",
            "{profession} | Trusted Business Partner",
            "{profession} | Solving Real Problems",
            "{profession} | Driving Growth Through Expertise"
        ]

    };

const downloadBtn =
    document.getElementById(
        "downloadBtn"
    );

downloadBtn.addEventListener(
    "click",
    () => {

        const text =
            results.innerText;

        const blob =
            new Blob(
                [text],
                {
                type:
                    "text/plain"
                }
        );

        const url =
        URL.createObjectURL(
            blob
        );

        const a =
        document.createElement(
            "a"
        );

        a.href = url;
        a.download =
        "linkedin-headlines.txt";

        a.click();

        URL.revokeObjectURL(
        url
        );

    }
);

const shareBtn =
    document.getElementById(
        "shareBtn"
    );

shareBtn.addEventListener(
    "click",
    async () => {

        if (
            navigator.share
        ) {

            await navigator.share({

                title:
                "LinkedIn Headline Generator",

                text:
                "Generate professional LinkedIn headlines.",

                url:
                window.location.href

            });

        }
        else {

            await navigator.clipboard
                .writeText(
                    window.location.href
                );

            alert(
                "Link copied!"
            );

        }

    }
);

function saveHistory(headline) {

    let history =
        JSON.parse(
        localStorage.getItem(
            "headlineHistory"
        )
        ) || [];

    history.unshift(headline);

    history = history.slice(0, 10);

    localStorage.setItem(
        "headlineHistory",
        JSON.stringify(history)
    );

    loadHistory();
} 

function loadHistory() {

    const history =
        JSON.parse(
        localStorage.getItem(
            "headlineHistory"
        )
        ) || [];

    historyList.innerHTML = "";

    if (!history.length) {
        historyList.textContent =
        "No recent headlines.";
        return;
    }

    history.forEach(item => {

        historyList.innerHTML += `
        <div class="history-item">
            ${item}
        </div>
        `;

    });

}


results.innerHTML += `
    <div class="headline-item">

        <p>
            ${index + 1}. ${headline}
        </p>

        <div class="headline-buttons">

            <button
                class="copyHeadline"
                data-text="${headline}">
                Copy
            </button>

            <button
                class="saveHeadline"
                data-text="${headline}">
                ⭐
            </button>

        </div>

    </div>
    `;
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

    const selectedTemplates =
        templates[p] || [
            "{profession} | {skills} Professional"
        ];

    results.innerHTML = "";

    selectedTemplates.forEach((template, index) => {

        let headline =
            template
                .replace("{profession}", p)
                .replace("{skills}", s);

        if (openToWork.checked) {
            headline +=
                " | Open to New Opportunities";
        }

        if (emojiMode.checked) {
            headline =
                "🚀 " + headline;
        }
        const chars = headline.length;

        let score = 0;

        if (p) score += 25;
        if (s) score += 25;
        if (chars >= 50 && chars <= 180)
            score += 25;
        if (
            headline.includes("|")
        )
            score += 25;

        characterCount.textContent =
            `${chars} / 220`;
            if (chars > 220) {
                characterCount.textContent =
                    `${chars} / 220 ⚠️ Too Long`;
            }    
        if (chars < 180) {

            characterCount.style.color =
                "green";

        }
        else if (chars <= 220) {

            characterCount.style.color =
                "orange";

        }
        else {

            characterCount.style.color =
                "red";

        }

        headlineScore.textContent =
            `${score} / 100`;

        results.innerHTML += `
            <div class="headline-item">

                <p>
                    ${index + 1}.
                    ${headline}
                </p>

                <button
                    class="copyHeadline"
                    data-text="${headline}"
                >
                    Copy
                </button>

            </div>
        `;
    });

    results.addEventListener(
        "click",
        async (e) => {

            if (
                e.target.classList.contains(
                    "saveHeadline"
                )
            ) {

                const text =
                    e.target.dataset.text;

                const saved =
                    JSON.parse(
                        localStorage.getItem(
                            "savedHeadlines"
                        )
                    ) || [];

                if (!saved.includes(text)) {

                    saved.push(text);

                    localStorage.setItem(
                        "savedHeadlines",
                        JSON.stringify(saved)
                    );

                    e.target.textContent =
                        "⭐ Saved";
                }
            }

        }
    );

    moreBtn.addEventListener(
        "click",
        () => {

            generateBtn.click();

        }
    );

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

        }
    );

    if (
        localStorage.getItem(
            "theme"
        ) === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    }

    saveHistory(headline);

    loadHistory();

});