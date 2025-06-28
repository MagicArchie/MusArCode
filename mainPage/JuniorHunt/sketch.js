let bgImage;
let difficulty;
let finalLocationLabel;
let mapImg;
let menuButton;
let menuBar;
let msg;

let revealImages = [];
let labelImages = [];
let clickCount = 0;
const maxReveals = 12;

let LocationTriggerTester = false; // Toggle for Location Testing
let clickReady = true; // ensures one click at a time
let autoRevealCount = 0; // From localStorage

let scanButton, languageButton, exitButton;

let LungSelected = 2; //English Selected
let Subtitles_OnOf = true;
let LungMenuActive = false;

let rotateWarningImg;
let labelsRevealed = false;

let refreshSystem = false;

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
let selectedLanguageOnOf = localStorage.getItem('selectedLanguageOnOf') || 'on'; //Default to ON


function preload() {
  bgImage = loadImage('../assets/mainPage/MainPage_BG.jpg');
  finalLocationLabel = loadImage('../assets/mainPage/Lower_Sighn.png');
  mapImg = loadImage('../assets/mainPage/Map.png');
  rotateWarningImg = loadImage('../assets/RotateIMG.png');
  
  for (let i = 1; i <= maxReveals; i++) {
	revealImages.push(loadImage(`../assets/mainPage/locatioTrigger/T${i}.png`));
	labelImages.push(loadImage(`../assets/mainPage/finalWord/L${i}.png`));
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Get difficulty from localStorage
  difficulty = localStorage.getItem('selectedDifficulty');

  if (difficulty === 'Junior Hunt') {
    console.log('6 spots selected for Junior Hunt!');
    // TODO: Setup 6 spot logic here
  } else if (difficulty === 'Master Hunt') {
    console.log('12 spots selected for Master Hunt!');
    // TODO: Setup 12 spot logic here
  } else {
    console.log('No difficulty set. Defaulting...');
  }

  // === Menu Button (top center) ===
  menuW = width * 0.25;
  menuH = width * 0.15;
  menuButton = createImg('../assets/mainPage/Menu_BT.png', 'Menu Button');
  menuButton.size(menuW, menuH);
  menuButton.position(width / 2 - menuW / 2, height * 0.005);
  menuButton.mousePressed(menuButtonPressed);
  menuButton.style('position', 'absolute');
  menuButton.style('z-index', '10');
  
  // === Menu Bar (top center) ===
  menuBarH = width * 0.21;
  menuBar = createImg('../assets/mainPage/MenuBar.png', 'Menu Bar');
  menuBar.size(width, menuBarH);
  menuBar.position(0, height * 0.005);
  menuBar.hide();
  
  // === Menu PopUp (top center) ===
  menuPopH = width * 0.21;
  menuPop = createImg('../assets/mainPage/MenuBar.png', 'Menu Bar');
  menuPop.size(width, menuBarH);
  menuPop.position(0, height * 0.005);
  menuPop.hide();
  
  let btnW = width * 0.23; // Width for each button
  let btnH = (128 / 225) * btnW; // Keep aspect ratio

  // === Language Button (center top) ===
  languageButton = createImg('../assets/mainPage/buttons/Language_BT.png', 'Language Button');
  languageButton.size(btnW, btnH);
  languageButton.position(width / 2 - btnW / 2, height * 0.015);
  languageButton.mousePressed(LunguageBT_Pressed);
  languageButton.hide();

  // === Scan Button (left of center) ===
  scanButton = createImg('../assets/mainPage/buttons/Scan_BT.png', 'Scan Button');
  scanButton.size(btnW, btnH);
  scanButton.position(width / 2 - btnW * 1.5 - 10, height * 0.015); // small gap between buttons
  scanButton.mousePressed(ScanBT_Pressed);
  scanButton.hide();

  // === Exit Button (right of center) ===
  exitButton = createImg('../assets/mainPage/buttons/Exit_BT.png', 'Exit Button');
  exitButton.size(btnW, btnH);
  exitButton.position(width / 2 + btnW * 0.5 + 10, height * 0.015);
  exitButton.mousePressed(ExitBT_Pressed);
  exitButton.hide();
  
  let LungBody_W = width * 0.7;
  let LungBody_H = width * 0.9;
  
  let LungBT_W = width * 0.6;
  let LungBT_H = width * 0.15;
  
  // === Lunguage Menu (top center) ===
  LungMenu_Body = createImg('../assets/mainPage/PopUpMenu.png', 'Lunguage Menu Body');
  LungMenu_Body.size(LungBody_W, LungBody_H);
  LungMenu_Body.position(width / 2 - LungBody_W / 2, height * 0.12);
  LungMenu_Body.hide();
  LungMenu_Body.style('z-index', '7');
  
  // === Lunguage Menu BT1 (top center) ===
  if (selectedLanguage === 'gr') {
	LungSelected = 1;
	LungMenu_BT1 = createImg('../assets/mainPage/buttons/GR_A.png', 'Greek Button');
  } else {
	LungMenu_BT1 = createImg('../assets/mainPage/buttons/GR_D.png', 'Greek Button');
  }
  LungMenu_BT1.size(LungBT_W, LungBT_H);
  LungMenu_BT1.position(width / 2 - LungBT_W / 2, height * 0.22);
  LungMenu_BT1.mousePressed(GreekSelected);
  LungMenu_BT1.hide();
  LungMenu_BT1.style('z-index', '8');
  
  // === Lunguage Menu BT2 (top center) ===
  if (selectedLanguage === 'en') {
	LungSelected = 2;
	LungMenu_BT2 = createImg('../assets/mainPage/buttons/EN_A.png', 'English Button');
  } else {
	LungMenu_BT2 = createImg('../assets/mainPage/buttons/EN_D.png', 'English Button');  
  }
  LungMenu_BT2.size(LungBT_W, LungBT_H);
  LungMenu_BT2.position(width / 2 - LungBT_W / 2, height * 0.30);
  LungMenu_BT2.mousePressed(EnglishSelected);
  LungMenu_BT2.hide();
  LungMenu_BT2.style('z-index', '8');
  
  // === Lunguage Menu BT3 (top center) ===
  if (selectedLanguageOnOf === 'on') {
	Subtitles_OnOf = true;
	LungMenu_BT3 = createImg('../assets/mainPage/buttons/OnBT.png', 'ON Button');
  } else {
	Subtitles_OnOf = false;
	LungMenu_BT3 = createImg('../assets/mainPage/buttons/OffBT.png', 'OFF Button');
  }
  LungMenu_BT3.size(LungBT_W, LungBT_H);
  LungMenu_BT3.position(width / 2 - LungBT_W / 2, height * 0.465);
  LungMenu_BT3.mousePressed(LunguageOnOf);
  LungMenu_BT3.hide();
  LungMenu_BT3.style('z-index', '8');

  
  let mapW = width;
  let mapH = (mapImg.height / mapImg.width) * mapW;
  let mapY = height / 2 - mapH / 2;

  let labelW = width;
  let labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  let labelY = height * 0.95 - labelH / 2;

  for (let i = 0; i < maxReveals; i++) {
    // T Images
    let tImg = createImg(`../assets/mainPage/locatioTrigger/T${i + 1}.png`);
    tImg.hide();
    tImg.size(mapW, mapH);
    tImg.position(0, mapY);
    tImg.style('position', 'absolute');
    tImg.style('z-index', '5');
    revealImages[i] = tImg;

    // L Images
    let lImg = createImg(`../assets/mainPage/finalWord/L${i + 1}.png`);
    lImg.hide();
    lImg.size(labelW, labelH);
    lImg.position(0, labelY);
    lImg.style('position', 'absolute');
    lImg.style('z-index', '6'); // above the T image
    labelImages[i] = lImg;
  }
  
  // === Auto-reveal from localStorage
  autoRevealCount = parseInt(localStorage.getItem("LocationsComplete")) || 0;

  for (let i = 0; i < autoRevealCount && i < maxReveals; i++) {
    revealImages[i].show();
    labelImages[i].show();
    console.log(`Auto-Revealed from saved progress: T${i + 1} and L${i + 1}`);
  }
  
  windowResized();
}

function draw() {
  // === Enforce portrait orientation ===
  if (windowWidth > windowHeight) {
	  labelsRevealed = false; // Reset when user switches to landscape
	  refreshSystem = true;

	  background(0);
	  imageMode(CENTER);
	  let warningSize = min(width, height) * 0.4;
	  image(rotateWarningImg, width / 2, height / 2.5, warningSize, warningSize);

	  fill(255);
	  textAlign(CENTER, TOP);
	  textSize(width * 0.04);
	  if (selectedLanguage === 'gr') {
		// Show Greek text
		msg = "Παρακαλώ κρατήστε τη συσκευή κάθετα";
	  } else {
		// Show English text
		msg = "Please hold your device vertically";
      }
	  let textBoxWidth = width * 0.8;
	  text(msg, width / 2 - textBoxWidth / 2, height / 2 + warningSize / 2, textBoxWidth);

	  // Hide all interactive elements
	  hideMenuBar();      // Hides menuBar and menuButton
	  hideLungMenu();     // Hides language menu
	  menuButton.hide();  // Redundant if hideMenuBar does this, but safe
	  scanButton.hide();
	  languageButton.hide();
	  exitButton.hide();

	  for (let i = 0; i < revealImages.length; i++) {
		revealImages[i].hide();
		labelImages[i].hide();
	  }

	  return;
  }
  
  // Re-show revealed images when back in portrait
  if (windowWidth < windowHeight) {
	  
	  //Fix for MenuButton Problem -[]-
	  if (refreshSystem == true) {
		  location.reload();
		  refreshSystem = false;
	  }
	  
	  // We're now in portrait mode, after being warned
	  if (!labelsRevealed) {
		autoRevealCount = parseInt(localStorage.getItem("LocationsComplete")) || 0;

		for (let i = 0; i < autoRevealCount && i < maxReveals; i++) {
		  revealImages[i].show();
		  labelImages[i].show();
		  console.log(`Auto-Revealed from saved progress: T${i + 1} and L${i + 1}`);
		}

		labelsRevealed = true;
		menuButton.show();
	  }
  }

  imageMode(CORNER); //Important reset
  image(bgImage, 0, 0, width, height);

  // === Centered MAP ===
  mapW = width;
  mapH = (mapImg.height / mapImg.width) * mapW;
  mapY = height / 2 - mapH / 2;
  image(mapImg, 0, mapY, mapW, mapH);

  // === Final Location Label (at 95% height, centered) ===
  labelW = width;
  labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  labelY = height * 0.95 - labelH / 2;
  image(finalLocationLabel, 0, labelY, labelW, labelH);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // === Recalculate shared dimensions ===
  let btnW = width * 0.23;
  let btnH = (128 / 225) * btnW;

  let menuW = width * 0.25;
  let menuH = width * 0.15;
  let menuBarH = width * 0.21;

  let mapW = width;
  let mapH = (mapImg.height / mapImg.width) * mapW;
  let mapY = height / 2 - mapH / 2;

  let labelW = width;
  let labelH = (finalLocationLabel.height / finalLocationLabel.width) * labelW;
  let labelY = height * 0.95 - labelH / 2;

  // === Resize & reposition buttons ===
  menuButton.size(menuW, menuH);
  menuButton.position(width / 2 - menuW / 2, height * 0.005);

  menuBar.size(width, menuBarH);
  menuBar.position(0, height * 0.005);

  menuPop.size(width, menuBarH);
  menuPop.position(0, height * 0.005);

  languageButton.size(btnW, btnH);
  languageButton.position(width / 2 - btnW / 2, height * 0.015);

  scanButton.size(btnW, btnH);
  scanButton.position(width / 2 - btnW * 1.5 - 10, height * 0.015);

  exitButton.size(btnW, btnH);
  exitButton.position(width / 2 + btnW * 0.5 + 10, height * 0.015);

  // === Language Menu Sizing ===
  let LungBody_W = width * 0.7;
  let LungBody_H = width * 0.9;

  let LungBT_W = width * 0.6;
  let LungBT_H = width * 0.15;

  LungMenu_Body.size(LungBody_W, LungBody_H);
  LungMenu_Body.position(width / 2 - LungBody_W / 2, height * 0.12);

  LungMenu_BT1.size(LungBT_W, LungBT_H);
  LungMenu_BT1.position(width / 2 - LungBT_W / 2, height * 0.22);

  LungMenu_BT2.size(LungBT_W, LungBT_H);
  LungMenu_BT2.position(width / 2 - LungBT_W / 2, height * 0.30);

  LungMenu_BT3.size(LungBT_W, LungBT_H);
  LungMenu_BT3.position(width / 2 - LungBT_W / 2, height * 0.465);

  // === Reposition all revealed images ===
  for (let i = 0; i < revealImages.length; i++) {
    revealImages[i].size(mapW, mapH);
    revealImages[i].position(0, mapY);

    labelImages[i].size(labelW, labelH);
    labelImages[i].position(0, labelY);
  }
}

function mousePressed() {
  // === Handle menu closing ===
  if (menuBar.elt.style.display !== 'none') {
    let isOverScan = isMouseOver(scanButton);
    let isOverLang = isMouseOver(languageButton);
    let isOverExit = isMouseOver(exitButton);

    if (!isOverScan && !isOverLang && !isOverExit) {
      hideMenuBar();
      return;
    }
  }

  // === Handle language menu closing ===
  if (LungMenu_Body.elt.style.display !== 'none') {
    let isOverGreek = isMouseOver(LungMenu_BT1);
    let isOverEnglish = isMouseOver(LungMenu_BT2);
    let isOverOnOff = isMouseOver(LungMenu_BT3);
	let isOverLang = isMouseOver(languageButton);

    if (!isOverGreek && !isOverEnglish && !isOverOnOff && !isOverLang && LungMenuActive == true) {
      hideLungMenu();
	  LungMenuActive = false;
      return;
    }
  }

  // === Handle location trigger ===
  if (!LocationTriggerTester || !clickReady) return;

  if (clickCount < maxReveals) {
    clickReady = false;

    revealImages[clickCount].show();
    labelImages[clickCount].show();

    console.log(`Revealed T${clickCount + 1} and L${clickCount + 1}`);
    clickCount++;

    setTimeout(() => {
      clickReady = true;
    }, 200);
  } else {
    console.log("All images revealed!");
  }
}

function isMouseOver(button) {
  let x = button.position().x;
  let y = button.position().y;
  let w = button.width;
  let h = button.height;
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}


function menuButtonPressed() {
  console.log('Menu button pressed!');
  menuButton.hide();
  menuBar.show();
  
  scanButton.show();
  languageButton.show();
  exitButton.show();
}

function hideMenuBar() {
  menuBar.hide();
  scanButton.hide();
  languageButton.hide();
  exitButton.hide();
  menuButton.show();
}

function hideLungMenu() {
	LungMenu_Body.hide();
	LungMenu_BT1.hide();
	LungMenu_BT2.hide();
	LungMenu_BT3.hide();
}

function ScanBT_Pressed() {
	console.log('Scan button pressed');
	
	scanButton.attribute('src', '../assets/mainPage/buttons/Scan_Pressed.png');
	setTimeout(() => {
		scanButton.attribute('src', '../assets/mainPage/buttons/Scan_BT.png');
	}, 400);
	
	setTimeout(function () {
			window.location.href = "../AR_Code/index.html"; //Sent to Scan Page 
	}, 700);
}

function LunguageBT_Pressed() {
	console.log('Language button pressed');
	
	languageButton.attribute('src', '../assets/mainPage/buttons/Language_Pressed.png');
	setTimeout(() => {
		languageButton.attribute('src', '../assets/mainPage/buttons/Language_BT.png');
	}, 400);
	
	if (LungMenuActive == false) {
		LungMenu_Body.show();
		LungMenu_BT1.show();
		LungMenu_BT2.show();
		LungMenu_BT3.show();
		setTimeout(() => {
			LungMenuActive = true;
		}, 400);
	} else {
		hideLungMenu();
		setTimeout(() => {
			LungMenuActive = false;
		}, 400);
	}
}

function GreekSelected() {
	console.log('Greek Subtitles Selected');
	
	if (LungSelected == 2) {
		LungMenu_BT1.attribute('src', '../assets/mainPage/buttons/GR_A.png');
		LungMenu_BT2.attribute('src', '../assets/mainPage/buttons/EN_D.png');
		LungSelected = 1;
	} 
	
	// Store the selected language
	localStorage.setItem('selectedLanguage', 'gr');
	selectedLanguage = 'gr';
}

function EnglishSelected() {
	console.log('English Subtitles Selected');
	
	if (LungSelected == 1) {
		LungMenu_BT1.attribute('src', '../assets/mainPage/buttons/GR_D.png');
		LungMenu_BT2.attribute('src', '../assets/mainPage/buttons/EN_A.png');
		LungSelected = 2;
	}
	
	// Store the selected language
	localStorage.setItem('selectedLanguage', 'en');
	selectedLanguage = 'en';
}

function LunguageOnOf() {
	console.log('Subtitles:');
	
	if (Subtitles_OnOf == true) {
		console.log('Off');
		LungMenu_BT3.attribute('src', '../assets/mainPage/buttons/OffBT.png');
		Subtitles_OnOf = false;
		
		localStorage.setItem('selectedLanguageOnOf', 'off');
		selectedLanguageOnOf = 'off';
	} else {
		console.log('On');
		LungMenu_BT3.attribute('src', '../assets/mainPage/buttons/OnBT.png');
		Subtitles_OnOf = true;
		
		localStorage.setItem('selectedLanguageOnOf', 'on');
		selectedLanguageOnOf = 'on';
	}
}

function ExitBT_Pressed() {
	console.log('Exit button pressed — returning to Welcome Page');
	
	exitButton.attribute('src', '../assets/mainPage/buttons/Exit_Pressed.png');
	setTimeout(() => {
		exitButton.attribute('src', '../assets/mainPage/buttons/Exit_BT.png');
	}, 400);
	
	setTimeout(() => {
		window.location.href = '../index.html';
	}, 600);
}