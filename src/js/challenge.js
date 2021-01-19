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
        currentActiveEl.classList.remove("active");
      }
      el.classList.add("active");
    });
  });
}

function findElementByClass(arr, className) {
  return [].find.call(arr, function(el) {
    return el.classList.contains(className);
  });
}
