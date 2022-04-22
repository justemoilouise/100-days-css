export function challenge02() {
  let challenge = document.getElementById("challenge02");
  let blockTop = findElementByClass(challenge.children, "top");
  let blockMiddle = findElementByClass(challenge.children, "middle");
  let blockBottom = findElementByClass(challenge.children, "bottom");

  challenge.addEventListener("click", function(evt) {
    evt.preventDefault();

    if(challenge.classList.contains("active")) {
      blockMiddle.style = null;
      blockTop.style = "transform: translateY(20px);";
      blockBottom.style = "transform: translateY(-20px);";

      challenge.classList.remove("active");
      setTimeout(function() {
        blockTop.style = null;
        blockBottom.style = null;
      }, 200);
    } else {
      blockTop.style = "transform: translateY(20px);";
      blockBottom.style = "transform: translateY(-20px);";

      challenge.classList.add("active");
      setTimeout(function() {
        blockMiddle.style = "transform: rotate(-45deg);";
        blockTop.style = "transform: translateY(16px) rotate(45deg);";
        blockBottom.style = "transform: translateY(-16px) rotate(45deg)";
      }, 200);
    }
  });
}

export function challenge05() {
  const chartData = {
    views: [
      { day: 0, value: 458 },
      { day: 1, value: 812 },
      { day: 2, value: 746 },
      { day: 3, value: 877 },
      { day: 4, value: 517 },
      { day: 5, value: 434 },
      { day: 6, value: 768 },
    ],
    purchases: [
      { day: 0, value: 26 },
      { day: 1, value: 41 },
      { day: 2, value: 22 },
      { day: 3, value: 36 },
      { day: 4, value: 25 },
      { day: 5, value: 13 },
      { day: 6, value: 20 },
    ],
  };

  let challenge = document.getElementById("challenge05_lineChart");
  let tooltip = document.getElementById("challenge05_tooltip");

  const chartRect = challenge.getBoundingClientRect();
  const width = chartRect.width - 16;
  const height = chartRect.height - 16;

  const x = (data) => d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.day))
    .range([0, width]);
  const y = (data) => d3
    .scaleLinear()
    .domain(d3.extent(data, d => d.value))
    .range([height, 0]);
  const valueLine = (data) => d3
    .line()
    .x(d => x(data)(d.day))
    .y(d => y(data)(d.value))
  
  const onMouseOver = (color) => {
    return (d) => {
      tooltip.innerText = d.srcElement.__data__.value;

      const boundingRect = tooltip.getBoundingClientRect();
      const coordX = d.x - boundingRect.x - (boundingRect.width / 2);
      const coordY = d.screenY - boundingRect.bottom - (boundingRect.height / 2);

      tooltip.style.setProperty("--tooltipColor", color);
      tooltip.style.left = `${coordX}px`;
      tooltip.style.top = `${coordY}px`;
      tooltip.classList.add("show");
    };
  };
  const onMouseOut = () => {
    tooltip.classList.remove("show");
    tooltip.style = undefined;
  };

  const svg = d3.select("#challenge05_lineChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(8px, 8px)");
  
  const viewsG = svg.append("g");
  viewsG.append("path")
    .attr("class", "dataLine viewsLine")
    .attr("d", valueLine(chartData.views)(chartData.views));
  viewsG.selectAll("dot")
    .data(chartData.views)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", d => x(chartData.views)(d.day))
    .attr("cy", d => y(chartData.views)(d.value))
    .attr("class", "dataCircle viewsCircle")
    .on("mouseover", onMouseOver("rgb(237, 70, 19)"))
    .on("mouseout", onMouseOut);

  const purchasesG = svg.append("g");
  purchasesG.append("path")
    .attr("class", "dataLine purchasesLine")
    .attr("d", valueLine(chartData.purchases)(chartData.purchases));
  purchasesG.selectAll("dot")
    .data(chartData.purchases)
    .enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", d => x(chartData.purchases)(d.day))
    .attr("cy", d => y(chartData.purchases)(d.value))
    .attr("class", "dataCircle purchasesCircle")
    .on("mouseover", onMouseOver("rgb(19, 146, 237)"))
    .on("mouseout", onMouseOut);
}

export function challenge07() {
  let challenge = document.getElementById("challenge07");

  let sidebar = findElementByClass(challenge.children, "sidebar");
  let mainPanel = findElementByClass(challenge.children, "mainPanel");

  const header = findElementByClass(mainPanel.children, "header");
  let searchbar = findElementByClass(header.children, "searchBar");

  const sidebarTop = `top: calc(50% - ${sidebar.clientHeight / 2}px)`;
  sidebar.style = sidebarTop;

  let leftIcon = document.getElementById("challenge07_headerLeftIcon");
  leftIcon.addEventListener("click", function(evt) {
    evt.preventDefault();

    if(leftIcon.classList.contains("active")) {
      leftIcon.classList.remove("active");
      mainPanel.style = null;
      sidebar.style = sidebarTop;
    } else {
      leftIcon.classList.add("active");
      mainPanel.style = "transform: translateX(150px)";
      sidebar.style = `${sidebarTop}; transform: translateX(-16px)`;
    }
  });

  let rightIcon = document.getElementById("challenge07_headerRightIcon");
  rightIcon.addEventListener("click", function(evt) {
    evt.preventDefault();

    if(rightIcon.classList.contains("active")) {
      rightIcon.classList.remove("active");
      searchbar.value = '';
      searchbar.style = null;
    } else {
      rightIcon.classList.add("active");
      searchbar.style = "opacity: 1; transform: translateX(-96px); z-index: 2;"
    }
  });
}

export function challenge12() {
  let challenge = document.getElementById("challenge12");

  let tooltip = findElementByClass(challenge.children, "tooltip");
  let highlight = document.getElementById("challenge12_highlight");

  const left = tooltip.offsetLeft + (highlight.offsetLeft + (highlight.offsetWidth/2)) - (tooltip.offsetWidth/2);
  tooltip.style = `left: ${left + 24}px`;

  function addTooltipClass(evt) {
    evt.preventDefault();

    tooltip.classList.add("active");
  }

  function removeTooltipClass(evt) {
    evt.preventDefault();

    tooltip.classList.remove("active");
  }

  tooltip.addEventListener("mouseover", addTooltipClass);
  tooltip.addEventListener("mouseout", removeTooltipClass);
  highlight.addEventListener("mouseover", addTooltipClass);
  highlight.addEventListener("mouseout", removeTooltipClass);
}

export function challenge13() {
  let challenge = document.getElementById("challenge13");
  let overlayChildren = challenge.getElementsByClassName("overlay");

  const imageChildren = challenge.getElementsByClassName("imageWrapper");
  [].forEach.call(imageChildren, function(node) {
    node.addEventListener('click', function(evt) {
      evt.preventDefault();

      [].forEach.call(overlayChildren, function(overlayNode) {
        overlayNode.classList.add('visible');
      });
    });
  });

  const closeBtn = document.getElementById("challenge13_close");
  closeBtn.addEventListener('click', function(evt) {
    evt.preventDefault();

    closeBtn.classList.remove('visible');
    [].forEach.call(overlayChildren, function(overlayNode) {
      overlayNode.classList.remove('visible');
    });
  });
}

export function challenge14() {
  let challenge = document.getElementById("challenge14");

  function mouseEventHandler(evt) {
    evt.preventDefault();

    [].forEach.call(challenge.children, function(el) {
      if(el.classList.contains("active")) {
        el.classList.remove("active");
      } else {
        el.classList.add("active");
      }
    });
  }

  challenge.addEventListener("mouseover", mouseEventHandler);
  challenge.addEventListener("mouseout", mouseEventHandler);
}

export function challenge25() {
  let challenge = document.getElementById("challenge25");

  function addClass() {
    [].forEach.call(challenge.children, function(node) {
      node.classList.add("turn");
    });
  }

  function removeClass() {
    [].forEach.call(challenge.children, function(node) {
      node.classList.remove("turn");
    });
  }

  challenge.addEventListener('click', function(evt) {
    evt.preventDefault();

    if(challenge.classList.contains("switch")) {
      removeClass();
      challenge.classList.remove("switch");
    } else {
      addClass();
      challenge.classList.add("switch");
    }
  });
}

export function challenge26() {
  const contentArray = [
    {
      header: "The couch",
      content: "If you want to grow, get outside your comfort zone."
    },
    {
      header: "Failing is learning",
      content: "Pick yourself up, dust yourself off, and start again."
    },
    {
      header: "Flowers and rainbows",
      content: "Always be yourself, unless you can be a unicorn."
    },
  ];

  let challenge = document.getElementById("challenge26");
  let card = findElementByClass(challenge.children, "card");
  let button = findElementByClass(card.children, "button");

  function setCardContent() {
    let content = findElementByClass(card.children, "content");
  
    const currentIndex = parseInt(
      findElementByClass(content.children, "marker").textContent || "0",
      10);
    const newContent = contentArray[currentIndex % 3];
    [].forEach.call(content.children, function(el) {
      switch(el.tagName) {
        case "DIV": // marker
          el.textContent = (currentIndex + 1) > 3 ? 1 : currentIndex + 1;
          break
        case "H3": // heading
          el.textContent = newContent.header;
          break;
        case "P": // content
          el.textContent = newContent.content;
          break;
        default: break;
      }
    });
  }

  button.addEventListener("click", function(evt) {
    evt.preventDefault();

    card.classList.remove("zoomInFadeIn");
    card.classList.add("zoomInFadeOut");

    setTimeout(function() {
      card.classList.add("zeroScale");
      setCardContent();
    }, 500);

    setTimeout(function() {
      card.classList.remove("zeroScale");
      card.classList.remove("zoomInFadeOut");
      card.classList.add("zoomInFadeIn");
    }, 600);
  });

  setCardContent();
}

export function challenge29() {
  let challengeContainerInput = document.getElementsByClassName("challenge29_container_input");
  let challengeContainer = document.getElementById("challenge29_container");
  let challengeInput = document.getElementById("challenge29_input");

  challengeInput.addEventListener('keyup', function(evt) {
    const currentValue = evt.currentTarget.value;

    if(currentValue) {
      [].forEach.call(challengeContainerInput, function(node) {
        node.textContent = currentValue;
      });
      challengeContainer.classList.add("visible");
    } else {
      challengeContainer.classList.remove("visible");
    }
  });
}

export function challenge32() {
  let challenge = document.getElementById("challenge32");
  let counter = findElementByClass(challenge.children, "counter");
  let countNode = findElementByClass(counter.children, "count");

  function animateSetNewValue(value) {
    countNode.classList.add("zoomInFadeOut");
    setTimeout(function() {
      countNode.textContent = value;
      countNode.classList.remove("zoomInFadeOut");
    }, 250);
  }

  let btnMinus = findElementByClass(counter.children, "minus");
  btnMinus.addEventListener("click", function(evt) {
    evt.preventDefault();
    animateSetNewValue(parseInt(countNode.textContent, 10) - 1);
  });

  let btnPlus = findElementByClass(counter.children, "plus");
  btnPlus.addEventListener("click", function(evt) {
    evt.preventDefault();
    animateSetNewValue(parseInt(countNode.textContent, 10) + 1);
  });
}

export function challenge36() {
  let challenge = document.getElementById("challenge36");
  let panel = findElementByClass(challenge.children, "panel");
  let main = findElementByClass(panel.children, "main");
  let content = findElementByClass(main.children, "content");
  let heading = findElementByClass(content.children, "heading");
  let menus = document.getElementById("challenge36_menus");

  let currentActiveMenu = [].filter.call(menus.children, function(menu) {
    return menu.getAttribute("data-header");
  })[0];
  
  [].forEach.call(menus.children, function(menu) {
    menu.addEventListener("click", function(evt) {
      evt.preventDefault();

      if(currentActiveMenu) {
        currentActiveMenu.classList.remove("active");
      }

      currentActiveMenu = menu;
      menu.classList.add("active");
      content.classList.add("changeContent");

      setTimeout(function() {
        heading.textContent = menu.getAttribute("data-header");
        content.classList.remove("changeContent");
      }, 400);
    });
  });
}

export function challenge37() {
  let challenge = document.getElementById('challenge37_wrapper');

  let textPlaceholderNode = document.createElement("div");
  textPlaceholderNode.classList.add("textPlaceholder");

  Array.from({length: 3}, () => {
    let node = document.createElement("div");
    node.classList.add("card");
    node.appendChild(textPlaceholderNode.cloneNode());
    node.appendChild(textPlaceholderNode.cloneNode());
    node.appendChild(textPlaceholderNode.cloneNode());
    node.appendChild(textPlaceholderNode.cloneNode());
    node.appendChild(textPlaceholderNode.cloneNode());

    challenge.appendChild(node);
  });
}

export function challenge38() {
  let shape1 = document.getElementById("challenge38_shape1");
  let shape2 = document.getElementById("challenge38_shape2");

  shape1.addEventListener("click", function(evt) {
    evt.preventDefault();

    shape1.classList.add("zoomIn");
    shape2.classList.add("zoomIn");
  });

  shape2.addEventListener("click", function(evt) {
    evt.preventDefault();

    shape1.classList.remove("zoomIn");
    shape2.classList.remove("zoomIn");
  });
}

export function challenge39() {
  let challenge = document.getElementById("challenge39");

  function restyle() {
    [].forEach.call(challenge.children, function(el) {
      if(el.classList.contains("line")) {
        if(el.classList.contains("collapse")) {
          el.classList.remove("center");
          setTimeout(function() {
            el.classList.remove("collapse");
          }, 1000);
        } else {
          el.classList.add("collapse");
          setTimeout(function() {
            el.classList.add("center");
          }, 1000);
        }
      } else if(el.classList.contains("menubar")) {
        el.classList.contains("collapse")
        ? setTimeout(function() {
          el.classList.remove("collapse");
        }, 1000)
        : el.classList.add("collapse");
      }
    });
  }

  [].forEach.call(challenge.children, function(el) {
    el.addEventListener("click", function(evt) {
      evt.preventDefault();
      restyle();
    });
  });
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

export function challenge41() {
  let challenge = document.getElementById("challenge41");
  let popout = findElementByClass(challenge.children, "popout");

  let btn = document.getElementById("challenge41_button");
  btn.addEventListener("click", function(evt) {
    evt.preventDefault();

    popout.classList.add("zeroScale");
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

export function challenge49() {
  let challenge = document.getElementById('challenge49');
  let circle = document.getElementById('challenge49_circle');

  function moveCircle(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    let boundingRect = circle.getBoundingClientRect();
    let x = evt.x - boundingRect.x;
    let y = evt.y - boundingRect.y;

    circle.animate([
      { transform: `translate(${x}px, ${y}px)` }
    ], {
      duration: 500,
      fill: 'forwards'
    });
  }

  challenge.addEventListener('mousemove', throttle(moveCircle, 100));
  challenge.addEventListener('mouseleave', debounce(function() {
    circle.animate([
      { transform: `translate(0, 0)` }
    ], {
      duration: 500,
      fill: 'forwards'
    });
  }, 250));
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

export function challenge65() {
  let challenge = document.getElementById("challenge65");

  const count = 10;
  const factor = 18;
  Array.from({length: count}, () => {
    let node = document.createElement("div");
    node.classList.add("element");
    challenge.append(node);
  });

  function animate() {
    const rotate = challenge.classList.contains("square");
    const style = `width: 80px;
      left: calc(50% - 40px);
      border-top-left-radius: 80px 160px;
      border-top-right-radius: 80px 160px;
      border-bottom-left-radius: 80px 160px;
      border-bottom-right-radius: 80px 160px;`;

    [].forEach.call(challenge.children, function(node, index) {
      node.style = rotate
        ? `${style} transform: rotate(${180 - (index * factor)}deg);`
        : null;
    });

    rotate ? challenge.classList.remove("square") : challenge.classList.add("square");
  }

  setInterval(animate, 3000);
}

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

// export function challenge73() {
//   const text = [ "Jaguar", "Panther", "Leopard", "Tiger" ];
//   let currentIndex = 0;

//   let challenge = document.getElementById("challenge73_scrollingText");
//   function setContent() {
//     currentIndex = (currentIndex + 1) > 4 ? 1 : currentIndex + 1;
//     const newContent = text[currentIndex % 4];
//     let node = document.createElement("span");
//     node.textContent = newContent;

//     challenge.append(node);
    

//     setTimeout(function () {
//       challenge.children[0].style = `transform: translateY(-48px)`;
//       node.style = `transform: translateY(-48px)`;
//     }, 500);

//     setTimeout(function () {
//       if(challenge.children.length > 2) {
//         challenge.removeChild(challenge.children[0]);
//       }
//     }, 2000);
//   }

//   setInterval(setContent, 3000);
// }

// export function challenge72() {
//   let challenge = document.getElementById("challenge72");

//   const count = 10;
//   // const factor = 18;
//   Array.from({length: count}, () => {
//     let node = document.createElement("div");
//     node.classList.add("element");
//     challenge.append(node);
//   });

//   function animate() {
//     const rotate = challenge.classList.contains("active");

//     [].forEach.call(challenge.children, function(node, index) {
      
//       node.style = rotate
//         ? `transform: rotate3d(${index % 2 === 0 ? 1 : -1}, 1, 0, 360deg);
//             border-color: rgba(255, 255, 255, 0.4);`
//         : null;
//     });

//     rotate ? challenge.classList.remove("active") : challenge.classList.add("active");
//   }

//   setInterval(animate, 3000);
// }

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

export function challenge80() {
  let challenge = document.getElementById("challenge80");

  function filterInactiveNodes(activeId) {
    return [].filter.call(challenge.children, function(node) {
      return node.id !== activeId;
    });
  }

  [].forEach.call(challenge.children, function(node) {
    let siblingNodes = filterInactiveNodes(node.id);

    node.addEventListener("mouseover", function(evt) {
      evt.preventDefault();

      siblingNodes.forEach(function(sibNode) {
        sibNode.classList.remove("active");
        sibNode.classList.add("inactive");
      });

      node.classList.remove("inactive");
      node.classList.add("active");
    });

    node.addEventListener("mouseout", function(evt) {
      evt.preventDefault();

      siblingNodes.forEach(function(sibNode) {
        sibNode.classList.remove("inactive");
      });
      node.classList.remove("active");
    })
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

export function challenge86() {
  let challenge = document.getElementById("challenge86");

  const count = 5;
  Array.from({length: count}, (val, index) => {
    let pendulumString = document.createElement("div");
    pendulumString.classList.add('string');
    let pendulumBall = document.createElement("div");
    pendulumBall.classList.add('ball');

    let node = document.createElement("div");
    node.classList.add("pendulum");
    node.appendChild(pendulumString);
    node.appendChild(pendulumBall);

    if(index === 0) {
      node.id = "challenge86_left";
    } else if(index === count - 1) {
      node.id = "challenge86_right";
    }
    challenge.appendChild(node);
  });

  setInterval(function() {
    let left = document.getElementById("challenge86_left");
    let right = document.getElementById("challenge86_right");

    if(left.classList.contains('left')) {
      left.classList.remove('left');
      right.classList.add('right');
    } else {
      right.classList.remove('right');
      left.classList.add('left');
    }
  }, 900);
}

export function challenge99() {
  let challenge = document.getElementById('challenge99');

  challenge.addEventListener('click', function(evt) {
    evt.preventDefault();

    if(challenge.classList.contains('animate')) {
      challenge.classList.remove('animate');
    } else {
      challenge.classList.add('animate');
    }
  });
}

function findElementByClass(arr, className) {
  return [].find.call(arr, function(el) {
    return el.classList.contains(className);
  });
}

const debounce = (func, delay) => {
  let debounceTimer;

  return function() {
    const context = this;
    const args = arguments;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  }
}

const throttle = (func, limit) => {
  let inThrottle;

  return function() {
    const args = arguments;
    const context = this;

    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
