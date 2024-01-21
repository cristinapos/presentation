document.addEventListener("DOMContentLoaded",()=>{
  const lifecycle = document.querySelector(".lifecycle");

  lifecycle.addEventListener('click', event => {
      const processExit = document.querySelector(".exitPros");
      processExit.style.display = 'block';
  });
});

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 39) {
    navigateSections('next');
  } else if (event.keyCode === 37) {
    navigateSections('prev');
  } 
  if (event.keyCode === 40) {
    const contentSection = document.getElementById('contentSection');
    if (isElementInViewport(contentSection)) {
        showNextListItem();
    }
  }
  
  if (event.keyCode === 13) {
    event.preventDefault()
    const text = document.getElementById('text');
    if (isElementInViewport(text) && text.style.display === 'block') {
      const textContent = `Want to quit your running Node.js server?
          You can always do that by pressing Ctrl + C
          in the terminal/ command prompt window where you started your server (i. e. where you ran node app.js)`
      showTextLetterByLetter(textContent);
    }

    const resourcesContent = document.getElementById('resourcesContent');
    if (resourcesContent.style.display === 'block') {
      showParagraphsSequentially(resourcesContent.querySelectorAll('.resource'));
    }
    
    const currentSection = getCurrentSection();
    console.log(isElementInViewport(currentSection))
    if (isElementInViewport(currentSection) && currentSection.style.display === 'block') {
      const currentSection = getCurrentSection();
      showVideoInCurrentSection(currentSection);
      
    }
  }
});

function navigateSections(direction) {
  const sections = document.querySelectorAll('.container');
  let currentIndex = -1;

  sections.forEach((section, index) => {
    if (section.style.display !== 'none' && currentIndex === -1) {
      currentIndex = index;
    }
  });
  if (direction === 'prev' && currentIndex > 0) {
    showSection(sections[currentIndex - 1]);
  } else if (direction === 'next' && currentIndex < sections.length - 1) {
    sections[currentIndex + 1].focus();
    showSection(sections[currentIndex + 1]);
  }
}

function showSection(section) {
  const sections = document.querySelectorAll('.container');
  sections.forEach(s => {
    if (s === section) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });
}

function showNextListItem() {
  const listItems = document.querySelectorAll('#contentList li.hidden1');
  if (listItems.length > 0) {
    const nextItem = listItems[0];
    nextItem.classList.remove('hidden1');
    nextItem.classList.add('visible1');
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function imageDisplay() {
  const image = document.querySelector('.diagram-schema');
  if (image && image.classList.contains('hidden')) {
    image.classList.remove('hidden');
    image.classList.add('visible');
    void image.offsetWidth;
  }
}

function getCurrentSection() {
  const sections = document.querySelectorAll('.container');
  let currentSection = Array.from(sections).find((section) => {
    if (section.style.display === 'block') {
      return section
    }
  });
  return currentSection;
}

function getSection(element) {
  while (element && !element.classList.contains('container')) {
    element = element.parentElement;
  }
  return element
}

function showVideoInCurrentSection(section) {
  if (section) {
    const video = section.querySelector('iframe');
    const image = section.querySelector('img');
    const thank = section.querySelector('.thanks');

    if (video) {
        video.classList.remove('hidden1');
        video.classList.add('visible1');
    } else if (image && image.classList.contains('hidden')) {
      image.classList.remove('hidden');
      image.classList.add('visible');
      void image.offsetWidth;
    } else if (thank && thank.classList.contains('stay')) {
      thank.classList.remove('stay');
      thank.classList.add('move');
    }
  }
}

function showTextLetterByLetter(text) {
  const myText = document.getElementById('textToType');
  let index = 0;
  myText.textContent = '';

  function showNextLetter() {
      if (index < text.length) {
          myText.textContent += text.charAt(index);
          index++;
          setTimeout(showNextLetter, 80);
      }
  }

  showNextLetter();
}

function showParagraphsSequentially(paragraphs) {
  let index = 0;

  function showNextParagraph() {
      if (index < paragraphs.length) {
          paragraphs[index].classList.remove('hidden2');
          paragraphs[index].classList.add('visible2');
          index++;
          setTimeout(showNextParagraph, 2000);
      }
  }

  showNextParagraph();
}
