import { CanvasLayer } from "../classes/layer.js";
import { createProxy } from "../helpers/proxy.js";
import { Validator } from "../utils.js";

export class AgentCanvasElement extends HTMLElement {
  static registerElement() {
    customElements.define("agent-canvas", AgentCanvasElement);
  }

  #layers = [];
  #activeLayer = null;

  #width = 300;
  #height = 200;
  #autoResize = false;

  #onWindowResize = this.#resizeToFit.bind(this);

  connectedCallback() {
    this.#createShadowRoot();
    this.createLayer("default");
    this.selectLayer("default");

    window.addEventListener("resize", this.#onWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.#onWindowResize);
  }

  get width() {
    return this.#width;
  }

  set width(value) {
    Validator.validatePositiveNumber(value);

    this.#width = value;
    this.#resizeLayers();
  }

  get height() {
    return this.#height;
  }

  set height(value) {
    Validator.validatePositiveNumber(value);

    this.#height = value;
    this.#resizeLayers();
  }

  resize(width, height) {
    Validator.validatePositiveNumber(width);
    Validator.validatePositiveNumber(height);

    this.#width = width;
    this.#height = height;
    this.#resizeLayers();
  }

  get autoResize() {
    return this.#autoResize;
  }

  set autoResize(value) {
    this.#autoResize = Boolean(value);

    if (this.#autoResize) {
      this.#resizeToFit();
    }
  }

  get layers() {
    return this.#layers;
  }

  createLayer(name, level = 0) {
    const layer = new CanvasLayer({ name, level });
    layer.resize(this.width, this.height);
    this.#layers.push(layer);
    this.#layers.sort((layerA, layerB) => layerA.level - layerB.level);
    this.#layers.forEach((layer) => this.append(layer.element));
  }

  removeLayer(name) {
    const layerToDelete = this.#findLayerByName(name);
    layerToDelete.remove();
  }

  get activeLayer() {
    return this.#activeLayer;
  }

  selectLayer(name) {
    this.#activeLayer = this.#findLayerByName(name);
    createProxy(this, this.#activeLayer.context);
  }

  clearLayer(name) {
    const layerToClear = this.#findLayerByName(name);
    layerToClear.clear();
  }

  clear() {
    for (const layer of this.#layers) {
      layer.clear();
    }
  };

  #createShadowRoot() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-grid;
          grid-template: "layers";
        }

        ::slotted(canvas) {
          grid-area: layers;
        }

        :host([hidden]) {
          display: none;
        }
      </style>
      <slot></slot>
    `;
  }

  #resizeLayers() {
    for (const layer of this.#layers) {
      layer.resize(this.#width, this.#height);
    }
  }

  #resizeToFit() {
    if (!this.autoResize) {
      return;
    }

    this.hidden = true;
    const { width, height } = this.parentElement.getBoundingClientRect();
    this.resize(width, height);
    this.hidden = false;
  };

  #findLayerByName(name) {
    return this.#layers.find((layer) => layer.name === name);
  };

}
