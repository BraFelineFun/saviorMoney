type sortType = number | string | undefined;

export default function sortByField (sortField, list){
    let sortType: sortType;
    try {
        sortType = typeof(list[0][sortField]);
    }
    catch (e) {
        return list;
    }

    if (sortType === "undefined") return list;

    if (sortType === "number") //desc sort
        return [...list].sort((a,b) => (b[sortField] - a[sortField]))

    if (sortType === "string")
        return[...list].sort((a,b) => (a[sortField].localeCompare(b[sortField])))

}
