let bgImage;
let btnEasy, btnHard, btnStart;
let selectedDifficulty = null;
let pirateFont;
let startEnabled = false; // prevent clicking Start until ready

let StartBarrier = true;
let fullscreenActivated = false;

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
let selectedLanguageOnOf = localStorage.getItem('selectedLanguageOnOf') || 'on'; //Default to ON

function preload() {
  bgImage = loadImage('assets/Background_IMG.jpg');
  
  mainFont = loadFont('assets/fonts/EnglishFont.ttf');
  
  DifficultyBT_SFX = loadSound('assets/sounds/BT_SFX1.mp3');
  StartBT1_SFX = loadSound('assets/sounds/BT_SFX2.mp3');
  StartBT2_SFX = loadSound('assets/sounds/BT_SFX3.mp3');
}

let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);  //Store canvas
  canvas.mousePressed(initInteraction);              //Attach fullscreen logic to canvas
  textAlign(CENTER, CENTER);
  textFont('Georgia');

  // Responsive sizes
  const diffW = width * 0.39;
  const diffH = height * 0.11;
  const startW = width * 0.59;
  const startH = height * 0.11;
  const gap = width * 0.05;

  // Junior Hunt Button
  btnEasy = createImg('assets/buttons/JuniorHuntBT_Normal.png', 'Junior Hunt Button');
  btnEasy.size(diffW, diffH);
  btnEasy.position(width / 2 - diffW - gap / 2, height / 2.15);
  btnEasy.mousePressed(() => setDifficulty('Junior Hunt'));

  // Master Hunt Button
  btnHard = createImg('assets/buttons/MasterHuntBT_Normal.png', 'Master Hunt Button');
  btnHard.size(diffW, diffH);
  btnHard.position(width / 2 + gap / 2, height / 2.15);
  btnHard.mousePressed(() => setDifficulty('Master Hunt'));

  // Start Button
  btnStart = createImg('assets/buttons/StartBT_Normal.png', 'Start Button');
  btnStart.size(startW, startH);
  btnStart.position(width / 2 - startW / 2, height / 1.95 + diffH);
  btnStart.mousePressed(startGame);
  
  layoutButtons();
}

function draw() {
  image(bgImage, 0, 0, width, height);

  textFont(mainFont);
  textStyle(NORMAL);

  // === Title ===
  stroke('#3e1907');
  strokeWeight(2); 
  fill('#3e1907');

  // Welcome
  textSize(width * 0.21);
  text('Welcome', width / 2, height / 5);

  // Traveler
  textSize(width * 0.17);
  text('Traveler', width / 2, height / 5 + width * 0.18);

  // === Difficulty Label ===
  strokeWeight(1.5); // lighter stroke
  textSize(width * 0.09);
  text('Choose Difficulty:', width / 2, height / 2.15 - height * 0.06);

}

function initInteraction() {
  if (!fullscreenActivated) {
    fullscreen(true);
    fullscreenActivated = true;

    // Wait for the fullscreen transition to finish before resizing
    setTimeout(() => {
      resizeCanvas(windowWidth, windowHeight);
      layoutButtons(); // use this instead of duplicate logic
    }, 300); // 300ms is usually enough
  }

  if (StartBarrier) {
    StartBarrier = false;
  }
}

function layoutButtons() {
  const diffW = width * 0.39;
  const diffH = height * 0.11;
  const startW = width * 0.59;
  const startH = height * 0.11;
  const gap = width * 0.05;

  btnEasy.size(diffW, diffH);
  btnEasy.position(width / 2 - diffW - gap / 2, height / 2.15);

  btnHard.size(diffW, diffH);
  btnHard.position(width / 2 + gap / 2, height / 2.15);

  btnStart.size(startW, startH);
  btnStart.position(width / 2 - startW / 2, height / 1.95 + diffH);
}

function setDifficulty(level) {
  if (StartBarrier == false) {
	  DifficultyBT_SFX.setVolume(0.8);
	  DifficultyBT_SFX.play();
	  
	  selectedDifficulty = level;
	  localStorage.setItem('selectedDifficulty', level); // Store in localStorage
	  console.log(`Difficulty set to ${level}`);

	  // Enable Start Button
	  startEnabled = true;

	  if (level === 'Junior Hunt') {
		btnHard.attribute('src', 'assets/buttons/MasterHuntBT_Normal.png');
		btnEasy.attribute('src', 'assets/buttons/JuniorHuntBT_Pressed.png');
		setTimeout(() => {
		  btnEasy.attribute('src', 'assets/buttons/JuniorHuntBT_Selected.png');
		}, 400);
		console.log('Junior Hunt: 6 fun locations to explore!');
	  } else if (level === 'Master Hunt') {
		btnEasy.attribute('src', 'assets/buttons/JuniorHuntBT_Normal.png');
		btnHard.attribute('src', 'assets/buttons/MasterHuntBT_Pressed.png');
		setTimeout(() => {
		  btnHard.attribute('src', 'assets/buttons/MasterHuntBT_Selected.png');
		}, 400);
		console.log('Master Hunt: 12 adventurous stops ahead!');
	  }
  } else {
	   initInteraction()  
  }
}

function startGame() {
  if (StartBarrier == false) {
	  // Animation
	  btnStart.attribute('src', 'assets/buttons/StartBT_Pressed.png');
	  setTimeout(() => {
		btnStart.attribute('src', 'assets/buttons/StartBT_Normal.png');
	  }, 400);
			
	  if (!startEnabled) {
		StartBT2_SFX.setVolume(0.8);
		StartBT2_SFX.play();  
		  
		console.log("Please select a difficulty before starting!");
		return;
	  }
	  
	  StartBT1_SFX.setVolume(0.8);
	  StartBT1_SFX.play();

	  console.log('Starting game...');
	  setTimeout(() => {
		window.location.href = 'mainPage/game.html'; // Game Destination
	  }, 1500);
  } else {
	   initInteraction()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // Recalculate positions and sizes
  const diffW = width * 0.25;
  const diffH = height * 0.1;
  const startW = width * 0.35;
  const startH = height * 0.1;
  const gap = width * 0.05;

  btnEasy.size(diffW, diffH);
  btnEasy.position(width / 2 - diffW - gap / 2, height / 2 + 30);

  btnHard.size(diffW, diffH);
  btnHard.position(width / 2 + gap / 2, height / 2 + 30);

  btnStart.size(startW, startH);
  btnStart.position(width / 2 - startW / 2, height / 2 + diffH + 80);
  
  layoutButtons();
}