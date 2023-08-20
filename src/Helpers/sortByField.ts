import stringToDate from "./stringToDate";

type sortType = number | string | undefined;
type GenericObject = { [key: string]: any };
type castTypes = 'Date';

/*function accepts array of objects of any type
* sortField is name of field in object
* return sortedArray
* */
export default function sortByField<T extends GenericObject> (sortField: string, list: Array<T>, castType?: castTypes): Array<T> {
    let fieldType: sortType;
    fieldType = typeof(list[0][sortField]);

    switch (fieldType) {
        case 'number': {
            return [...list].sort((a: T,b: T) => (b[sortField] - a[sortField]));
        }
        case 'string': {
            if (!!castType && castType === 'Date') {
                return[...list].sort((a,b) => (stringToDate(b[sortField]).valueOf() - (stringToDate(a[sortField])).valueOf()))
            }
            return[...list].sort((a,b) => (a[sortField].localeCompare(b[sortField])))
        }

        default: {
            return list;
        }
    }
}
