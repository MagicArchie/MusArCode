# MusArCode  

**MusArCode** (*Music, Art & Code*) is a **mobile-first interactive educational game** built with **HTML**, **CSS**, **JavaScript**, and the **p5.js** library.  
It combines music, art, augmented reality (AR), and programming to create a learning experience inspired by the *Discover Corfu Old Town (DisCoT)* project — turning exploration and history into a playful digital adventure.

---

## Overview  

MusArCode is designed **exclusively for smartphones**.  
The game automatically adapts to different screen sizes and **notifies players when to rotate their device** (portrait ↔ landscape) for the best experience.  

Players explore a map of Corfu, scan AR markers, watch short videos, and answer quiz questions to unlock clues that gradually reveal a **hidden final phrase** — the secret name of the island they’re exploring.

---

## Purpose  

MusArCode was developed to:  
- Blend **culture**, **education**, and **technology** into one interactive experience.  
- Encourage **active learning** through play and discovery.  
- Support both **Greek** and **English** languages.  
- Demonstrate creative coding and AR design for mobile devices.  

---

## How to Play  

### Start Menu  
- A welcome screen introduces the player to the game.  
- Choose a difficulty level:  
  - **Junior Hunt (Easy)** – 6 locations  
  - **Master Hunt (Hard)** – 12 locations  
- Press **Play** to begin.

### Map Screen  
- Displays the **Old Town of Corfu** map.  
- Location names are **black** until completed, then turn **white**.  
- A top drop-down menu includes:  
  - **Scan AR Marker** – opens the camera scanner  
  - **Language Settings** – switch between Greek and English, toggle subtitles  
  - **Leave Game** – return to the start screen (progress resets)

### AR Scanning  
- Tap **Scan** to open the AR scanner page.  
- Use:  
  - **Start** – activate camera scanning  
  - **Stop** – pause scanning  
  - **Go Back** – return to the map  
- Scanning a valid marker opens a video page with historical information about the location.

### Quiz Challenge  
- After watching a video, the player answers a **multiple-choice question (3 options)**.  
- Correct answers grant a **hint** for the next location and a **letter** for the final puzzle.  
- Incorrect answers trigger a sound and allow retrying.

### Final Puzzle  
- As the player progresses, letters fill a bar at the bottom of the map.  
- When complete, these letters form a **secret phrase** revealing the true identity of the island.  
- Solving the mystery completes the game.

---

## Platform  

- **Mobile only** (Android and iOS browsers)  
- **Responsive design** – adjusts to any screen size  
- **Touch controls** – designed entirely for mobile use  
- **Rotation alerts** – prompts the player to change orientation when necessary  

---

## Tech Stack  

- **HTML5** – structure  
- **CSS3** – responsive styling and layout  
- **JavaScript (ES6)** – interactivity and logic  
- **p5.js** – graphics rendering and input handling  
- *(Optional)* **AR.js / WebXR** – marker-based AR support  

---

## Running the Game  

Clone the repository:  
```bash
git clone https://github.com/MagicArchie/MusArCode.git
cd MusArCode
