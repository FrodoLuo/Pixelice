export function queryParse(query) {
  console.log(query);
  const pattern = new RegExp('^\\?(.+=.*&)*(.+=.*)$');
  if (pattern.test(query)) {
    const slices = query.slice(1).split('&');
    const result = {};
    for (const item of slices) {
      const name = item.split('=')[0];
      const value = item.split('=')[1];
      result[name] = value;
    }
    return result;
  } else {
    return null;
  }
}
