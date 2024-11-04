let font;
let points = [];

function preload() {
  font = loadFont("font/OpenSans-Italic-VariableFont_wdth,wght.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = font.textToPoints("NINA", 0, 0, 200, {
    sampleFactor: 0.06
  });
}

function draw() {
  background("#f5ebe0");

  // 找到文字的底部邊界
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  for (let i = 0; i < points.length; i++) {
    minX = min(minX, points[i].x);
    maxX = max(maxX, points[i].x);
    minY = min(minY, points[i].y);
  }

  // 計算文字的寬度和高度
  let textWidth = maxX - minX;
  let textHeight = minY; // 假設 minY 代表文字的基線位置

  // 計算文字的中心位置
  let textX = width / 2 - textWidth / 2;
  let textY = height / 2 + textHeight / 2; // 調整 y 座標以控制文字的垂直位置

  // 繪製底線
  stroke(0);
  strokeWeight(10);
  stroke("#99582a");
  line(minX + textX, minY + textY, maxX + textX, minY + textY);

  // 繪製文字
  push();
  translate(textX, textY);
  noFill();
  stroke("#99582a");
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    text(str(i), points[i].x, points[i].y);
  }
  pop();
  let faceSize = 100;
  let spacing = 10;
  let facesPerRow = floor(width / (faceSize + spacing));

  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < facesPerRow; col++) {
      let x = spacing + col * (faceSize + spacing);
      let y = spacing + row * (faceSize + spacing);

      // 計算滑鼠與笑臉的向量
      let vectorToMouse = createVector(mouseX - x, mouseY - y);

      push();
      translate(x, y);
      // 將笑臉旋轉到指向滑鼠的方向
      rotate(vectorToMouse.heading());

      // 繪製笑臉
      ellipse(0, 0, faceSize);
      fill("#99582a");
      ellipse(-faceSize * 0.2, -10, faceSize * 0.1);
      ellipse(faceSize * 0.2, -10, faceSize * 0.1);
      noFill();
      arc(0, 20, faceSize * 0.5, faceSize * 0.2, 0, PI);

      pop();
       // 繪製文字點
  noFill();
  stroke("#99582a");
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    text(str(i), points[i].x, points[i].y);
  }

    }
  }
}
