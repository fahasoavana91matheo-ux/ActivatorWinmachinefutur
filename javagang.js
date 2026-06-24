// Récupération des éléments HTML
const display = document.getElementById("display");
const statusText = document.getElementById("status");
const opSlider = document.getElementById("opSlider");
const powerBtn = document.getElementById("powerBtn");
const delBtn = document.getElementById("delBtn");
const acBtn = document.getElementById("acBtn");
const histBtn = document.getElementById("histBtn");
const equalBtn = document.getElementById("equalBtn");
const numBtns = document.querySelectorAll(".num");
const opItems = document.querySelectorAll(".op-item");
const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");

// Variables de la calculatrice
let machineAllumee = false;
let memoireNombre = "";
let operationChoisie = "+";
let effacerAuProchainChiffre = false;

// Tableau simple pour stocker l'historique (50 max)
let listeHistorique = [];
let affichageHistoriqueOuvert = false;

// 1. GESTION DU BOUTON POWER (ON / OFF)
powerBtn.addEventListener("click", function() {
  machineAllumee = !machineAllumee; // Alterne entre true et false

  if (machineAllumee === true) {
    powerBtn.classList.add("active");
    statusText.textContent = "Machine Prête";
    display.textContent = "0";
    opSlider.style.display = "block"; // Affiche le curseur triangle
    opSlider.style.top = "10%";
    operationChoisie = "+";
    basculerBoutons(true); // Active les boutons
  } else {
    powerBtn.classList.remove("active");
    statusText.textContent = "Éteinte (Cliquez sur Power)";
    display.textContent = "0";
    opSlider.style.display = "none"; // Cache le curseur triangle
    historyPanel.style.display = "none"; // Ferme l'historique
    affichageHistoriqueOuvert = false;
    memoireNombre = "";
    basculerBoutons(false); // Désactive les boutons
  }
});

// Fonction pour activer ou désactiver les touches en bloc
function basculerBoutons(activer) {
  const tousLesBoutons = document.querySelectorAll("button:not(#powerBtn)");
  tousLesBoutons.forEach(function(btn) {
    btn.disabled = !activer;
  });
}

// 2. GESTION DES CHIFFRES
numBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    const chiffre = btn.textContent;

    if (display.textContent === "0" || effacerAuProchainChiffre === true) {  
      display.textContent = chiffre;  
      effacerAuProchainChiffre = false;  
    } else {  
      if (chiffre === "." && display.textContent.includes(".")) {  
        return;   
      }  
      display.textContent = display.textContent + chiffre;  
    }
  });
});

// 3. GESTION DU CURSEUR D'OPÉRATION (CLIC SUR LA BARRE ROUGE)
opItems.forEach(function(item) {
  item.addEventListener("click", function() {
    memoireNombre = display.textContent;
    operationChoisie = item.getAttribute("data-op");

    // Déplacement du triangle blanc  
    opSlider.style.top = item.style.top;  

    effacerAuProchainChiffre = true;  
    statusText.textContent = "Opération : " + operationChoisie;
  });
});

// 4. BOUTON DEL (EFFACEMENT UN PAR UN)
delBtn.addEventListener("click", function() {
  const texteActuel = display.textContent;

  // Si le texte contient plus d'un caractère, on coupe le dernier
  if (texteActuel.length > 1) {
    display.textContent = texteActuel.substring(0, texteActuel.length - 1);
  } else {
    // S'il ne reste qu'un seul chiffre, on remet à 0
    display.textContent = "0";
  }
});

// 5. BOUTON AC (ALL CLEAR - REMISE À NEUF SANS TOUCHER L'HISTORIQUE)
acBtn.addEventListener("click", function() {
  display.textContent = "0";
  memoireNombre = "";
  operationChoisie = "+";
  effacerAuProchainChiffre = false;
  opSlider.style.top = "10%";
  statusText.textContent = "Machine Nettoyée";
});

// 6. ALGORITHME DE CALCUL ET AJOUT À L'HISTORIQUE
equalBtn.addEventListener("click", function() {
  if (memoireNombre === "") return;

  const valeur1 = parseFloat(memoireNombre);
  const valeur2 = parseFloat(display.textContent);
  let resultatCalcul = 0;

  if (operationChoisie === "+") { 
    resultatCalcul = valeur1 + valeur2; 
  }
  else if (operationChoisie === "-") { 
    resultatCalcul = valeur1 - valeur2; 
  }
  else if (operationChoisie === "*") { 
    resultatCalcul = valeur1 * valeur2; 
  }
  else if (operationChoisie === "/") {
    resultatCalcul = (valeur2 === 0) ? "Erreur" : valeur1 / valeur2;
  }
  else if (operationChoisie === "%") {
    resultatCalcul = (valeur2 === 0) ? "Erreur" : valeur1 % valeur2;
  }

  // --- BLOC HISTORIQUE ---
  // Création de la ligne de texte du calcul actuel
  const ligneCalcul = valeur1 + " " + operationChoisie + " " + valeur2 + " = " + resultatCalcul;

  // Ajout au tableau
  listeHistorique.push(ligneCalcul);

  // Si on dépasse 50, on retire le plus ancien (le tout premier du tableau)
  if (listeHistorique.length > 50) {
    listeHistorique.shift();
  }

  // Rafraîchir le rendu visuel de l'historique
  mettreAJourRenduHistorique();

  // Affichage du résultat sur l'écran principal
  display.textContent = resultatCalcul;
  memoireNombre = "";
  effacerAuProchainChiffre = true;
  statusText.textContent = "Calcul effectué";
});

// 7. BOUTON HISTORIQUE (AFFICHER / CACHER)
histBtn.addEventListener("click", function() {
  affichageHistoriqueOuvert = !affichageHistoriqueOuvert;

  if (affichageHistoriqueOuvert === true) {
    historyPanel.style.display = "flex";
  } else {
    historyPanel.style.display = "none";
  }
});

// Fonction pour reconstruire le HTML à l'intérieur de l'historique
function mettreAJourRenduHistorique() {
  historyList.innerHTML = ""; // On vide l'ancienne liste

  // On boucle à l'envers pour afficher le plus récent en haut de la liste
  for (let i = listeHistorique.length - 1; i >= 0; i--) {
    const p = document.createElement("p");
    p.textContent = listeHistorique[i];
    p.style.padding = "3px 0";
    p.style.borderBottom = "1px solid #222";
    historyList.appendChild(p);
  }
}
