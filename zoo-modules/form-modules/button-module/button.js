class Button extends HTMLElement {
	constructor() {
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
		<style>
		:host {
			display: flex;
			max-width: 330px;
			min-height: 36px;
			position: relative;
		}
		
		::slotted(button) {
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			border: 0;
			border-radius: 5px;
			cursor: pointer;
			width: 100%;
			min-height: 100%;
			font-size: 14px;
			line-height: 20px;
			font-weight: bold;
			text-align: center;
			background: linear-gradient(to right, var(--primary-mid, #3C9700), var(--primary-light, #66B100));
		}
		
		::slotted(button:hover), ::slotted(button:focus) {
			background: var(--primary-mid, #3C9700);
		}
		
		::slotted(button:active) {
			background: var(--primary-dark, #286400);
			transform: translateY(1px);
		}
		
		::slotted(button:disabled) {
			background: #F2F3F4 !important;
			color: #767676 !important;
			border: 1px solid #E6E6E6 !important;
			cursor: not-allowed;
			transform: translateY(0);
		}
		
		:host([type="secondary"]) ::slotted(button) {
			background: linear-gradient(to right, var(--secondary-mid, #FF6200), var(--secondary-light, --int-secondary-light));
		}
		
		:host([type="secondary"]) ::slotted(button:hover), :host([type="secondary"]) ::slotted(button:focus) {
			background: var(--secondary-mid, #FF6200);
		}
		
		:host([type="secondary"]) ::slotted(button:active) {
			background: var(--secondary-dark, #CC4E00);
		}
		
		:host([type="hollow"]) ::slotted(button) {
			border: 2px solid var(--primary-mid, #3C9700);
			color: var(--primary-mid, #3C9700;
			background: transparent;
		}
		
		:host([type="hollow"]) ::slotted(button:hover), :host([type="hollow"]) ::slotted(button:focus), :host([type="hollow"]) ::slotted(button:active) {
			color: white;
			background: var(--primary-mid, #3C9700);
		}
		
		:host([type="hollow"]) ::slotted(button:active) {
			background: var(--primary-dark, #286400);
		}
		
		:host([type="empty"]) ::slotted(button) {
			color: initial;
			background: transparent;
		}
		
		:host([type="empty"]) ::slotted(button:hover), :host([type="empty"]) ::slotted(button:focus) {
			background: #E6E6E6;
		}
		
		:host([size="medium"]) {
			min-height: 46px;
		}
		</style>
		<slot></slot>`;
	}

	static get observedAttributes() {
		return ['type'];
	}

	get type() {
		return this.getAttribute('type');
	}

	set type(type) {
		this.setAttribute('type', type);
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (attrName == 'type') {
		}
	}
}
window.customElements.define('zoo-button', Button);