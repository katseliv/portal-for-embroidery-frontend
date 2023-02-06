export let updateObjectInArray = (items, itemId, objectPropName, newObjectProps) => {
    return items.map(item => {
        if (item[objectPropName] === itemId) {
            return {...item, ...newObjectProps}
        }
        return item;
    })
}