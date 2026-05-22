const quizQuestions = [
  {
    "question": "According to the 2026 guideline, which risk calculator is recommended for primary prevention risk assessment?",
    "choices": [
      "Framingham Risk Score",
      "Reynolds Risk Score",
      "PREVENT™ Equations",
      "TIMI Risk Calculator"
    ],
    "answer": 2
  },
  {
    "question": "Which statement regarding lipoprotein(a) [Lp(a)] is recommended in the guideline?",
    "choices": [
      "Measure only in secondary prevention",
      "Measure every year in all adults",
      "Measure at least once in adults",
      "Measure only in familial hypercholesterolemia"
    ],
    "answer": 2
  },
  {
    "question": "Elevated Lp(a) is considered a risk-enhancing factor at what level?",
    "choices": [
      "≥25 nmol/L",
      "≥50 nmol/L",
      "≥125 nmol/L",
      "≥500 nmol/L"
    ],
    "answer": 2
  },
  {
    "question": "Which imaging modality is recommended to further stratify risk when treatment decisions remain uncertain?",
    "choices": [
      "Echocardiography",
      "Coronary artery calcium (CAC) scoring",
      "Carotid ultrasound",
      "Stress ECG"
    ],
    "answer": 1
  },
  {
    "question": "In adults with diabetes aged 40–75 years, the guideline recommends:",
    "choices": [
      "Lifestyle therapy only",
      "Moderate-intensity statin therapy",
      "Aspirin only",
      "No treatment unless LDL-C >190 mg/dL"
    ],
    "answer": 1
  },
  {
    "question": "Which LDL-C goal is recommended for very high-risk ASCVD patients?",
    "choices": [
      "<130 mg/dL",
      "<100 mg/dL",
      "<70 mg/dL",
      "<55 mg/dL"
    ],
    "answer": 3
  },
  {
    "question": "Which therapy remains the foundation of pharmacologic treatment for elevated triglycerides?",
    "choices": [
      "Niacin",
      "Fibrates",
      "Statins",
      "Omega-3 supplements alone"
    ],
    "answer": 2
  },
  {
    "question": "According to the guideline, CAC scoring may be useful beginning at approximately what ages?",
    "choices": [
      "Men ≥30; Women ≥35",
      "Men ≥40; Women ≥45",
      "Men ≥50; Women ≥55",
      "Men ≥60; Women ≥60"
    ],
    "answer": 1
  },
  {
    "question": "Which of the following is emphasized as important throughout life?",
    "choices": [
      "Delaying treatment until symptoms develop",
      "Early lifestyle optimization",
      "Avoiding pharmacotherapy entirely",
      "Routine angiography screening"
    ],
    "answer": 1
  },
  {
    "question": "Which statement about ApoB testing is correct?",
    "choices": [
      "It replaces LDL-C testing entirely",
      "It may help identify residual lipoprotein-related risk",
      "It is only used in pediatric patients",
      "It is no longer recommended"
    ],
    "answer": 1
  },
  {
    "question": "Which LDL-C reduction goal is generally recommended with high-intensity statin therapy?",
    "choices": [
      "≥10%",
      "≥20%",
      "≥30%",
      "≥50%"
    ],
    "answer": 3
  },
  {
    "question": "Which patient group should receive lipid screening beginning at age 19 and at least every 5 years?",
    "choices": [
      "Adults",
      "Children only",
      "Adults with diabetes only",
      "Adults with hypertension only"
    ],
    "answer": 0
  },
  {
    "question": "Which recommendation is made regarding dietary supplements for lipid lowering?",
    "choices": [
      "Strongly recommended for all patients",
      "Recommended before statins",
      "Not recommended due to limited/inconsistent benefit",
      "Required in secondary prevention"
    ],
    "answer": 2
  },
  {
    "question": "In adults with CAC = 0 and no high-risk conditions, the guideline suggests:",
    "choices": [
      "Immediate high-intensity statin therapy",
      "Coronary bypass evaluation",
      "Consider deferring therapy and reassessing later",
      "Mandatory PCSK9 inhibitor therapy"
    ],
    "answer": 2
  },
  {
    "question": "Which condition is specifically mentioned as warranting intensified LDL-C lowering therapy?",
    "choices": [
      "Elevated Lp(a)",
      "Seasonal allergies",
      "Mild dehydration",
      "Hypothyroidism alone"
    ],
    "answer": 0
  }
];

const quizForm = document.getElementById("quizForm");
const resultsBox = document.getElementById("results");

function buildQuiz() {
  quizQuestions.forEach((item, index) => {
    const questionNumber = index + 1;
    const section = document.createElement("section");
    section.className = "question-card";

    const fieldset = document.createElement("fieldset");

    const legend = document.createElement("legend");
    legend.textContent = `${questionNumber}. ${item.question}`;
    fieldset.appendChild(legend);

    item.choices.forEach((choice, choiceIndex) => {
      const label = document.createElement("label");
      label.className = "choice";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choiceIndex;
      input.required = true;

      label.appendChild(input);
      label.append(choice);
      fieldset.appendChild(label);
    });

    section.appendChild(fieldset);
    quizForm.appendChild(section);
  });

  const submitRow = document.createElement("div");
  submitRow.className = "submit-row";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit Quiz";

  submitRow.appendChild(submitButton);
  quizForm.appendChild(submitRow);
}

function gradeQuiz(event) {
  event.preventDefault();

  let score = 0;
  const unanswered = [];
  const reviewItems = [];

  quizQuestions.forEach((item, index) => {
    const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);

    if (!selected) {
      unanswered.push(index + 1);
      return;
    }

    const selectedIndex = Number(selected.value);
    const isCorrect = selectedIndex === item.answer;

    if (isCorrect) {
      score += 1;
    }

    reviewItems.push(`
      <li>
        <strong>Question ${index + 1}:</strong>
        <span class="${isCorrect ? "correct" : "incorrect"}">
          ${isCorrect ? "Correct" : "Incorrect"}
        </span><br>
        Your answer: ${item.choices[selectedIndex]}<br>
        Correct answer: ${item.choices[item.answer]}
      </li>
    `);
  });

  if (unanswered.length > 0) {
    resultsBox.hidden = false;
    resultsBox.innerHTML = `
      <h2>Please complete all questions</h2>
      <p>You still need to answer question(s): ${unanswered.join(", ")}.</p>
    `;
    resultsBox.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const percent = Math.round((score / quizQuestions.length) * 100);

  resultsBox.hidden = false;
  resultsBox.innerHTML = `
    <h2>Your Results</h2>
    <p><strong>Score:</strong> ${score} out of ${quizQuestions.length} (${percent}%)</p>
    <h3>Answer Review</h3>
    <ol class="review-list">
      ${reviewItems.join("")}
    </ol>
  `;

  resultsBox.scrollIntoView({ behavior: "smooth" });
}

buildQuiz();
quizForm.addEventListener("submit", gradeQuiz);
