let quizData = [];
let currentQuestion = 0;
let score = 0;

// Add this to make sure the functions are globally available
window.addQuestion = function() {
    const qText = document.getElementById("new-question").value;
    const opt0 = document.getElementById("opt0").value;
    const opt1 = document.getElementById("opt1").value;
    const opt2 = document.getElementById("opt2").value;
    const opt3 = document.getElementById("opt3").value;
    const correctIdx = document.getElementById("correct-idx").value;

    if (qText === "" || opt0 === "" || opt1 === "") {
        alert("Please fill in the question and at least two options!");
        return;
    }

    quizData.push({
        question: qText,
        options: [opt0, opt1, opt2, opt3],
        correct: parseInt(correctIdx)
    });

    // Clear inputs
    document.getElementById("new-question").value = "";
    document.getElementById("opt0").value = "";
    document.getElementById("opt1").value = "";
    document.getElementById("opt2").value = "";
    document.getElementById("opt3").value = "";
    document.getElementById("correct-idx").value = "";

    alert("Question added successfully! Total: " + quizData.length);
};

window.startQuiz = function() {
    if (quizData.length === 0) {
        alert("Please add at least one question first!");
        return;
    }
    document.getElementById("creation-section").style.display = "none";
    document.getElementById("quiz-display").style.display = "block";
    loadQuestion();
};

function loadQuestion() {
    const q = quizData[currentQuestion];
    document.getElementById("question-text").innerText = q.question;
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((option, index) => {
        if(option.trim() !== "") {
            const button = document.createElement("button");
            button.innerText = option;
            button.className = "btn"; 
            button.style.display = "block";
            button.style.margin = "10px auto";
            button.onclick = () => checkAnswer(index);
            container.appendChild(button);
        }
    });
}

function checkAnswer(selected) {
    if (selected === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById("quiz-display").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score-text").innerText = score + " / " + quizData.length;
}
