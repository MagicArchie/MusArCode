# MusArCode  

**MusArCode** (*Museumkit Augmented Reality Corfu-Code*) is a **mobile-first interactive educational game** built with **HTML**, **CSS**, **JavaScript**, and the **p5.js** library.  
It combines music, art, augmented reality (AR), and programming to create a learning experience conceptually based on the *Discover Corfu Old Town (DisCoT)* educational project — turning exploration and local history into a playful digital adventure.

🎮 **Play Now:** [https://magicarchie.github.io/MusArCode/](https://magicarchie.github.io/MusArCode/)

---

## Overview  

MusArCode is designed **exclusively for smartphones**.  
The game automatically adapts to different screen sizes and **notifies players when to rotate their device** (portrait ↔ landscape) for the best experience.  

Players explore a digital map of Corfu, scan AR markers, watch short videos, and answer quiz questions to unlock clues that gradually reveal a **hidden final phrase** — the secret name of the island they’re exploring and find out the final destination
“The mysterious building with many faces”.

Throughout the game, a **narrator** guides the player by providing **spoken hints and directions** for each location. The narration changes depending on the selected language (Greek or English) and helps players progress naturally through the adventure.

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

## Locations  

Players explore some of the most iconic sites in Corfu’s Old Town, discovering their history and hidden details.  

| # | Location | Description |
|---|-----------|-------------|
| 1 | Saint George Church-Old Fortress | Byzantine-era fortification overlooking the sea |
| 2 | Statue of Schulenburg | Monument to the defender of Corfu during the 1716 siege |
| 3 | Palace of Saints George & Michael | Neoclassical palace housing the Museum of Asian Art |
| 4 | Liston | Venetian arcade inspired by Paris’ Rue de Rivoli |
| 5 | St. Spyridon Church | Famous for its bell tower and relics |
| 6 | Venetian Well | Historic 17th-century stone well |
| 7 | Metropolitan Church | Renaissance-style cathedral |
| 8 | Gate of the New Fortress | Entrance featuring the Lion of Saint Mark |
| 9 | Synagogue | Symbol of Corfu’s Jewish community |
| 10 | Annunziata Monastery | Memorial of the Battle of Lepanto |
| 11 | Duomo | Catholic cathedral dedicated to St. James & Christopher |
| 12 | Town Hall (Loggia dei Nobilei) | Renaissance civic building and the final destination |

*Note:*  
- **Junior Hunt (Easy)** includes 6 of these locations.  
- **Master Hunt (Hard)** includes all 12, unlocking the complete story and final puzzle.

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

## License  

This project is licensed under the **MIT License**.  

---

## Credits  

- **Concept & Educational Framework:** Based on *Discover Corfu Old Town (DisCoT)*  
- **Design & Development:** MagicArchie  
- **Visual & Audio Assets:** Created and edited using **Adobe Photoshop**, **DaVinci Resolve**, and **Reaper**  
- **Narration:** Dynamic hint system providing spoken guidance in **Greek** and **English**  
- **Sound Sources:** [Pixabay](https://pixabay.com/) *(royalty-free sound effects and music)*  
- **Libraries:** [p5.js](https://p5js.org/), [AR.js](https://aframe.io/blog/arjs/)  
- **Inspiration:** Greek cultural heritage and interactive learning  

---

## Running the Game Locally  

Clone the repository:  
```bash
git clone https://github.com/MagicArchie/MusArCode.git
cd MusArCode
