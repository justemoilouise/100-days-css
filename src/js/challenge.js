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
  let blockWhite = findElementByClass(challenge.children, "white");
  let blockPurple = findElementByClass(challenge.children, "purple");

  challenge.addEventListener("mouseover", function(evt) {
    evt.preventDefault();

    blockPurple.style = "z-index: 10; transform: translate(-10px, -10px);";
    blockWhite.style = "transform: translate(10px, 10px);";
  });
  challenge.addEventListener("mouseout", function(evt) {
    evt.preventDefault();

    blockWhite.style = null;
    blockPurple.style = null;
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
      blockTop.style = "transform: translateY(10px) rotate(45deg);";
      blockBottom.style = "transform: translateY(-10px) rotate(45deg)";
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

function findElementByClass(arr, className) {
  return [].find.call(arr, function(el) {
    return el.classList.contains(className)
  });
}
