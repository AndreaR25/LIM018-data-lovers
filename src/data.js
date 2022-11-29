export function producerFilter(data, name) {
  return data.filter(p => p.producer === name);
}

export function directorFilter(data, name) {
  return data.filter(d => d.director === name);
}

export function titleFilter(data, name) {
  return data.filter(d => d.title.toLowerCase().indexOf(name) != -1);
}

export function idFilter(data, valueId) {
  return data.filter(d => d.id.indexOf(valueId) != -1);
}


export const nameOrder = (data) => {
  return data.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    // return 0;
  });
};