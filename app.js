// Love-O-Meter JavaScript

// Application data
const appData = {
  specialCases: {
    "mantu_abcd": {"percentage": 95, "message": "A classic love story! ❤️"},
  },
  loveQuotes: [
    "Love is not about possession, it's about appreciation! 💕",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams! ✨",
    "Love is friendship that has caught fire! 🔥",
    "Being deeply loved by someone gives you strength! 💪",
    "Love recognizes no barriers! 🌈",
    "Where there is love, there is life! 🌟",
    "Love is the master key that opens the gates of happiness! 🗝️"
  ],
  messageRanges: {
    "90-99": "Perfect match! You're meant to be! 💕",
    "80-89": "Excellent compatibility! Love is in the air! 💖", 
    "70-79": "Great potential! This could work out! 💝",
    "60-69": "Good match! Give it a try! 💗",
    "50-59": "Average compatibility. Friendship might be better! 💛",
    "30-49": "Could be challenging... But love finds a way! 💙",
    "10-29": "Better as friends! But hey, opposites attract! 💜"
  }
};

// Global variables for DOM elements
let elements = {};

// Initialize the application
function initializeApp() {
  // Get DOM elements
  elements = {
    maleName: document.getElementById('maleName'),
    femaleName: document.getElementById('femaleName'),
    calculateBtn: document.getElementById('calculateBtn'),
    errorMessage: document.getElementById('errorMessage'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    percentageText: document.getElementById('percentageText'),
    meterFill: document.getElementById('meterFill'),
    compatibilityMessage: document.getElementById('compatibilityMessage'),
    loveQuote: document.getElementById('loveQuote'),
    tryAgainBtn: document.getElementById('tryAgainBtn'),
    shareBtn: document.getElementById('shareBtn'),
    confettiContainer: document.getElementById('confettiContainer'),
    heartExplosion: document.getElementById('heartExplosion')
  };

  // Verify elements exist
  console.log('Elements loaded:', elements);
  
  // Add event listeners with error checking
  if (elements.calculateBtn) {
    elements.calculateBtn.addEventListener('click', handleCalculateLove);
    console.log('Calculate button listener added');
  }
  
  if (elements.tryAgainBtn) {
    elements.tryAgainBtn.addEventListener('click', handleTryAgain);
  }
  
  if (elements.shareBtn) {
    elements.shareBtn.addEventListener('click', handleShare);
  }
  
  if (elements.maleName) {
    elements.maleName.addEventListener('input', handleMaleNameInput);
    elements.maleName.addEventListener('keypress', handleEnterKey);
  }
  
  if (elements.femaleName) {
    elements.femaleName.addEventListener('keypress', handleEnterKey);
  }

  console.log('App initialized successfully');
}

function handleMaleNameInput(event) {
  const maleName = event.target.value.trim().toLowerCase();
  console.log('Male name input:', maleName);
  
  // Check if the forbidden name is entered
  if (maleName === 'debosmit' || maleName === 'debosmit mondal') {
    console.log('Forbidden name detected');
    showError();
    setTimeout(() => {
      elements.maleName.value = '';
    }, 100);
  } else {
    hideError();
  }
}

function handleEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleCalculateLove();
  }
}

function showError() {
  if (elements.errorMessage) {
    elements.errorMessage.classList.remove('hidden');
    elements.errorMessage.style.animation = 'shake 0.5s ease-in-out';
    console.log('Error shown');
  }
}

function hideError() {
  if (elements.errorMessage) {
    elements.errorMessage.classList.add('hidden');
  }
}

function handleCalculateLove() {
  console.log('Calculate love clicked');
  
  if (!elements.maleName || !elements.femaleName) {
    console.error('Input elements not found');
    return;
  }
  
  const maleName = elements.maleName.value.trim();
  const femaleName = elements.femaleName.value.trim();
  
  console.log('Names:', maleName, femaleName);
  
  // Validation
  if (!maleName || !femaleName) {
    alert('Please enter both names!');
    return;
  }
  
  // Check for creator's name again (just in case)
  if (maleName.toLowerCase() === 'debosmit' || maleName.toLowerCase() === 'debosmit mondal') {
    showError();
    elements.maleName.value = '';
    return;
  }
  
  hideError();
  showLoading();
  
  // Calculate love after loading animation
  setTimeout(() => {
    const result = calculateLove(maleName, femaleName);
    console.log('Calculation result:', result);
    showResults(result, maleName, femaleName);
  }, 2000);
}

function showLoading() {
  console.log('Showing loading');
  if (elements.loadingSection) {
    elements.loadingSection.classList.remove('hidden');
  }
  if (elements.resultsSection) {
    elements.resultsSection.classList.add('hidden');
  }
}

function calculateLove(name1, name2) {
  const cleanName1 = name1.toLowerCase().trim();
  const cleanName2 = name2.toLowerCase().trim();
  
  console.log('Calculating for:', cleanName1, cleanName2);
  
  // Check for same names
  if (cleanName1 === cleanName2) {
    return {
      percentage: 100,
      message: "Self-love is the best love! 😂",
      isSpecial: true
    };
  }
  
  // Check for special cases
  const specialKey1 = `${cleanName1}_${cleanName2}`;
  const specialKey2 = `${cleanName2}_${cleanName1}`;
  
  if (appData.specialCases[specialKey1]) {
    return {
      percentage: appData.specialCases[specialKey1].percentage,
      message: appData.specialCases[specialKey1].message,
      isSpecial: true
    };
  }
  
  if (appData.specialCases[specialKey2]) {
    return {
      percentage: appData.specialCases[specialKey2].percentage,
      message: appData.specialCases[specialKey2].message,
      isSpecial: true
    };
  }
  
  // FLAMES-style algorithm with randomization
  const combinedNames = (cleanName1 + cleanName2).replace(/\s/g, '');
  let letterCount = {};
  
  // Count all letters
  for (let char of combinedNames) {
    if (char.match(/[a-z]/)) {
      letterCount[char] = (letterCount[char] || 0) + 1;
    }
  }
  
  // Remove pairs (common letters)
  let remainingCount = 0;
  for (let char in letterCount) {
    remainingCount += letterCount[char] % 2;
  }
  
  // Calculate base percentage using remaining letters
  let basePercentage = remainingCount * 7; // Multiply by 7 for better distribution
  
  // Add some randomization based on name lengths and characters
  const nameSum = cleanName1.length + cleanName2.length;
  const charCodeSum = combinedNames.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const randomFactor = (charCodeSum % 30) + (nameSum % 20);
  
  // Final calculation ensuring range 10-99
  let finalPercentage = ((basePercentage + randomFactor) % 90) + 10;
  
  // Ensure we don't get exactly 100% unless it's a special case
  if (finalPercentage >= 100) {
    finalPercentage = 99;
  }
  
  const compatibilityMessage = getCompatibilityMessage(finalPercentage);
  
  return {
    percentage: finalPercentage,
    message: compatibilityMessage,
    isSpecial: false
  };
}

function getCompatibilityMessage(percentage) {
  if (percentage >= 90) return appData.messageRanges["90-99"];
  if (percentage >= 80) return appData.messageRanges["80-89"];
  if (percentage >= 70) return appData.messageRanges["70-79"];
  if (percentage >= 60) return appData.messageRanges["60-69"];
  if (percentage >= 50) return appData.messageRanges["50-59"];
  if (percentage >= 30) return appData.messageRanges["30-49"];
  return appData.messageRanges["10-29"];
}

function showResults(result, maleName, femaleName) {
  console.log('Showing results:', result);
  
  if (elements.loadingSection) {
    elements.loadingSection.classList.add('hidden');
  }
  if (elements.resultsSection) {
    elements.resultsSection.classList.remove('hidden');
  }
  
  // Animate percentage
  animatePercentage(result.percentage);
  
  // Fill love meter
  animateLoveMeter(result.percentage);
  
  // Set messages
  if (elements.compatibilityMessage) {
    elements.compatibilityMessage.textContent = result.message;
  }
  if (elements.loveQuote) {
    elements.loveQuote.textContent = getRandomLoveQuote();
  }
  
  // Add special effects for high scores
  if (result.percentage >= 95) {
    createHeartExplosion();
  } else if (result.percentage >= 80) {
    createConfetti();
  }
  
  // Store names for sharing
  if (elements.shareBtn) {
    elements.shareBtn.dataset.maleName = maleName;
    elements.shareBtn.dataset.femaleName = femaleName;
    elements.shareBtn.dataset.percentage = result.percentage;
  }
}

function animatePercentage(targetPercentage) {
  if (!elements.percentageText) return;
  
  let currentPercentage = 0;
  const increment = targetPercentage / 50; // 50 steps for smooth animation
  
  const timer = setInterval(() => {
    currentPercentage += increment;
    if (currentPercentage >= targetPercentage) {
      currentPercentage = targetPercentage;
      clearInterval(timer);
    }
    elements.percentageText.textContent = Math.round(currentPercentage) + '%';
  }, 40);
}

function animateLoveMeter(percentage) {
  if (!elements.meterFill) return;
  
  setTimeout(() => {
    elements.meterFill.style.width = percentage + '%';
  }, 500);
}

function getRandomLoveQuote() {
  return appData.loveQuotes[Math.floor(Math.random() * appData.loveQuotes.length)];
}

function createConfetti() {
  if (!elements.confettiContainer) return;
  
  elements.confettiContainer.classList.remove('hidden');
  
  const colors = ['#ff6b8a', '#c471ed', '#ff4757', '#ffa502', '#ff6348'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      
      elements.confettiContainer.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.remove();
        }
      }, 3000);
    }, i * 100);
  }
  
  // Hide container after all confetti falls
  setTimeout(() => {
    elements.confettiContainer.classList.add('hidden');
  }, 8000);
}

function createHeartExplosion() {
  if (!elements.heartExplosion) return;
  
  elements.heartExplosion.classList.remove('hidden');
  
  const hearts = ['💕', '💖', '💗', '💝', '💘', '💞'];
  
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.className = 'explosion-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Random direction for explosion
    const angle = (i / 12) * 360;
    const distance = 100 + Math.random() * 100;
    const dx = Math.cos(angle * Math.PI / 180) * distance;
    const dy = Math.sin(angle * Math.PI / 180) * distance;
    
    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');
    heart.style.animationDelay = Math.random() * 0.5 + 's';
    
    elements.heartExplosion.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.remove();
      }
    }, 2000);
  }
  
  // Hide container after explosion
  setTimeout(() => {
    elements.heartExplosion.classList.add('hidden');
  }, 3000);
}

function handleTryAgain() {
  console.log('Try again clicked');
  
  // Reset form
  if (elements.maleName) elements.maleName.value = '';
  if (elements.femaleName) elements.femaleName.value = '';
  hideError();
  
  // Reset displays
  if (elements.resultsSection) elements.resultsSection.classList.add('hidden');
  if (elements.loadingSection) elements.loadingSection.classList.add('hidden');
  if (elements.percentageText) elements.percentageText.textContent = '0%';
  if (elements.meterFill) elements.meterFill.style.width = '0%';
  
  // Focus on first input
  if (elements.maleName) elements.maleName.focus();
}

function handleShare() {
  const maleName = elements.shareBtn.dataset.maleName;
  const femaleName = elements.shareBtn.dataset.femaleName;
  const percentage = elements.shareBtn.dataset.percentage;
  
  const shareText = `${maleName} and ${femaleName} have ${percentage}% love compatibility! 💕 Check yours at Love-O-Meter!`;
  
  // Try to use Web Share API if available
  if (navigator.share) {
    navigator.share({
      title: 'Love-O-Meter Result',
      text: shareText,
      url: window.location.href
    }).catch(console.error);
  } else {
    // Fallback: copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        // Show temporary success message
        const originalText = elements.shareBtn.innerHTML;
        elements.shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        elements.shareBtn.disabled = true;
        
        setTimeout(() => {
          elements.shareBtn.innerHTML = originalText;
          elements.shareBtn.disabled = false;
        }, 2000);
      }).catch(() => {
        // If clipboard fails, show alert
        alert('Share text:\n\n' + shareText);
      });
    } else {
      // Final fallback: show alert
      alert('Share text:\n\n' + shareText);
    }
  }
}

// Add some extra interactivity
function addClickHeartEffect() {
  document.addEventListener('click', (e) => {
    // Create small heart animation on random clicks
    if (Math.random() < 0.1) { // 10% chance
      createClickHeart(e.clientX, e.clientY);
    }
  });
}

function createClickHeart(x, y) {
  const heart = document.createElement('div');
  heart.textContent = '💕';
  heart.style.position = 'fixed';
  heart.style.left = x + 'px';
  heart.style.top = y + 'px';
  heart.style.fontSize = '20px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '999';
  heart.style.animation = 'clickHeartFade 2s ease-out forwards';
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 2000);
}

// Add CSS for click heart animation
function addClickHeartStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes clickHeartFade {
      0% {
        transform: translateY(0) scale(0.5);
        opacity: 1;
      }
      100% {
        transform: translateY(-50px) scale(1);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  initializeApp();
  addClickHeartEffect();
  addClickHeartStyles();
});