import { getAllGroupNames } from '../../../routes/groups.js'

const validateGroup = async (group) => {
	return (await getAllGroupNames()).includes(group);
}

export default validateGroup;