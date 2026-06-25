const headlineInput =
    document.getElementById(
        "headlineInput"
    );

const analyzeBtn =
    document.getElementById(
        "analyzeBtn"
    );

const headlineScore =
    document.getElementById(
        "headlineScore"
    );

const characterCount =
    document.getElementById(
        "characterCount"
    );

const strengths =
    document.getElementById(
        "strengths"
    );

const improvements =
    document.getElementById(
        "improvements"
    );

const suggestedHeadline =
    document.getElementById(
        "suggestedHeadline"
    );

const copySuggestionBtn =
    document.getElementById(
        "copySuggestionBtn"
    );

const seoStrength =
    document.getElementById(
        "seoStrength"
    );

const readabilityScore =
    document.getElementById(
        "readabilityScore"
    );

const keywordStrength =
    document.getElementById(
        "keywordStrength"
    );
    
const saveAnalysisBtn =
    document.getElementById(
        "saveAnalysisBtn"
    );

const analysisHistory =
    document.getElementById(
        "analysisHistory"
    );  
    
const shareAnalysisBtn =
    document.getElementById(
        "shareAnalysisBtn"
    );

const professions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Data Analyst",
    "Product Manager",
    "Project Manager",
    "Digital Marketer",
    "SEO Specialist",
    "UI Designer",
    "UX Designer",
    "Graphic Designer",
    "Content Writer",
    "Copywriter",
    "Business Analyst",
    "Consultant",
    "Founder",
    "Freelancer",
    "Student",
    "Teacher",
    "Sales Manager",
    "Recruiter",
    "Accountant",
    "HR Professional"
];

const skillKeywords = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "AWS",
    "Docker",
    "Kubernetes",
    "SQL",
    "Power BI",
    "Machine Learning",
    "AI",
    "SEO",
    "Google Ads",
    "Content Marketing",
    "Figma",
    "UI/UX",
    "Leadership",
    "Project Management",
    "Communication"
];

const valueWords = [
    "Building",
    "Creating",
    "Helping",
    "Driving",
    "Growing",
    "Scaling",
    "Improving",
    "Leading",
    "Transforming",
    "Optimizing",
    "Developing",
    "Delivering",
    "Empowering"
];

const suggestionMap = {
    "Software Engineer":
        "Building Scalable Web Applications",

    "Digital Marketer":
        "Driving Organic Growth Through SEO",

    "Designer":
        "Creating User-Centered Experiences",

    "Freelancer":
        "Helping Businesses Achieve Results",

    "Student":
        "Passionate About Learning and Innovation"
};

function loadAnalyses() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "headlineAnalyses"
            )
        ) || [];

    analysisHistory.innerHTML =
        "";

    if (!history.length) {

        analysisHistory.textContent =
        "No analyses yet.";

        return;

    }

    history.forEach(
        item => {

        analysisHistory.innerHTML += `
            <div class="analysis-item">

            <strong>
                ${item.score}
            </strong>

            <p>
                ${item.headline}
            </p>

            </div>
        `;

        }
    );

}

loadAnalyses();

analyzeBtn.addEventListener(
    "click",
    () => {

        const headline =
            headlineInput.value.trim();

        if (!headline) {
            alert(
                "Please enter a headline."
            );
            return;
        }

        let score = 0;

        strengths.innerHTML = "";
        improvements.innerHTML = "";

        const chars =
            headline.length;

        characterCount.textContent =
            `${chars} / 220`;

        const hasProfession =
            professions.some(
                profession =>
                    headline
                        .toLowerCase()
                        .includes(
                        profession.toLowerCase()
                    )
            );

        if (hasProfession) {
            score += 20;

            strengths.innerHTML +=
                "<li>✓ Clear profession identified.</li>";
        }
        else {
            improvements.innerHTML +=
                "<li>✗ Add your profession.</li>";
        }

        const keywordCount =
            skillKeywords.filter(
                keyword =>
                    headline
                        .toLowerCase()
                        .includes(
                            keyword.toLowerCase()
                        )
            ).length;

        if (keywordCount > 0) {
            score += 20;

            strengths.innerHTML +=
                "<li>✓ Good keyword usage.</li>";
        }
        else {
            improvements.innerHTML +=
                "<li>✗ Add searchable skills.</li>";
        }

        const hasValue =
            valueWords.some(
                word =>
                    headline
                        .toLowerCase()
                        .includes(
                            word.toLowerCase()
                        )
            );

        if (hasValue) {
            score += 20;

            strengths.innerHTML +=
                "<li>✓ Strong value proposition.</li>";
        }
        else {
            improvements.innerHTML +=
                "<li>✗ Explain the value you provide.</li>";
        }

        if (
            chars >= 50 &&
            chars <= 120
        ) {

            score += 20;

            strengths.innerHTML +=
                "<li>✓ Good headline length.</li>";

        }
        else {

            improvements.innerHTML +=
                "<li>✗ Keep headline between 50 and 120 characters.</li>";

        }

        if (
            headline.includes("|") ||
            headline.includes("•") ||
            headline.includes("-")
        ) {

            score += 20;

            strengths.innerHTML +=
                "<li>✓ Easy to read structure.</li>";

        }
        else {

            improvements.innerHTML +=
                "<li>✗ Use separators to improve readability.</li>";

        }

        headlineScore.textContent =
        `${score} / 100`;

        headlineScore.className =
            "score-value";

        if (score >= 90) {
            headlineScore.classList.add(
                "score-excellent"
            );
        }
        
        else if (score >= 75) {
            headlineScore.classList.add(
                "score-good"
            );
        }
        
        else if (score >= 50) {
            headlineScore.classList.add(
                "score-average"
            );
        }
        
        else {
            headlineScore.classList.add(
                "score-poor"
            );
        }

        let suggestion =
            headline;

        if (!hasProfession) {
            suggestion =
                "Professional | " +
                suggestion;
        }

        if (keywordCount === 0) {
            suggestion +=
                " | Specialist";
        }

        if (!hasValue) {
            suggestion +=
                " | " +
                (
                    suggestionMap[
                        professions.find(
                            p =>
                                headline
                                    .toLowerCase()
                                    .includes(
                                        p.toLowerCase()
                                    )
                        )
                    ] ||
                    "Helping Businesses Grow"
                );
        }

        suggestedHeadline.textContent =
            suggestion;

    }
);

copySuggestionBtn.addEventListener(
    "click",
    async () => {

        const text =
            suggestedHeadline.textContent;

        if (text === "—") return;

        await navigator.clipboard
            .writeText(text);

        copySuggestionBtn.textContent =
            "Copied!";

        setTimeout(() => {

            copySuggestionBtn.textContent =
                "Copy Suggestion";

        }, 2000);

    }
);

let seo = 0;
let readability = 0;
let keyword = 0;

seo =
    Math.min(
        keywordCount * 2,
        10
    );

if (
    headline.includes("|")
    ) {
    readability += 5;
}

if (
    chars >= 50 &&
    chars <= 120
    ) {
    readability += 5;
}

keyword =
    Math.min(
        keywordCount * 3,
        10
    );

seoStrength.textContent =
    `${seo} / 10`;

readabilityScore.textContent =
    `${readability} / 10`;

keywordStrength.textContent =
    `${keyword} / 10`;

saveAnalysisBtn.addEventListener(
    "click",
    () => {

        const headline =
            headlineInput.value.trim();

        if (!headline) return;

        let history =
            JSON.parse(
                localStorage.getItem(
                "headlineAnalyses"
                )
        ) || [];

        history.unshift({
            headline,
            score:
                headlineScore.textContent
        });

        history =
            history.slice(0, 10);

        localStorage.setItem(
            "headlineAnalyses",
            JSON.stringify(history)
        );

        alert(
            "Analysis saved."
        );

    }
); 

loadAnalyses();

shareAnalysisBtn.addEventListener(
    "click",
    async () => {

        const text =
    `My LinkedIn Headline Score:
    ${headlineScore.textContent}

    Headline:
    ${headlineInput.value}

    Analyzed on ProfileCraft:
    ${window.location.href}`;

        if (
            navigator.share
        ) {

            await navigator.share({
                title:
                "LinkedIn Headline Analysis",
                text
            });

        }
        else {

            await navigator.clipboard
                .writeText(
                text
                );

            alert(
                "Analysis copied."
            );

        }

    }
);
