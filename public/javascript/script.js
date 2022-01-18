

const createItem = async (id) => {
	
	const form = document.getElementById(id).children;

	const body = getFormData(form);

	const hostname = 'http://' + window.location.host + '/items';

	const res = await fetch(hostname, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	window.location.reload();
}

const deleteItem = async (itemId) => {
	const hostname = 'http://' + window.location.host + '/items/' + itemId;
	const res = await fetch(hostname, {
		method: "DELETE"
	});
	window.location.reload();
}

const updateItem = async (id) => {



	const form = document.getElementById(id).children;

	const body = getFormData(form);

	const hostname = window.location.href;

	const res = await fetch(hostname, {
		method: "PUT",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
	window.location.reload();

}

const getFormData = (form) => {
	let body = {};
	for(const i in form){
		const child = form[i];
		if(!(child instanceof HTMLElement)){
			break;
		}
		if(child.nodeName == 'INPUT' && child.getAttribute('name')){
			body[child.getAttribute('name')] = child.value;
		} else if (child.nodeName == 'SELECT' && child.getAttribute('name')){
			let selectedOptions = [];
			const options = child.children;
			for(const i in options){
				const option = options[i];
				if(!(option instanceof HTMLElement)){
					break;
				}
				if(option.selected && option.getAttribute('name')){
					selectedOptions.push(option.getAttribute('name'));
				}
			}
			body[child.getAttribute('name')] = selectedOptions;
		}
	}
	return body;
}