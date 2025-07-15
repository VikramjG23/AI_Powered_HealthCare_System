// Nevbar

      function openSymptomWindow() {
        document.getElementById('symptomWindow').style.display = 'block';
        document.getElementById('allopathyDr.').style.display = 'none';
        document.getElementById('homeopathyDr.').style.display = 'none';
      }
      function closeSymptomWindow() { document.getElementById('symptomWindow').style.display = 'none'; }
      function openAllopathyDoctorWindow() {
        document.getElementById('allopathyDr.').style.display = 'block';
        document.getElementById('homeopathyDr.').style.display = 'none';
        document.getElementById('symptomWindow').style.display = 'none';
      }
      function closeAllopathyDoctorWindow() { document.getElementById('allopathyDr.').style.display = 'none'; }
      function openHomeopathyDoctorWindow() {
        document.getElementById('homeopathyDr.').style.display = 'block';
        document.getElementById('allopathyDr.').style.display = 'none';
        document.getElementById('symptomWindow').style.display = 'none';
      }
      function closeHomeopathyDoctorWindow() { document.getElementById('homeopathyDr.').style.display = 'none'; }


      // Search Box
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

      // Chat Bot

      function toggleChat() {
        const chat = document.getElementById("chatWindow");
        chat.style.display = chat.style.display === "flex" ? "none" : "flex";
      }

      function sendMessage() {
        const input = document.getElementById("userInput");
        const msg = input.value.trim();
        if (!msg) return;

        const messages = document.getElementById("chatMessages");

        const userMsg = document.createElement("div");
        userMsg.className = "message user-message";
        userMsg.textContent = msg;
        messages.appendChild(userMsg);

        input.value = "";
        messages.scrollTop = messages.scrollHeight;

        // Simulate bot typing
        setTimeout(() => {
          const botMsg = document.createElement("div");
          botMsg.className = "message bot-message";
          botMsg.textContent = "Thinking... 🤖";
          messages.appendChild(botMsg);
          messages.scrollTop = messages.scrollHeight;
        }, 500);
      }

      document.getElementById("userInput").addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
          event.preventDefault();
          sendMessage();
        }
      })