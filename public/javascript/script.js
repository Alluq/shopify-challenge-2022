
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

	console.log(JSON.stringify(body));


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
		}
	}
	return body;
}