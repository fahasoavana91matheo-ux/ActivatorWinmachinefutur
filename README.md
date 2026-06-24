# Activator-Win-machine-futur
Une calculatrice simple et futuriste compatible avec **tous les écrans du monde** (mobile, tablette, desktop).
---
##  Fonctionnalités

| Fonctionnalité | Description |
|---------------|-------------|
|  **Bouton Power** | Allume/éteint la machine |
|  **Chiffres 0-9** | Entrée des nombres |
| **+ - × ÷ %** | 5 opérations disponibles |
|  **DEL** | Efface un par un |
|  **AC** | Remise à zéro (sans toucher l'historique) |
|  **HIST** | Affiche l'historique (50 calculs max) |
|  **Responsive** | Compatible tous écrans (360px → 768px+) |

---

## Comment utiliser

### 1. Installer les fichiers

Crée **3 fichiers** dans le même dossier :


### 2. Ouvrir dans VSCode

```bash
# Dans VSCode, ouvre le dossier :
File → Open Folder → [choisis ton dossier]

# Ensuite, lance le serveur :
Ctrl + Shift + P → "Live Server" → "Open with Live Server"
```

**Ou simplement :** Double-clique sur `index.html` pour ouvrir dans Chrome/Firefox.

---

## Guide d'utilisation

### Allumer la calculatrice
1. Clique sur le bouton ** Power**
2. Le bouton devient
3. L'écran affiche "Machine Prête"

### Faire un calcul
1. Tape un chiffre (ex: **5**)
2. Clique sur une opération (ex: **+**)
3. Tape le deuxième chiffre (ex: **3**)
4. Clique sur **=** pour calculer

### Effacer
- **DEL** : Efface un chiffre à la fois
- **AC** : Remet tout à zéro (0)

### Voir l'historique
1. Clique sur **HIST**
2. L'écran affiche l'historique
3. Clique sur **HIST** again pour fermer

---

##  Design


- **Couleurs** : Noir, gris foncé, rouge, vert néon
- **Effets** : Gradient, ombres, transitions 0.2s
- **Boutons** : Arrondis (14px), gradient radial

---

##  Compatibilité écrans

| Taille | Device | Adaptation |
|--------|--------|------------|
| 360px-480px | Mobile petit | Font-size réduit, padding réduit |
| 480px-768px | Mobile grand / Tablette | Taille normale |
| 768px+ | Desktop | Max-width 450px |
| Hauteur < 700px | Mobile vertical | Screen plus petit |

---

## Code - Points importants

### Ce qui est CONSERVÉ
- `parseFloat()` - simple, natif JavaScript
- Calculs manuels avec `if/else`
- Historique avec tableau simple
- Design futuriste gardé

---

### HTML Structure
```html
<div class="app">
  <div class="calc">
    <div class="screen">     <!-- Écran --></div>
    <div class="layout">     <!-- Boutons --></div>
  </div>
</div>
```

### CSS Responsive
```css
@media (max-width: 480px) {
  /* Mobile petit */
}

@media (min-width: 768px) {
  /* Desktop */
}
```

### JavaScript Logic
```javascript
// Variables principales
let machineAllumee = false;
let memoireNombre = "";
let operationChoisie = "+";

// Calcul manuel (sans eval)
if (operationChoisie === "+") {
  resultat = valeur1 + valeur2;
}
```

---

##  Auteur

Développé pour **ACTIVATOR-WIN-MACHINE-FUTUR** - Projet étudiant
LES ACTEURS SONTS : 
- **[ANTSOMITIAVANA Fahasoavana Tokinjanahary]** -
- **[Mroivili Abdoulkader Mohamed Cheha]** - 
- **[ROBIN]** -

---

## License

Projet personnel - Utilisation libre

---

## Future Updates

- Ajouter plus d'opérations (√, puissance)
- Thèmes personnalisables
- Mode sombre/clair
- Sauvegarde historique local

---

**Fait avec amour pour tous les écrans du monde !**
