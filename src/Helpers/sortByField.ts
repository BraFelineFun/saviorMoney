type sortType = number | string | undefined;

export default function sortByField (sortField: string, list: Array<any>): Array<any> {
    let sortType: sortType;
    try {
        sortType = typeof(list[0][sortField]);
    }
    catch (e) {
        return list;
    }
    switch (sortType) {
        case 'number': {
            return [...list].sort((a,b) => (b[sortField] - a[sortField]));
        }
        case 'string': {
            return[...list].sort((a,b) => (a[sortField].localeCompare(b[sortField])))
        }

        default: {
            return list;
        }
    }
}
