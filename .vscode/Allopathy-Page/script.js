const placeholders = [
    "Fever, headache, fatigue...",
    "Cough, sore throat, congestion...",
    "Joint pain, muscle stiffness...",
    "Skin rash, itching, redness...",
    "Nausea, vomiting, stomach pain..."
  ];
  
  let index = 0;
  let repeatCount = 0;
  const maxRepeats = 5;
  const inputField = document.getElementById("search");
  
  function typeEffect(text, callback) {
    let i = 0;
    inputField.placeholder = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        inputField.placeholder += text[i];
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => deleteEffect(callback), 2000);
      }
    }, 100);
  }
  
  const symptomSuggestions = [
    "Fever", "Cough", "Headache", "Cold", "Fatigue",
    "Chest Pain", "Back Pain", "Nausea", "Vomiting",
    "Shortness of Breath", "Diarrhea", "Sore Throat",
    "Muscle Ache", "Dizziness", "Skin Rash"
  ];
  const input = document.getElementById("search");
  const suggestionBox = document.getElementById("suggestionBox");
  
  input.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    suggestionBox.innerHTML = ""; // clear previous suggestions
  
    if (value === "") return;
  
    const filtered = symptomSuggestions.filter(symptom =>
      symptom.toLowerCase().includes(value)
    );
  
    filtered.forEach(symptom => {
      const div = document.createElement("div");
      div.textContent = symptom;
      div.onclick = () => {
        input.value = symptom;
        suggestionBox.innerHTML = "";
      };
      suggestionBox.appendChild(div);
    });
  });
  
  document.addEventListener("click", function (e) {
    if (!suggestionBox.contains(e.target) && e.target !== input) {
      suggestionBox.innerHTML = "";
    }
  });

  // Optional: Close suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!suggestionBox.contains(e.target) && e.target !== input) {
    suggestionBox.innerHTML = "";
  }
});

function deleteEffect(callback) {
  let text = inputField.placeholder;
  let i = text.length;
  const interval = setInterval(() => {
    if (i > 0) {
      inputField.placeholder = text.substring(0, i - 1);
      i--;
    } else {
      clearInterval(interval);
      callback();
    }
  }, 100);
}

function updatePlaceholder() {
  if (repeatCount >= maxRepeats) return;
  typeEffect(placeholders[index], () => {
    index = (index + 1) % placeholders.length;
    if (index === 0) repeatCount++;
    setTimeout(updatePlaceholder, 500);
  });
}

updatePlaceholder();
