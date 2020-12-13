describe('Zoo paginator', function () {
	it('should create default grid', async () => {
		const rowsLength = await page.evaluate(() => {
			document.body.innerHTML = `
			<zoo-grid currentpage="3" maxpages="20" reorderable stickyheader>
				<zoo-grid-header slot="headercell" sortable="true" sortableproperty="createdDate">Created date</zoo-grid-header>
				<zoo-grid-header slot="headercell" sortable="true" sortableproperty="minWeight">Min weight</zoo-grid-header>
				<zoo-grid-header slot="headercell">Price</zoo-grid-header>
		
				<div slot="row"><div>2020-05-05</div><div>30 kg</div><div>20 EUR</div></div>
				<div slot="row"><div>2020-05-10</div><div>23 kg</div><div>15 EUR</div></div>
				<div slot="row"><div>2020-05-15</div><div>10 kg</div><div>5 EUR</div></div>
		
				<zoo-select labelposition="left" slot="pagesizeselector">
					<select id="grid-page-size" slot="select">
						<option selected>5</option>
						<option>10</option>
						<option>25</option>
					</select>
					<label for="grid-page-size" slot="label">Page Size</label>
				</zoo-select>
			</zoo-grid>
			`;
			const grid = document.querySelector('zoo-grid');
			const rows = grid.shadowRoot.querySelector('*[name="row"]').assignedElements();
			return rows.length;
		});
		expect(rowsLength).toEqual(3);
	});

	it('should remove sort state from previously sorted header', async () => {
		const ret = await page.evaluate(async () => {
			document.body.innerHTML = `
			<zoo-grid currentpage="3" maxpages="20" reorderable stickyheader>
				<zoo-grid-header slot="headercell" sortable="true" sortableproperty="createdDate">Created date</zoo-grid-header>
				<zoo-grid-header slot="headercell" sortable="true" sortableproperty="minWeight">Min weight</zoo-grid-header>
		
				<div slot="row">
					<div>2020-05-05</div>
					<div>30 kg</div>
				</div>
			</zoo-grid>
			`;
			const firstHeader = document.querySelector('zoo-grid-header');
			const arrow = firstHeader.shadowRoot.querySelector('zoo-arrow-icon');
			arrow.dispatchEvent(new Event('click'));
			await new Promise(r => setTimeout(r, 10));

			const firstHeaderFirstSortState = firstHeader.getAttribute('sortstate');

			const secondHeader = document.querySelectorAll('zoo-grid-header')[1];
			const secondArrow = secondHeader.shadowRoot.querySelector('zoo-arrow-icon');
			secondArrow.dispatchEvent(new Event('click'));
			await new Promise(r => setTimeout(r, 10));

			const firstHeaderSecondSortState = firstHeader.getAttribute('sortstate');
			const secondHeaderSortState = secondHeader.getAttribute('sortstate');
			return {
				firstHeaderFirstSortState: firstHeaderFirstSortState,
				firstHeaderSecondSortState: firstHeaderSecondSortState,
				secondHeaderSortState: secondHeaderSortState
			};
		});
		expect(ret.firstHeaderFirstSortState).toEqual('desc');
		expect(ret.firstHeaderSecondSortState).toEqual(null);
		expect(ret.secondHeaderSortState).toEqual('desc');
	});
});