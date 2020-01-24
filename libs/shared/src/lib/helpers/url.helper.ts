export function getQueryParam(prop): any {
  const params = {};
  const search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  const definitions = search.split('&');
  definitions.forEach(function (val, key) {
    const parts = val.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return (prop && prop in params) ? params[prop] : params;
}

// url encode-decode
export function encodeURI(string): string {
  return encodeURIComponent(string);
}

export function decodeURI(string): string {
  return decodeURIComponent(string);
}
