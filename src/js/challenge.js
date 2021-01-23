/** #66 - Radio Button **/
export function challenge66() {
  let challenge = document.getElementById("challenge66");
  challenge.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (evt.currentTarget.classList.contains("active")) {
      [].forEach.call(evt.currentTarget.children, function(el) {
        el.classList.remove("active");
      });
      evt.currentTarget.classList.remove("active");
    } else {
      [].forEach.call(evt.currentTarget.children, function(el) {
        el.classList.add("active");
        if(el.classList.contains("ray")) {
          setTimeout(function() {
            el.classList.remove("active");
          }, 300);
        }
      });
      evt.currentTarget.classList.add("active");
    }
  });
}

export function challenge82() {
  let challenge = document.getElementById("challenge82");
  challenge.addEventListener("click", function(evt) {
    evt.preventDefault();

    [].forEach.call(evt.currentTarget.children, function(el) {
      if (el.classList.contains("active")) {
        el.classList.remove("active");
        el.style = "transform: rotateX(180deg)";
      } else {
        el.classList.add("active");
        el.style = null;
      }
    });
  });
}

export function challenge64() {
  let challenge = document.getElementById("challenge64");
  let blockFront = findElementByClass(challenge.children, "front");
  let blockBack = findElementByClass(challenge.children, "back");

  challenge.addEventListener("mouseover", function(evt) {
    evt.preventDefault();

    blockFront.classList.add("movePurple");
    blockBack.classList.add("moveWhite");
  });
  challenge.addEventListener("mouseout", function(evt) {
    evt.preventDefault();

    blockFront.classList.remove("movePurple");
    blockBack.classList.remove("moveWhite");
  });
}

export function challenge02() {
  let challenge = document.getElementById("challenge02");
  let blockTop = findElementByClass(challenge.children, "top");
  let blockMiddle = findElementByClass(challenge.children, "middle");
  let blockBottom = findElementByClass(challenge.children, "bottom");

  challenge.addEventListener("mouseover", function(evt) {
    evt.preventDefault();

    blockTop.style = "transform: translateY(10px);";
    blockBottom.style = "transform: translateY(-10px);";

    setTimeout(function() {
      blockMiddle.style = "transform: rotate(-45deg);";
      blockTop.style = "transform: translateY(8px) rotate(45deg);";
      blockBottom.style = "transform: translateY(-8px) rotate(45deg)";
    }, 200);
  });
  challenge.addEventListener("mouseout", function(evt) {
    evt.preventDefault();

    blockMiddle.style = null;
    blockTop.style = "transform: translateY(10px);";
    blockBottom.style = "transform: translateY(-10px);";

    setTimeout(function() {
      blockTop.style = null;
      blockBottom.style = null;
    }, 200);
  })
}

export function challenge40() {
  let challenge = document.getElementById("challenge40");
  let middleIndex = Math.floor(challenge.children.length / 2)
  let middleImg = challenge.children[middleIndex];

  [].forEach.call(challenge.children, function(el) {
    el.addEventListener("click", function(evt) {
      evt.preventDefault;

      const { top: currentTop, left: currentLeft, width: currentWidth, height: currentHeight } = evt.target.getBoundingClientRect()
      const { top: middleTop, left: middleLeft } = middleImg.getBoundingClientRect();
      const { width: containerWidth, height: containerHeight } = challenge.getBoundingClientRect();
      const scale = currentWidth > currentHeight
        ? containerWidth / currentWidth
        : containerHeight / currentHeight;

      let transform = [];
      transform.push(`translate(${middleLeft - currentLeft}px, ${middleTop - currentTop}px)`);
      transform.push(`scale(${scale})`);
      
      if (el.classList.contains("active")) {
        el.classList.remove("active");
        el.style = null;
      } else {
        el.classList.add("active");
        el.style = "transform: " + transform.join(" "); + ";";
      }
    });
  });
}

export function challenge74() {
  let challenge = document.getElementById("challenge74");

  [].forEach.call(challenge.children, function(el) {
    el.addEventListener("click", function(evt) {
      evt.preventDefault;

      let currentActiveEl = findElementByClass(challenge.children, "active");
      if(currentActiveEl) {
        const currentBackgroundEl = findElementByClass(currentActiveEl.children, "rippleBackground");
        currentBackgroundEl.classList.remove("rippleEffect");
        currentActiveEl.classList.remove("active");
      }

      const backgroundEl = findElementByClass(el.children, "rippleBackground");
      backgroundEl.classList.add("rippleEffect")
      el.classList.add("active");
    });
  });
}

export function challenge47() {
  let challenge = document.getElementById("challenge47");
  const pixelWidth = (challenge.clientWidth/20) - 2;

  const cornerIndices = [0, 19, 380, 399];
  const activeIndices = [129, 130, 148, 149, 150, 151, 167, 168, 169, 170, 171, 172,
    186, 187, 189, 190, 192, 193, 206, 207, 208, 209, 210, 211, 212, 213, 228, 231,
    247, 249, 250, 252, 266, 268, 271, 273];

  for(let i = 0; i < 400; i++) {
    const child = document.createElement("div");
      child.classList.add("pixel");
      child.style = `width: ${pixelWidth}px; height: ${pixelWidth}px`;

      if(cornerIndices.includes(i)) {
        switch (i) {
          case 0: child.classList.add("cornerTopLeft");
            break;
          case 19: child.classList.add("cornerTopRight");
            break;
          case 380: child.classList.add("cornerBottomLeft");
            break;
          case 399: child.classList.add("cornerBottomRight");
            break;
        }
      }

      if(activeIndices.includes(i)) {
        child.classList.add("active");
      }

      child.addEventListener("click", function(evt) {
        evt.preventDefault();
        if(child.classList.contains("active")) {
          child.classList.remove("active");
        } else {
          child.classList.add("active");
        }
      });

      challenge.appendChild(child);
  }
}

export function challenge51() {
  let challenge = document.getElementById("challenge51");

  let interval;
  let timer = findElementByClass(challenge.children, "timer");
  let button = findElementByClass(challenge.children, "button");

  button.addEventListener("click", function(evt) {
    evt.preventDefault();

    if(button.classList.contains("play")) {
      interval = setInterval(function() {
        const currentTime = parseInt(timer.textContent, 10);
        timer.textContent = (currentTime + 1).toString().padStart(4, "0");
      }, 1000);

      button.classList.remove("play");
      button.classList.add("pause");
    } else {
      clearInterval(interval);

      button.classList.remove("pause");
      button.classList.add("play");
    }
  });
}

export function challenge62() {
  let challenge = document.getElementById("challenge62");

  const features = {
    Basic: {
      users: 5,
      storage: 20,
      projects: 2,
    },
    Pro: {
      users: 25,
      storage: 150,
      projects: 25,
    },
    Premium: {
      users: 100,
      storage: 200,
      projects: 50,
    }
  };

  let featurePlanUser = document.getElementById("challenge62_featureUser");
  let featurePlanStorage = document.getElementById("challenge62_featureStorage");
  let featurePlanProject = document.getElementById("challenge62_featureProject");

  let cardContainer = findElementByClass(challenge.children, "cardContainer");
  [].forEach.call(cardContainer.children, function(el) {
    el.addEventListener("mouseover", function(evt) {
      evt.preventDefault();

      const planFeature = features[el.getAttribute("name")];
      featurePlanUser.style.width = `${(planFeature.users / 100) * 100}%`;
      featurePlanStorage.style.width = `${(planFeature.storage / 200) * 100}%`;
      featurePlanProject.style.width = `${(planFeature.projects / 50) * 100}%`;
    });

    el.addEventListener("mouseout", function(evt) {
      evt.preventDefault();

      featurePlanUser.style.width = 0;
      featurePlanStorage.style.width = 0;
      featurePlanProject.style.width = 0;
    });
  });
}

function findElementByClass(arr, className) {
  return [].find.call(arr, function(el) {
    return el.classList.contains(className);
  });
}
