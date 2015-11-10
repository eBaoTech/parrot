/**
 * Created by brad.wu on 8/16/2015.
 */
(function () {
	var model = $pt.createModel({
		nodes: [
			{
				id: 1,
				text: 'Languages',
				children: [
					{id: 2, text:'Java'},
					{id: 3, text:'C#'}
				]
			}, {
				id: 4,
				text: 'Costing',
				children: [
					{id: 5, text: '1,000'},
					{id: 6, text: '2,000'}
				]
			}, {
				id: 7,
				text: 'Others',
				folder: true
			}
		]
	});
	var tree = $pt.createCellLayout('nodes', {
		label: 'Plain Text',
		comp: {
			type: $pt.ComponentConstants.Tree,
			root: 'Hello',
			check: 'selected',
			hierarchyCheck: true,
			expandLevel: 1
		},
		pos: {row: 1, col: 1}
	});

	var button = $pt.createCellLayout('button', {
		label: 'Click',
		comp: {
			click: function(model) {
				model.set('nodes', model.getOriginalModel().nodes.slice(0));
			}
		}
	});
	var panel = (<div className='row'>
		<div className='col-md-3 col-lg-3 col-sm-3'>
			<span>Tree</span>
			<NTree model={model} layout={tree}/>
		</div>
		<div className='col-md-3 col-lg-3 col-sm-3'>
			<NFormButton model={model} layout={button} />
		</div>
	</div>);
	React.render(panel, document.getElementById('main'));
})();
