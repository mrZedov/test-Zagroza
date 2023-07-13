export interface SearchQuery {
  page?: number;
  itemsPerPage?: number;
  sortBy?: string | string[];
  [k: string]: any;
}

export interface SearchQueryOptions {
  fieldsMap?: {
    [name: string]: string;
  };
  constraints?: {
    [name: string]: {
      type?: 'string' | 'number' | 'boolean' | Type<Date>;
      condition?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'range' | 'startWith' | 'contains' | 'nin' | 'inString';
      orderOnly?: boolean;
    };
  };
}

interface Type<T = any> {
  new (): T;
}

export type ParsedSearchQuery = { where: any; options: { offset: number; limit: number; orderBy: any } };

export class SearchQueryParser {
  parse<Q extends SearchQuery>(query: Q, options?: SearchQueryOptions): ParsedSearchQuery {
    let { page = 1, itemsPerPage = 20, sortBy } = query;
    if (page < 0) page = 1;
    if (itemsPerPage <= 0) itemsPerPage = 20;
    if (sortBy === undefined) sortBy = [];
    else if (!Array.isArray(sortBy)) sortBy = [sortBy];

    const limit = itemsPerPage;
    const offset = (page - 1) * itemsPerPage;

    let orderBy = {};
    sortBy.forEach((v: string) => {
      let [f, o = 'asc'] = v.split(':');
      if (options?.constraints && options.constraints[f] === undefined) return;
      if (options?.fieldsMap && options.fieldsMap[f] !== undefined) {
        f = options.fieldsMap[f];
      }
      orderBy[f] = o == 'asc' ? 1 : -1;
    });

    const where = {};
    Object.keys(query)
      .filter((k) => {
        return k !== 'page' && k !== 'itemsPerPage' && k !== 'sortBy' && options?.constraints?.[k] !== undefined && !options.constraints[k].orderOnly;
      })
      .forEach((k) => {
        const condition = options.constraints[k].condition || 'eq';
        const name = options?.fieldsMap?.[k] || k;
        if (condition === 'range') {
          const [from, to] = query[k];
          where[name] = { $gte: from, $lte: to };
        } else if (condition === 'startWith') {
          where[name] = new RegExp(`^${query[k]}\\w`,`i`);
        } else if (condition === 'in' && !Array.isArray(query[k])) {
          where[name] = { [`$in`]: [query[k]] };
        } else if (condition === 'nin' && !Array.isArray(query[k])) {
          where[name] = { [`$nin`]: [query[k]] };
        } else {
          where[name] = { [`\$${condition}`]: query[k] };
        }
      });

    return { where: where, options: { limit, offset, orderBy } };
  }
}
