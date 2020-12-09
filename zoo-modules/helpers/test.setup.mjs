import puppeteer from 'puppeteer';
import jasmine from 'jasmine';
import axe from 'axe-core';

beforeAll(async () => {
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
	global.browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox']
	});
	global.page = await global.browser.newPage();
	await global.page.goto('http://localhost:5000');
});

beforeEach(async () => {
	global.axeHandle = await global.page.evaluateHandle(`${axe.source}`);
});

afterEach(async () => {
	await global.page.evaluate(() => document.body.innerHTML = '');
});

afterAll(async () => {
	await global.axeHandle ? global.axeHandle.dispose() : new Promise(res => res());
	await global.browser.close();
});