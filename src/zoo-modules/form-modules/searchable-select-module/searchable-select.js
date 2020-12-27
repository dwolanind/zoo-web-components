import FormElement from '../common/FormElement.js';

/**
 * @injectHTML
 */
export class SearchableSelect extends FormElement {
	constructor() {
		super();
	}
	// TODO in v9 drop nested default input and force user to define label for both select and input, while showing only legend
	static get observedAttributes() {
		return ['invalid', 'placeholder'];
	}
	handlePlaceholder(newVal) {
		const input = this.shadowRoot.querySelector('input');
		if (input && newVal) input.placeholder = newVal;
		this.inputPlaceholderFallback = newVal;
	}

	mutationCallback(mutationsList) {
		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes' && mutation.attributeName == 'disabled') {
				this.input.disabled = mutation.target.disabled;
			}
		}
	}

	connectedCallback() {
		this.input = this.shadowRoot.querySelector('input');
		this.input.addEventListener('input', () => this.handleSearchChange());
		// TODO this is not accessible
		this.shadowRoot.querySelector('zoo-cross-icon').addEventListener('click', () => {
			this.select.value = null;
			this.select.dispatchEvent(new Event('change', { bubbles: true, cancelable: false }));
		});
		this.observer = new MutationObserver(this.mutationCallback.bind(this));
		const selectSlot = this.shadowRoot.querySelector('slot[name="select"]');
		selectSlot.addEventListener('slotchange', () => {
			this.select = selectSlot.assignedElements()[0];
			this.registerElementForValidation(this.select);
			this.select.addEventListener('change', () => {
				this.handleOptionChange();
				this.valueChange();
			});
			this.select.size = 4;
			this.observer.disconnect();
			this.observer.observe(this.select, { attributes: true, childList: false, subtree: false });
			this.valueChange();
			this.slotChange();
		});

		const inputSlot = this.shadowRoot.querySelector('slot[name="input"]');
		inputSlot.addEventListener('slotchange', () => {
			this.input = inputSlot.assignedElements()[0];
			this.inputPlaceholderFallback = this.input.placeholder;
			this.input.addEventListener('input', () => this.handleSearchChange());
			this.slotChange();
		});
	}

	slotChange() {
		if (this.input && this.select) {
			this.handleOptionChange();
			this.input.disabled = this.select.disabled;
		}
	}

	valueChange() {
		this.select.value ? this.setAttribute('valueselected', '') : this.removeAttribute('valueselected');
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (SearchableSelect.observedAttributes.includes(attrName)) {
			if (attrName == 'placeholder') {
				this.handlePlaceholder(newVal);
			} else if (attrName === 'invalid') {
				const input = this.shadowRoot.querySelector('zoo-input');
				if (input) {
					if (this.hasAttribute('invalid')) {
						input.setAttribute('invalid', '');
					} else {
						input.removeAttribute('invalid');
					}
				}
			}
		}
	}

	handleSearchChange() {
		const inputVal = this.input.value.toLowerCase();
		const options = this.select.querySelectorAll('option');
		for (const option of options) {
			if (option.text.toLowerCase().indexOf(inputVal) > -1) option.style.display = 'block';
			else option.style.display = 'none';
		}
	}

	handleOptionChange() {
		let inputValString = '';
		for (const selectedOpts of this.select.selectedOptions) {
			inputValString += selectedOpts.text + ', \n';
		}
		inputValString = inputValString.substr(0, inputValString.length - 3);
		const showTooltip = inputValString && inputValString.length > 0;
		this.input.placeholder = showTooltip ? inputValString : this.inputPlaceholderFallback;
		if (showTooltip) {
			this.input.value = null;
			this.tooltip = this.tooltip || document.createElement('zoo-tooltip');
			this.tooltip.slot = 'input';
			this.tooltip.setAttribute('position', 'right');
			this.tooltip.setAttribute('text', inputValString);
			this.shadowRoot.querySelector('zoo-input').appendChild(this.tooltip);
		} else if (this.tooltip) {
			this.tooltip.remove();
		}
	}
}
window.customElements.define('zoo-searchable-select', SearchableSelect);