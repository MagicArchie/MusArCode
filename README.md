# MusArCode  

**MusArCode** (*Music, Art & Code*) is a **mobile-first interactive educational game** built with **HTML**, **CSS**, **JavaScript**, and the **p5.js** library.  
It combines music, art, augmented reality (AR), and programming to create a learning experience conceptually based on the *Discover Corfu Old Town (DisCoT)* educational project — turning exploration and local history into a playful digital adventure.

---

## Overview  

MusArCode is designed **exclusively for smartphones**.  
The game automatically adapts to different screen sizes and **notifies players when to rotate their device** (portrait ↔ landscape) for the best experience.  

Players explore a digital map of Corfu, scan AR markers, watch short videos, and answer quiz questions to unlock clues that gradually reveal a **hidden final phrase** — the secret name of the island they’re exploring.  

Throughout the game, a **narrator** guides the player by providing **spoken hints and directions** for each location. The narration changes depending on the selected language (Greek or English) and helps players progress through the adventure naturally.

---

## Purpose  

MusArCode was developed to:  
- Blend **culture**, **education**, and **technology** into one interactive experience.  
- Encourage **active learning** through play and discovery.  
- Support both **Greek** and **English** languages, with narration and subtitles.  
- Demonstrate creative coding and AR design for mobile devices.  

---

## How to Play  

### Setup  
When the game starts:  
1. Choose a **difficulty level** on the main menu:  
   - **Junior Hunt (Easy)** – 6 total locations, simpler hints, shorter routes.  
   - **Master Hunt (Hard)** – 12 total locations, more challenging hints and puzzles.  
2. Once the game begins, open the **drop-down menu** at the top of the map.  
3. Select your **language** (Greek or English).  
4. After selecting a language, the page **resets automatically** — this activates the **narrator**, who introduces the game world and gives your **first spoken hint** to guide you to the starting location.  

---

### Map Screen  
- Displays the **Old Town of Corfu** map.  
- Location names appear **black** until completed, then turn **white**.  
- The top drop-down menu includes:  
  - **Scan AR Marker** – opens the camera scanner  
  - **Language Settings** – switch between Greek and English, toggle subtitles  
  - **Leave Game** – return to the start screen (progress resets)

---

### AR Scanning  
- Tap **Scan** to open the AR scanner page.  
- Use:  
  - **Start** – activate camera scanning  
  - **Stop** – pause scanning  
  - **Go Back** – return to the map  
- Scanning a valid marker opens a **video page** with historical information about the location.

---

### Quiz Challenge  
- After watching a video, the player answers a **multiple-choice question (3 options)**.  
- Correct answers grant a **hint** for the next location and a **letter** for the final puzzle.  
- Incorrect answers trigger a sound and allow retrying.  
- The **narrator** also provides additional clues and encouragement when the player gets stuck or advances to the next area.  

---

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
