class Star extends HTMLElement {
  constructor() {
    super();
    this.value = null;
    this.height = null;
    this.width = null;
    this.decimals = 0;
  }

  connectedCallback() {
    this.value = this.getAttribute('value') || null;
    this.height = this.getAttribute('height') || null;
    this.width = this.getAttribute('width') || null;

    this.innerHTML = '';

    this.decimals = Number(this.value) % 1;
    this.starCount = Math.floor(Number(this.value));

    this.stars = document.createElement('div');
    this.stars.className = 'stars';
    this.stars.style.height = `${this.height}px`;

    this.addFullStars();
    this.addDecimalStar();
    this.addPlaceholderStars();
    this.append(this.stars);
  }

  addFullStars() {
    const stars = Array.from({ length: this.starCount }, (_, i) => i);

    stars.forEach((i) => {
      const starItem = this.createStarItem({
        left: i * this.width,
        height: this.height,
        width: this.width,
      });

      this.stars.appendChild(starItem);
    });
  }

  addDecimalStar() {
    const starItem = this.createStarItem({
      left: this.starCount * this.width,
      height: this.height,
      width: this.decimals * Number(this.width) - 8,
    });

    this.stars.appendChild(starItem);
  }

  addPlaceholderStars() {
    const placeholders = Array.from({ length: 5 }, (_, i) => i);

    placeholders.forEach((i) => {
      const starItem = this.createStarItem({
        left: i * this.width,
        height: this.height,
        width: this.width,
      });

      starItem.classList.add('placeholder');
      this.stars.appendChild(starItem);
    });
  }

  createStarItem({ left, height, width }) {
    const starItem = document.createElement('div');
    starItem.className = 'star-item';
    starItem.style.left = `${left}px`;
    starItem.style.height = `${height}px`;
    starItem.style.width = `${width}px`;
    return starItem;
  }

  static get observedAttributes() {
    return ['width', 'height', 'value'];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (oldVal === newVal) return;
    this[prop] = newVal;
  }
}

customElements.define('star-items', Star);
