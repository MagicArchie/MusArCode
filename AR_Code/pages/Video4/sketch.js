let bgImage;
let video;
let titleText = "";
let msg;

let landscapeW, landscapeH;
let ContinueBT, ReturnBT;

let rotateWarningImg;

let mainFont;
let fontEn;
let fontGr;

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
let selectedLanguageOnOf = localStorage.getItem('selectedLanguageOnOf') || 'on'; //Default to ON


function preload() {
  fontEn = loadFont('../../../assets/fonts/EnglishFont.ttf');
  fontGr = loadFont('../../../assets/fonts/GreekFont.otf');
  
  BT_SFX = loadSound('../../../assets/sounds/BT_SFX3.mp3');
  
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');
  rotateWarningImg = loadImage('../../../assets/RotateIMG.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Lock logic to landscape orientation
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  
  // === Language & font selection ===
  if (selectedLanguage === 'gr') {
    titleText = "4. Πλατεία Λιστόν";
    video = createVideo(['../../../assets/videos/Video4_Gr.mp4']);
    mainFont = fontGr;
  } else {
    titleText = "4. Liston Square";
    video = createVideo(['../../../assets/videos/Video4_En.mp4']);
    mainFont = fontEn;
  }

  setupUI();
}

function draw() {
	textFont(mainFont);
    textStyle(NORMAL);
	
	// Always update to current orientation
    landscapeW = max(windowWidth, windowHeight);
    landscapeH = min(windowWidth, windowHeight);
  
   if (windowWidth < windowHeight) {
    // Portrait mode: show warning
    background(0);

    let warningSize = min(width, height) * 0.4;
    imageMode(CENTER);
    image(rotateWarningImg, width / 2, height / 2.5, warningSize, warningSize);

    fill(255);
    textAlign(CENTER, TOP);
    textSize(landscapeW * 0.04);
    if (selectedLanguage === 'gr') {
		// Show Greek text
		msg = "Παρακαλώ κρατήστε τη συσκευή οριζόντια";
	} else {
		// Show English text
		msg = "Please hold your device horizontally";
    }
    let textBoxWidth = width * 0.8; // 80% of screen width
    text(msg, width / 2 - textBoxWidth / 2, height / 2.1 + warningSize / 2 - height * 0.03, textBoxWidth);

    // === Hide interactive elements ===
    video.hide();
    ContinueBT.hide();
    ReturnBT.hide();

    return; // Skip rest of draw
  }
  
  //Show elements again if landscape
  video.show();
  ContinueBT.show();
  ReturnBT.show();
  
  imageMode(CORNER); //Important reset
  image(bgImage, 0, 0, landscapeW, landscapeH);

  // === Title at top center ===
  fill(0);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  textSize(landscapeW * 0.05);
  if (selectedLanguage === 'gr') {
	  text(titleText, landscapeW / 2, landscapeH * 0.045);
  } else {
	  text(titleText, landscapeW / 2, landscapeH * 0.035);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  styleUI();
}

function setupUI() {
  // === Video Setup ===
  video.attribute('controls', true);
  video.volume(1.0);
  video.show();

  // === Continue Button
  ContinueBT = createImg('../../../assets/videoPage/VideoButton_Continue.png', 'Continue Button');
  ContinueBT.mousePressed(ContinuePressed);

  // === Return Button
  ReturnBT = createImg('../../../assets/videoPage/VideoButton_Return.png', 'Return Button');
  ReturnBT.mousePressed(RetuenPressed);

  styleUI();
}

function styleUI() {
  // === Resize and position video ===
  let videoW = landscapeW * 0.69;
  let videoH = videoW * 9 / 16;
  video.size(videoW, videoH);
  video.position((windowWidth - videoW) / 2, (windowHeight - videoH) * 0.8);
  
  // === Add stroke (border) to video ===
  video.style('border', '5px solid black'); // You can change the color and thickness here
  video.style('border-radius', '10px');     // Optional: rounded corners

  // === Buttons Size ===
  let VideoBT_WH = landscapeW * 0.095;
  ContinueBT.size(VideoBT_WH, VideoBT_WH);
  ContinueBT.position(windowWidth - VideoBT_WH - windowWidth * 0.02, windowHeight / 2 - VideoBT_WH / 2);

  ReturnBT.size(VideoBT_WH, VideoBT_WH);
  ReturnBT.position(windowWidth * 0.02, windowHeight / 2 - VideoBT_WH / 2);
}

function ContinuePressed() {
  BT_SFX.setVolume(0.8);
  BT_SFX.play();  
  
  ContinueBT.attribute('src', '../../../assets/videoPage/VideoButton_Continue Pressed.png');
  setTimeout(() => {
    ContinueBT.attribute('src', '../../../assets/videoPage/VideoButton_Continue.png');
  }, 400);

  setTimeout(() => {
    localStorage.setItem("lastPage", "Video4");
    window.location.href = "../QuizPage/index.html";
  }, 600);
}

function RetuenPressed() {
  BT_SFX.setVolume(0.8);
  BT_SFX.play();  
  
  ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return Pressed.png');
  setTimeout(() => {
    ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return.png');
  }, 400);

  setTimeout(() => {
    window.location.href = "../../../mainPage/game.html";
  }, 600);
}
