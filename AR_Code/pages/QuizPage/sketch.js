let bgImage;
let questionText = "";
let answers = [];

let landscapeW, landscapeH;
let answerButtons = [];
let buttonRects = [];

let correctAnswerIndex = -1;

let mainFont;
let fontEn;
let fontGr;

let correctSound, wrongSound;
let ReturnBT;

let clickedIndex = -1;
let highlightTimer = 0;

let selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
let selectedLanguageOnOf = localStorage.getItem('selectedLanguageOnOf') || 'on'; //Default to ON

const lettersToReveal = ['Ν', 'Η', 'Σ', 'Ο', 'Σ', 'Φ', 'Α', 'Ι', 'Α', 'Κ', 'Ω', 'Ν'];

let finalRevealText = "";

let letter = [];

const lastPage = localStorage.getItem("lastPage");

function preload() {
  fontEn = loadFont('../../../assets/fonts/EnglishFont.ttf');
  fontGr = loadFont('../../../assets/fonts/GreekFont.otf');
  
  RtBT_SFX = loadSound('../../../assets/sounds/BT_SFX3.mp3');
  Wrong_SFX = loadSound('../../../assets/sounds/Wrong_SFX.mp3');
  Correct_SFX = loadSound('../../../assets/sounds/Correct_SFX.mp3');
  
  bgImage = loadImage('../../../assets/mainPage/MainPage_BG.jpg');

  // correctSound = loadSound('../../../assets/sounds/correct.mp3');
  // wrongSound = loadSound('../../../assets/sounds/wrong.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);

  setupContentBasedOnPreviousPage();
  setupUI();

  let VideoBT_WH = width * 0.1;
  
  // === Language & font selection ===
  if (selectedLanguage === 'gr') {
    mainFont = fontGr;
  } else {
    mainFont = fontEn;
  }

  // === Return Button ===
  ReturnBT = createImg('../../../assets/videoPage/VideoButton_Return.png', 'Return Button');
  ReturnBT.size(VideoBT_WH, VideoBT_WH);
  ReturnBT.position(width * 0.02, height - VideoBT_WH - height * 0.05);
  ReturnBT.mousePressed(RetuenPressed);
}

function draw() {
  textFont(mainFont);
  textStyle(NORMAL);
  
  image(bgImage, 0, 0, landscapeW, landscapeH);

if (finalRevealText && typeof finalRevealText === 'object') {
  noStroke();
  textStyle(BOLD);
  textAlign(CENTER, CENTER);

  let centerX = width / 2;
  let centerY = height / 2;

  let baseSize = width * 0.06;
  let letterSize = baseSize * 1.8;

  let smallGap = baseSize * 0.08; // Reduced spacing

  // Line 1: First part
  textFont(mainFont);
  textSize(baseSize);
  fill(0);
  text(finalRevealText.part1, centerX, centerY - letterSize * 0.6 - smallGap);

  // Line 2: Greek letter (big)
  textFont(fontGr);
  textSize(letterSize);
  text(finalRevealText.letter, centerX, centerY);

  // Line 3: Second part
  textFont(mainFont);
  textSize(baseSize);
  text(finalRevealText.part2, centerX, centerY + letterSize * 0.6 + smallGap);

  return;
}



  // Draw question
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  let qSize = landscapeW * 0.045;
  textSize(qSize);
  textLeading(qSize * 0.85);
  textLeading(qSize * 0.95);
  textStyle(BOLD);
  let textBoxWidth = landscapeW * 0.8;
  if (selectedLanguage === 'gr') {
    text(questionText, (landscapeW - textBoxWidth) / 2, landscapeH * 0.09, textBoxWidth);
  } else {
    text(questionText, (landscapeW - textBoxWidth) / 2, landscapeH * 0.065, textBoxWidth);
  }
  
  // Draw answer boxes
  for (let i = 0; i < buttonRects.length; i++) {
    let b = buttonRects[i];
    stroke('#5c4033');
    strokeWeight(4);

    if (i === clickedIndex && millis() - highlightTimer < 300) {
      fill('#d6c19a');
    } else {
      fill('#ebd9b7');
    }

    rect(b.x, b.y, b.w, b.h, 15);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  landscapeW = max(windowWidth, windowHeight);
  landscapeH = min(windowWidth, windowHeight);
  styleUI();
}

function setupContentBasedOnPreviousPage() {
  const lastPage = localStorage.getItem("lastPage");

  if (lastPage === "Video1") {
    questionText = selectedLanguage === "gr"
      ? "Ποιο είναι το ιδιαίτερο χαρακτηριστικό της αρχιτεκτονικής του ναού;"
      : "What is the distinctive feature of the church's architecture?";
    answers = selectedLanguage === "gr"
      ? ["Είναι χτισμένος σε βυζαντινό ρυθμό.", "Ανήκει στον Γεωργιανό ρυθμό.", "Έχει γοτθικά στοιχεία."]
      : ["It is built in the Byzantine style.", "It belongs to the Georgian style.", "It has Gothic elements."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video2") {
    questionText = selectedLanguage === "gr"
      ? "Ποια είναι η ιστορική σημασία του αγάλματος του Σούλενμπουργκ;"
      : "What is the historical significance of the Schulembourg statue?";
    answers = selectedLanguage === "gr"
      ? ["Αναγνωρίζεται η συμβολή του στην άμυνα της Κέρκυρας κατά την πολιορκία του 1716.",
         "Αποτελεί σύμβολο της ενετικής κυριαρχίας στην Κέρκυρα τον 18ο αιώνα.",
         "Αντιπροσωπεύει τη νίκη των Ενετών επί των Γάλλων στην Κέρκυρα."]
      : ["Schulenburg's contribution to the defence of Corfu during the Turkish siege of 1716 is recognised.",
         "It is a symbol of Venetian rule in Corfu during the 18th century.",
         "It represents the Venetians' victory over the French in Corfu."];
    correctAnswerIndex = 0;
  }
  else if (lastPage === "Video3") {
    questionText = selectedLanguage === "gr"
      ? "Από τι υλικό έχει επενδυθεί το κτίριο του Μουσείου Ασιατικής Τέχνης;"
      : "What material was used to clad the building that houses the Museum of Asian Art?";
    answers = selectedLanguage === "gr"
      ? ["Μάρμαρο Καράρα", "Ασβεστόλιθος Μάλτας", "Γρανίτης"]
      : ["Carrara marble", "Maltese limestone", "Granite"];
    correctAnswerIndex = 0;
  }
  else if (lastPage === "Video4") {
    questionText = selectedLanguage === "gr"
      ? "Ποιο είναι το αρχιτεκτονικό ιδιαίτερο χαρακτηριστικό του Λιστόν;"
      : "What is the architectural peculiarity of Liston?";
    answers = selectedLanguage === "gr"
      ? ["Εμπνέεται από τη στοά Rue de Rivoli στο Παρίσι.", "Έχει γοτθικά στοιχεία.", "Είναι χτισμένο σε βυζαντινό ρυθμό."]
      : ["It is inspired by the arcade on Rue de Rivoli in Paris.", "It has Gothic elements.", "It is built in the Byzantine style."];
    correctAnswerIndex = 0;
  }
  else if (lastPage === "Video5") {
    questionText = selectedLanguage === "gr"
      ? "Ποιο είναι το ιδιαίτερο χαρακτηριστικό του καμπαναριού της εκκλησίας;"
      : "What is the special feature of the church bell tower?";
    answers = selectedLanguage === "gr"
      ? ["Είναι κατασκευασμένο από χρυσό.", "Είναι ίδιο με το καμπαναριό του Αγίου Γεωργίου των Ελλήνων στη Βενετία.", "Έχει γοτθικά στοιχεία."]
      : ["It is made of gold.", "It is identical to the bell tower of St. George of the Greeks in Venice.", "It has Gothic elements."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video6") {
    questionText = selectedLanguage === "gr"
      ? "Ποια είναι η ιστορική σημασία του ενετικού πηγαδιού;"
      : "What is the historical significance of the Venetian well?";
    answers = selectedLanguage === "gr"
      ? ["Είναι σημείο συνάντησης για κατοίκους και επισκέπτες της Κέρκυρας.", "Χτίστηκε για να αντιμετωπιστούν οι ελλείψεις νερού στην πόλη.", "Είναι το μόνο πηγάδι της ενετικής περιόδου."]
      : ["It is a meeting place for residents and visitors to Corfu.", "It was built to address water shortages in the city of Corfu.", "It is the only well built during the Venetian occupation."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video7") {
    questionText = selectedLanguage === "gr"
      ? "Ποιος είναι ο αρχιτεκτονικός ρυθμός του μητροπολιτικού ναού της Κέρκυρας;"
      : "What is the architectural style of the metropolitan church of Corfu?";
    answers = selectedLanguage === "gr"
      ? ["Μονόκλιτη ξύλινη βασιλική", "Τρίκλιτη βασιλική", "Γοτθική εκκλησία"]
      : ["Single-aisled wooden-roofed basilica", "Three-aisled basilica", "Gothic church"];
    correctAnswerIndex = 0;
  }
  else if (lastPage === "Video8") {
    questionText = selectedLanguage === "gr"
      ? "Ποιο είναι το έμβλημα πάνω από την Πύλη του Νέου Φρουρίου στην Κέρκυρα;"
      : "What is the emblem above the Gate of the New Fortress in Corfu?";
    answers = selectedLanguage === "gr"
      ? ["Ο φτερωτός λέων του Αγίου Μάρκου", "Ο δικέφαλος αετός της Βυζαντινής Αυτοκρατορίας", "Το σύμβολο της Βρετανικής Αυτοκρατορίας"]
      : ["The winged lion of Saint Mark", "The double-headed eagle of the Byzantine Empire", "The symbol of the British Empire"];
    correctAnswerIndex = 0;
  }
  else if (lastPage === "Video9") {
    questionText = selectedLanguage === "gr"
      ? "Ποια είναι η ιστορική σημασία της Συναγωγής στην Κέρκυρα;"
      : "What is the historical significance of the Synagogue in Corfu?";
    answers = selectedLanguage === "gr"
      ? ["Είναι τόπος συνάντησης για κατοίκους και επισκέπτες.", "Είναι σημαντικό μνημείο της θρησκευτικής και πολιτιστικής ζωής των Εβραίων της Κέρκυρας.", "Είναι το μόνο κτήριο της ενετικής περιόδου."]
      : ["It is a meeting place for residents and visitors to Corfu.", "It is an important monument to the religious and cultural life of the Jews of Corfu.", "It is the only building constructed during the Venetian occupation."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video10") {
    questionText = selectedLanguage === "gr"
      ? "Ποια είναι η ιστορική σημασία της Μονής Ευαγγελίστριας;"
      : "What is the historical significance of the Monastery of Evangelistria?";
    answers = selectedLanguage === "gr"
      ? ["Είναι το μόνο κτίσμα της ενετικής περιόδου.", "Είναι ο τόπος ταφής των Κερκυραίων αγωνιστών της Ναυμαχίας της Ναυπάκτου το 1571.", "Είναι το πρώτο μοναστήρι στην Κέρκυρα."]
      : ["It is the only building constructed during the Venetian occupation.", "It is the burial place of the Corfiot fighters who fell during the Battle of Lepanto in 1571.", "It is the first monastery built in Corfu."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video11") {
    questionText = selectedLanguage === "gr"
      ? "Ποιο είναι το ιδιαίτερο χαρακτηριστικό της αρχιτεκτονικής του Καθολικού Ναού;"
      : "What is the distinctive feature of the Duomo's architecture?";
    answers = selectedLanguage === "gr"
      ? ["Έχει γοτθικά στοιχεία στην πρόσοψη.", "Είναι μονόκλιτη βασιλική με ξύλινη στέγη και έξι παρεκκλήσια.", "Έχει πυραμιδοειδή στέγη στο καμπαναριό."]
      : ["It has Gothic elements on the façade.", "It is a single-nave basilica with a wooden roof and six chapels.", "It has a pyramidal roof on the bell tower."];
    correctAnswerIndex = 1;
  }
  else if (lastPage === "Video12") {
    questionText = selectedLanguage === "gr"
      ? "Ποια είναι η ιστορική σημασία του Δημαρχείου;"
      : "What is the historical significance of the Town Hall?";
    answers = selectedLanguage === "gr"
      ? ["Ήταν εμπορικό κέντρο που χτίστηκε το 1800.", "Χτίστηκε μεταξύ 1663 και 1693 και έγινε θέατρο το 1720. Το 1903 έγινε Δημαρχείο.", "Ήταν μοναστήρι που χτίστηκε το 1500."]
      : ["It was a commercial centre built in 1800.", "It was built between 1663 and 1693 and became a theatre in 1720. In 1903, it became the Town Hall.", "It was a monastery built in 1500."];
    correctAnswerIndex = 1;
  }
  else {
    questionText = selectedLanguage === 'gr' ? "Σφάλμα φόρτωσης ερώτησης." : "Error loading question.";
    answers = ["Option A", "Option B"];
    correctAnswerIndex = 0;
  }
}

function setupUI() {
  for (let i = 0; i < answers.length; i++) {
    let btn = createButton(answers[i]);
    btn.mousePressed(() => onAnswerSelected(i));
    btn.style('font-size', '2.2vw');
    btn.style('padding', '1vh 3vw');
    btn.style('border-radius', '12px');
    btn.style('background', 'transparent'); // Button over canvas-styled box
    btn.style('border', 'none');
    btn.style('z-index', '10');
    answerButtons.push(btn);
  }

  styleUI();
}

function styleUI() {
  const btnW = landscapeW * 0.7;
  const btnH = landscapeH * 0.15;

  buttonRects = [];

  for (let i = 0; i < answerButtons.length; i++) {
    const btn = answerButtons[i];
    const x = (windowWidth - btnW) / 2;
    const y = landscapeH * 0.30 + i * (btnH + landscapeH * 0.05);

    btn.size(btnW, btnH);
    btn.position(x, y);

    buttonRects.push({ x, y, w: btnW, h: btnH });
  }
}

function onAnswerSelected(index) {
  clickedIndex = index;
  highlightTimer = millis();

  if (index === correctAnswerIndex) {
	Correct_SFX.setVolume(1);
    Correct_SFX.play();    
	  
    console.log("Correct answer!");

    // Set LocationsComplete based on current video number
    const lastPage = localStorage.getItem("lastPage");
    const match = lastPage && lastPage.match(/Video(\d+)/); // Extract number from "VideoX"
    if (match && match[1]) {
      localStorage.setItem("LocationsComplete", match[1]); // Save number as string
    }

    setTimeout(() => {
      LetterReveal();
    }, 500);

    setTimeout(() => {
      window.location.href = "../../../mainPage/game.html";
    }, 4000);
  } else {
	Wrong_SFX.setVolume(1);
    Wrong_SFX.play();  
  
    console.log("Wrong answer.");
  }
}

function RetuenPressed() {
  RtBT_SFX.setVolume(0.8);
  RtBT_SFX.play();  
  
  ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return Pressed.png');
  setTimeout(() => {
    ReturnBT.attribute('src', '../../../assets/videoPage/VideoButton_Return.png');
  }, 400);

  setTimeout(() => {
    window.location.href = "../Video1/index.html";
  }, 600);
}

function LetterReveal() {
  answerButtons.forEach(btn => btn.hide());
  ReturnBT.hide();
  questionText = "";

  let message = "";
  const lettersToReveal = ['Ν', 'Η', 'Σ', 'Ο', 'Σ', 'Φ', 'Α', 'Ι', 'Α', 'Κ', 'Ω', 'Ν'];
  
	if (lastPage == "Video1") {
		letter = lettersToReveal[0];
	} else if (lastPage == "Video2") {
		letter = lettersToReveal[1];
	} else if (lastPage == "Video3") {
		letter = lettersToReveal[2];
	} else if (lastPage == "Video4") {
		letter = lettersToReveal[3];
	} else if (lastPage == "Video5") {
		letter = lettersToReveal[4];
	} else if (lastPage == "Video6") {
		letter = lettersToReveal[5];
	} else if (lastPage == "Video7") {
		letter = lettersToReveal[6];
	} else if (lastPage == "Video8") {
		letter = lettersToReveal[7];
	} else if (lastPage == "Video9") {
		letter = lettersToReveal[8];
	} else if (lastPage == "Video10") {
		letter = lettersToReveal[9];
	} else if (lastPage == "Video11") {
	    letter = lettersToReveal[10];
	} else if (lastPage == "Video12") {
		letter = lettersToReveal[11];
	}

	let messagePart1 = "";
	let messageLetter = "";
	let messagePart2 = "";

	if (selectedLanguage === "gr") {
	  messagePart1 = "Σωστά! Κερδίσατε το γράμμα ";
	  messageLetter = letter;
	  messagePart2 = ". Μπράβο σας!";
	} else {
	  messagePart1 = "Correct! You won the letter ";
	  messageLetter = letter;
	  messagePart2 = ". Well done!";
	}

	finalRevealText = {
	  part1: messagePart1,
	  letter: messageLetter,
	  part2: messagePart2
	};

}
