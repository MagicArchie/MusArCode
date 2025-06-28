const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  //Get the user's selected language from localStorage
  const lang = localStorage.getItem('selectedLanguage') || 'en'; // default to English
  
  if (lang === 'gr') {
	document.body.classList.add('gr');
  } else {
	document.body.classList.remove('gr');
  }
  
  const BTSound = new Audio('../../../assets/sounds/BT_SFX3.mp3');
  BTSound.volume = 0.8;
  
  const stopSound = new Audio('../../../assets/sounds/BT_SFX3.mp3'); // same file, different object
  stopSound.volume = 0.8;

  //Update the heading and button labels based on the selected language
  const heading = document.querySelector('h1');
  const startButton = document.getElementById('startButton');
  const stopButton = document.getElementById('stopButton');
  const backButton = document.getElementById('backButton');

  if (lang === 'gr') {
    heading.textContent = 'Εξερεύνησε την πόλη, ένα στοιχείο τη φοράά';
    startButton.textContent = 'Έναρξη';
    stopButton.textContent = 'Τέλος';
    backButton.textContent = '⬅ Επιστροφή';
  } else {
    heading.textContent = 'Explore the City, One Marker at a Time';
    startButton.textContent = 'Start';
    stopButton.textContent = 'Stop';
    backButton.textContent = '⬅ Go Back';
  }

  let mindarThree = null;
  let isStarted = false;

  const start = async () => {
	  
	BTSound.play();  
	  
    if (isStarted) return;
    isStarted = true;

    mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind'
    });

    const {renderer, scene, camera} = mindarThree;

    mindarThree.addAnchor(0).onTargetFound = () => {
      console.log("Target 1 Found!");
      window.location.href = "./pages/Video1/index.html";
    };

    mindarThree.addAnchor(1).onTargetFound = () => {
      console.log("Target 2 Found!");
      window.location.href = "./pages/Video2/index.html";
    };

    mindarThree.addAnchor(2).onTargetFound = () => {
      console.log("Target 3 Found!");
      window.location.href = './pages/Video3/index.html';
    };

    mindarThree.addAnchor(3).onTargetFound = () => {
      console.log("Target 4 Found!");
      window.location.href = './pages/Video4/index.html';
    };
	
	mindarThree.addAnchor(4).onTargetFound = () => {
      console.log("Target 5 Found!");
      window.location.href = './pages/Video5/index.html';
    };
	
	mindarThree.addAnchor(5).onTargetFound = () => {
      console.log("Target 6 Found!");
      window.location.href = './pages/Video6/index.html';
    };
	
	mindarThree.addAnchor(6).onTargetFound = () => {
      console.log("Target 7 Found!");
      window.location.href = './pages/Video7/index.html';
    };
	
	mindarThree.addAnchor(7).onTargetFound = () => {
      console.log("Target 8 Found!");
      window.location.href = './pages/Video8/index.html';
    };
	
	mindarThree.addAnchor(8).onTargetFound = () => {
      console.log("Target 9 Found!");
      window.location.href = './pages/Video9/index.html';
    };
	
	mindarThree.addAnchor(9).onTargetFound = () => {
      console.log("Target 10 Found!");
      window.location.href = './pages/Video10/index.html';
    };
	
	mindarThree.addAnchor(10).onTargetFound = () => {
      console.log("Target 11 Found!");
      window.location.href = './pages/Video11/index.html';
    };
	
	mindarThree.addAnchor(11).onTargetFound = () => {
      console.log("Target 12 Found!");
      window.location.href = './pages/Video12/index.html';
    };

    await mindarThree.start();
	document.getElementById('backgroundLayer').style.display = 'none';
	document.querySelector('h1').style.color = '#fff';

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    startButton.disabled = true;
    stopButton.disabled = false;
  };

  const stop = () => {
	  
	stopSound.play();  
	  
    if (!isStarted) return;
    isStarted = false;

    mindarThree.stop();
    mindarThree.renderer.setAnimationLoop(null);
    mindarThree = null;
	
	document.getElementById('backgroundLayer').style.display = 'block';
	document.querySelector('h1').style.color = '#080808';

    startButton.disabled = false;
    stopButton.disabled = true;
  };

  startButton.addEventListener('click', start);
  stopButton.addEventListener('click', stop);
  
  backButton.addEventListener('click', () => {
    console.log('Back button clicked');
	
	BTSound.play();

    setTimeout(() => {
      window.location.href = '../mainPage/game.html'; // adjust as needed
    }, 500);
  });
});
