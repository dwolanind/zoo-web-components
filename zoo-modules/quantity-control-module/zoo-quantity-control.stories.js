import { withKnobs, boolean, text, color } from '@storybook/addon-knobs';
import { attributesGroupId, cssVariablesGroupId } from '../shared/groups';
import mdx from './zoo-quantity-control.mdx';
import { html } from 'lit-html';
import '../../docs/components';

export default {
	title: 'Docs/Quantity Control',
	component: 'zoo-quantity-control',
	decorators: [withKnobs],
	parameters: {
		docs: {
			page: mdx,
		},
	}
};

export const zooQuantityControl = () => {
	let valid = boolean('valid', true, attributesGroupId);
	let increasedisabled = boolean('increasedisabled', false, attributesGroupId);
	let decreasedisabled = boolean('decreasedisabled', false, attributesGroupId);
	let label = text('label', 'Label', attributesGroupId);
	let inputerrormsg = text('inputerrormsg', 'Value is invalid', attributesGroupId);
	let infotext = text('infotext', 'Additional information', attributesGroupId);

	let primaryMid = color('--primary-mid', '#3C9700', cssVariablesGroupId);
	return html`<zoo-quantity-control style="--primary-mid: ${primaryMid};" increasedisabled="${increasedisabled ? true : ''}"
		decreasedisabled="${decreasedisabled ? true : ''}" valid="${valid ? true : ''}" infotext="${infotext}" inputerrormsg="${inputerrormsg}">
		<input id="number-input" readOnly placeholder="0" type="number" step="50"/>
		<label for="number-input" slot="inputlabel">${label}</label>
	</zoo-quantity-control>`
};

