const DATA_BASE = "data";
// "https://tibbtech2.s3.amazonaws.com";

/*
 Folder structure:
 P4/
   animal314_C1.png
   animal314_C2.png
   animal315_C1.png
*/

const DATA_INDEX = {
  P4: {
    animal1: ["C1", "C2", "C3", "C4"],
    animal2: ["C1", "C2", "C3", "C4"],
    animal3: ["GAD"],
    animal4: ["Nissl"],
  },
  P14: {
    animal1: ["Nissl"],
    animal2: ["GAD"],
    animal3: ["C1", "C2", "C3", "C4"],
    animal4: ["C1", "C2", "C3", "C4"],
    animal5: ["C1", "C2", "C3", "C4"],
  },
  P56: {
    animal201: ["C1"]
  }
};

// UI elements (already in your HTML)
const ageEl = document.getElementById("age");
const animalEl = document.getElementById("animal");
const channelEl = document.getElementById("channel");
const viewer = document.getElementById("viewer");

/* ------------------ Populate dropdowns ------------------ */

function populateAges() {
  ageEl.innerHTML = "";
  Object.keys(DATA_INDEX).forEach(age => {
    ageEl.add(new Option(age, age));
  });

  populateAnimals();
}

function populateAnimals() {
  animalEl.innerHTML = "";

  const age = ageEl.value;
  const animals = Object.keys(DATA_INDEX[age] || {});

  animals.forEach(animal => {
    animalEl.add(new Option(animal, animal));
  });

  populateChannels();
}

function populateChannels() {
  channelEl.innerHTML = "";

  const age = ageEl.value;
  const animal = animalEl.value;
  const channels = DATA_INDEX[age]?.[animal] || [];

  channels.forEach(ch => {
    channelEl.add(new Option(ch, ch));
  });

  renderGrid();
}

/* ------------------ Render grid image ------------------ */

function renderGrid() {
  viewer.innerHTML = "";

  const age = ageEl.value;
  const animal = animalEl.value;
  const channel = channelEl.value;

  if (!age || !animal || !channel) return;

  const img = document.createElement("img");

  img.src = `${DATA_BASE}/${age}/${animal}_${channel}.png`;
  img.alt = `${animal} ${channel} grid`;
  img.style.maxWidth = "100%";
  img.style.borderRadius = "6px";
  img.style.boxShadow = "0 4px 14px rgba(0,0,0,0.12)";

  img.onerror = () => {
    viewer.innerHTML =
      `<p style="color:#888;">Grid image not found.</p>`;
  };

  viewer.appendChild(img);
}

/* ------------------ Event bindings ------------------ */

ageEl.addEventListener("change", populateAnimals);
animalEl.addEventListener("change", populateChannels);
channelEl.addEventListener("change", renderGrid);

/* ------------------ Init ------------------ */

populateAges();
