class SuperMannerist extends HTMLElement {
  constructor() {
    super();

    const wrapper = document.querySelector("#super-mannerist");
    const clone = document.importNode(wrapper.content, true);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(clone);
  }
}

// Define the new element
customElements.define("super-mannerist", SuperMannerist);
