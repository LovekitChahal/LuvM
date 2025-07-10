let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    // Desktop mouse
    document.addEventListener("mousemove", (e) => this.onMove(e));
    this.paper.addEventListener("mousedown", (e) => this.onStart(e));
    document.addEventListener("mouseup", () => this.onEnd());

    // Mobile touch
    document.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });
    this.paper.addEventListener("touchstart", (e) => this.onTouchStart(e), { passive: false });
    document.addEventListener("touchend", () => this.onEnd());
  }

  onStart(e) {
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    this.offsetX = e.clientX - this.paper.offsetLeft;
    this.offsetY = e.clientY - this.paper.offsetTop;
  }

  onTouchStart(e) {
    this.holdingPaper = true;
    this.paper.style.zIndex = highestZ++;
    const touch = e.touches[0];
    this.offsetX = touch.clientX - this.paper.offsetLeft;
    this.offsetY = touch.clientY - this.paper.offsetTop;
    e.preventDefault();
  }

  onEnd() {
    this.holdingPaper = false;
  }

  onMove(e) {
    if (!this.holdingPaper) return;
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.movePaper();
  }

  onTouchMove(e) {
    if (!this.holdingPaper) return;
    const touch = e.touches[0];
    this.mouseX = touch.clientX;
    this.mouseY = touch.clientY;
    this.movePaper();
    e.preventDefault(); // stops page from scrolling
  }

  movePaper() {
    const x = this.mouseX - this.offsetX;
    const y = this.mouseY - this.offsetY;
    this.paper.style.left = `${x}px`;
    this.paper.style.top = `${y}px`;
  }
}

// Initialize all .paper elements
document.querySelectorAll('.paper').forEach((paperEl) => {
  new Paper(paperEl);
});