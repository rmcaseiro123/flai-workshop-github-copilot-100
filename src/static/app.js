// Translations object
const translations = {
  en: {
    schoolName: "Mergington High School",
    subtitle: "Extracurricular Activities Portal",
    statsActivities: "Activities",
    statsStudents: "Students",
    browseActivities: "Browse Activities",
    searchPlaceholder: "Search activities...",
    filterAll: "All",
    filterSports: "Sports",
    filterArts: "Arts",
    filterAcademic: "Academic",
    filterOther: "Other",
    quickSignup: "Quick Sign Up",
    labelEmail: "Student Email",
    emailPlaceholder: "student@mergington.edu",
    labelActivity: "Select Activity",
    activityPlaceholder: "Choose an activity...",
    btnSignup: "Sign Up Now",
    footer: "Made with ❤️ by Mergington High School · © 2026",
    noActivitiesFound: "No activities found",
    noActivitiesMsg: "Try adjusting your search or filter",
    failedToLoad: "Failed to load activities",
    tryRefresh: "Please try refreshing the page",
    participants: "Participants",
    noParticipantsYet: "No participants yet. Be the first to join! 🚀",
    spotsAvailable: "spots available",
    removeConfirm: "Remove",
    from: "from",
    signingUp: "Signing up...",
    loadingActivities: "Loading activities...",
    schedule: "Schedule"
  },
  pt: {
    schoolName: "Escola Secundária Mergington",
    subtitle: "Portal de Atividades Extracurriculares",
    statsActivities: "Atividades",
    statsStudents: "Alunos",
    browseActivities: "Explorar Atividades",
    searchPlaceholder: "Pesquisar atividades...",
    filterAll: "Todas",
    filterSports: "Desportos",
    filterArts: "Artes",
    filterAcademic: "Académico",
    filterOther: "Outras",
    quickSignup: "Inscrição Rápida",
    labelEmail: "Email do Aluno",
    emailPlaceholder: "aluno@mergington.edu",
    labelActivity: "Selecionar Atividade",
    activityPlaceholder: "Escolha uma atividade...",
    btnSignup: "Inscrever Agora",
    footer: "Feito com ❤️ pela Escola Secundária Mergington · © 2026",
    noActivitiesFound: "Nenhuma atividade encontrada",
    noActivitiesMsg: "Tente ajustar a pesquisa ou filtro",
    failedToLoad: "Falha ao carregar atividades",
    tryRefresh: "Por favor, atualize a página",
    participants: "Participantes",
    noParticipantsYet: "Ainda sem participantes. Seja o primeiro a juntar-se! 🚀",
    spotsAvailable: "vagas disponíveis",
    removeConfirm: "Remover",
    from: "de",
    signingUp: "A inscrever...",
    loadingActivities: "A carregar atividades...",
    schedule: "Horário"
  }
};

// Activity translations
const activityTranslations = {
  en: {
    "Chess Club": {
      name: "Chess Club",
      description: "Learn strategies and compete in chess tournaments"
    },
    "Programming Class": {
      name: "Programming Class",
      description: "Learn programming fundamentals and build software projects"
    },
    "Gym Class": {
      name: "Gym Class",
      description: "Physical education and sports activities"
    },
    "Soccer Team": {
      name: "Soccer Team",
      description: "Join the school soccer team and compete in local leagues"
    },
    "Basketball Club": {
      name: "Basketball Club",
      description: "Practice basketball skills and play friendly matches"
    },
    "Drama Club": {
      name: "Drama Club",
      description: "Act, direct, and participate in school theater productions"
    },
    "Art Workshop": {
      name: "Art Workshop",
      description: "Explore painting, drawing, and sculpture techniques"
    },
    "Math Olympiad": {
      name: "Math Olympiad",
      description: "Prepare for math competitions and solve challenging problems"
    },
    "Science Club": {
      name: "Science Club",
      description: "Conduct experiments and explore scientific concepts"
    }
  },
  pt: {
    "Chess Club": {
      name: "Clube de Xadrez",
      description: "Aprenda estratégias e participe em torneios de xadrez"
    },
    "Programming Class": {
      name: "Aula de Programação",
      description: "Aprenda fundamentos de programação e construa projetos de software"
    },
    "Gym Class": {
      name: "Aula de Ginástica",
      description: "Educação física e atividades desportivas"
    },
    "Soccer Team": {
      name: "Equipa de Futebol",
      description: "Junte-se à equipa de futebol da escola e compete em ligas locais"
    },
    "Basketball Club": {
      name: "Clube de Basquetebol",
      description: "Pratique habilidades de basquetebol e jogue partidas amigáveis"
    },
    "Drama Club": {
      name: "Clube de Teatro",
      description: "Atue, dirija e participe em produções teatrais da escola"
    },
    "Art Workshop": {
      name: "Oficina de Arte",
      description: "Explore técnicas de pintura, desenho e escultura"
    },
    "Math Olympiad": {
      name: "Olimpíadas de Matemática",
      description: "Prepare-se para competições de matemática e resolva problemas desafiantes"
    },
    "Science Club": {
      name: "Clube de Ciências",
      description: "Realize experiências e explore conceitos científicos"
    }
  }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'en';

// Function to translate the page
function translatePage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });

  // Translate placeholders
  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[currentLanguage][key]) {
      element.placeholder = translations[currentLanguage][key];
    }
  });

  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === currentLanguage) {
      btn.classList.add('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const activitiesList = document.getElementById("activities-list");
  const activitySelect = document.getElementById("activity");
  const signupForm = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");
  const searchInput = document.getElementById("search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const langButtons = document.querySelectorAll(".lang-btn");
  
  let allActivities = {};
  let currentFilter = "all";
  let currentSearch = "";

  // Initialize translations
  translatePage();

  // Language switcher
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLanguage = btn.dataset.lang;
      localStorage.setItem('language', currentLanguage);
      translatePage();
      // Refresh activities to show translated content
      filterAndRenderActivities();
    });
  });

  // Activity categories mapping
  const activityCategories = {
    "Soccer Team": "sports",
    "Basketball Club": "sports",
    "Gym Class": "sports",
    "Drama Club": "arts",
    "Art Workshop": "arts",
    "Math Olympiad": "academic",
    "Science Club": "academic",
    "Programming Class": "academic",
    "Chess Club": "other"
  };

  // Function to get category icon
  function getCategoryIcon(category) {
    const icons = {
      sports: "⚽",
      arts: "🎨",
      academic: "📚",
      other: "✨"
    };
    return icons[category] || "✨";
  }

  // Function to calculate spots availability level
  function getSpotsLevel(spotsLeft, maxParticipants) {
    const percentage = (spotsLeft / maxParticipants) * 100;
    if (percentage <= 20) return "low";
    if (percentage <= 50) return "medium";
    return "high";
  }

  // Function to update stats
  function updateStats() {
    const totalActivities = Object.keys(allActivities).length;
    const totalStudents = Object.values(allActivities).reduce(
      (sum, activity) => sum + activity.participants.length, 0
    );
    
    document.querySelector(".stat-item:nth-child(1) .stat-number").textContent = totalActivities;
    document.querySelector(".stat-item:nth-child(2) .stat-number").textContent = totalStudents;
  }

  // Function to filter and render activities
  function filterAndRenderActivities() {
    const filteredActivities = Object.entries(allActivities).filter(([name, details]) => {
      const category = activityCategories[name] || "other";
      const translatedName = activityTranslations[currentLanguage][name]?.name || name;
      const translatedDesc = activityTranslations[currentLanguage][name]?.description || details.description;
      const matchesFilter = currentFilter === "all" || category === currentFilter;
      const matchesSearch = translatedName.toLowerCase().includes(currentSearch.toLowerCase()) ||
                           translatedDesc.toLowerCase().includes(currentSearch.toLowerCase()) ||
                           name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                           details.description.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });

    if (filteredActivities.length === 0) {
      activitiesList.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p style="margin-top: 16px; font-size: 16px; font-weight: 600;">${translations[currentLanguage].noActivitiesFound}</p>
          <p style="margin-top: 8px; font-size: 14px;">${translations[currentLanguage].noActivitiesMsg}</p>
        </div>
      `;
      return;
    }

    activitiesList.innerHTML = "";
    filteredActivities.forEach(([name, details]) => {
      const activityCard = createActivityCard(name, details);
      activitiesList.appendChild(activityCard);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll(".delete-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        e.stopPropagation();
        const activityName = e.currentTarget.dataset.activity;
        const email = e.currentTarget.dataset.email;
        const translatedName = activityTranslations[currentLanguage][activityName]?.name || activityName;
        
        if (confirm(`${translations[currentLanguage].removeConfirm} ${email} ${translations[currentLanguage].from} ${translatedName}?`)) {
          await unregisterParticipant(activityName, email);
        }
      });
    });
  }

  // Function to create activity card
  function createActivityCard(name, details) {
    const activityCard = document.createElement("div");
    activityCard.className = "activity-card";

    const category = activityCategories[name] || "other";
    const spotsLeft = details.max_participants - details.participants.length;
    const spotsLevel = getSpotsLevel(spotsLeft, details.max_participants);
    
    // Get translated activity name and description
    const translatedName = activityTranslations[currentLanguage][name]?.name || name;
    const translatedDesc = activityTranslations[currentLanguage][name]?.description || details.description;

    let participantsHTML = "";
    if (details.participants && details.participants.length > 0) {
      participantsHTML = `
        <div class="participants-section">
          <strong>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
              <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
            </svg>
            ${translations[currentLanguage].participants} (${details.participants.length})
          </strong>
          <ul class="participants-list">
            ${details.participants.map(p => `
              <li>
                <span class="participant-email">${p}</span>
                <button class="delete-btn" data-activity="${name}" data-email="${p}" title="${translations[currentLanguage].removeConfirm}">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    } else {
      participantsHTML = `
        <div class="participants-section empty">
          <em>${translations[currentLanguage].noParticipantsYet}</em>
        </div>
      `;
    }

    activityCard.innerHTML = `
      <div class="activity-header">
        <h4>${translatedName}</h4>
        <span class="category-badge category-${category}">${category}</span>
      </div>
      <p>${translatedDesc}</p>
      <div class="activity-info">
        <div class="info-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
          </svg>
          <span>${details.schedule}</span>
        </div>
        <div class="info-row">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
          <span class="spots-indicator ${spotsLevel}">
            ${spotsLeft} / ${details.max_participants} ${translations[currentLanguage].spotsAvailable}
          </span>
        </div>
      </div>
      ${participantsHTML}
    `;

    return activityCard;
  }

  // Function to fetch activities from API
  async function fetchActivities() {
    try {
      const response = await fetch("/activities");
      const activities = await response.json();

      allActivities = activities;
      
      // Clear loading message and select options
      activitiesList.innerHTML = "";
      activitySelect.innerHTML = `<option value="">${translations[currentLanguage].activityPlaceholder}</option>`;

      // Populate select dropdown with translated names
      Object.keys(activities).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        const translatedName = activityTranslations[currentLanguage][name]?.name || name;
        option.textContent = translatedName;
        activitySelect.appendChild(option);
      });

      // Update stats
      updateStats();
      
      // Render activities with current filters
      filterAndRenderActivities();
    } catch (error) {
      activitiesList.innerHTML = `
        <div class="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4M12 16h.01"></path>
          </svg>
          <p style="margin-top: 16px; font-size: 16px; font-weight: 600; color: #ef4444;">${translations[currentLanguage].failedToLoad}</p>
          <p style="margin-top: 8px; font-size: 14px;">${translations[currentLanguage].tryRefresh}</p>
        </div>
      `;
      console.error("Error fetching activities:", error);
    }
  }

  // Function to unregister a participant from an activity
  async function unregisterParticipant(activityName, email) {
    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activityName)}/unregister?email=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (response.ok) {
        await fetchActivities();
        showMessage(result.message, "success");
      } else {
        showMessage(result.detail || "Failed to remove participant", "error");
      }
    } catch (error) {
      showMessage("Failed to remove participant. Please try again.", "error");
      console.error("Error removing participant:", error);
    }
  }

  // Function to show message with icon
  function showMessage(text, type) {
    const icons = {
      success: '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>',
      error: '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>',
      info: '<svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor"><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>'
    };
    
    messageDiv.innerHTML = `${icons[type]} ${text}`;
    messageDiv.className = type;
    messageDiv.classList.remove("hidden");
    
    setTimeout(() => {
      messageDiv.classList.add("hidden");
    }, 5000);
  }

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const activity = document.getElementById("activity").value;
    const submitButton = signupForm.querySelector('button[type="submit"]');

    // Disable button during submission
    submitButton.disabled = true;
    submitButton.innerHTML = `<div class="spinner" style="width: 20px; height: 20px; border-width: 2px;"></div> ${translations[currentLanguage].signingUp}`;

    try {
      const response = await fetch(
        `/activities/${encodeURIComponent(activity)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (response.ok) {
        await fetchActivities();
        showMessage(result.message, "success");
        signupForm.reset();
      } else {
        showMessage(result.detail || "An error occurred", "error");
      }
    } catch (error) {
      showMessage("Failed to sign up. Please try again.", "error");
      console.error("Error signing up:", error);
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
        <span data-i18n="btnSignup">${translations[currentLanguage].btnSignup}</span>
      `;
    }
  });

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    filterAndRenderActivities();
  });

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.dataset.category;
      filterAndRenderActivities();
    });
  });

  // Initialize app
  fetchActivities();
});
