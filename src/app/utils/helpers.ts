function readCookie(name: string) : string {
  return document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || '' ;
}

function writeCookie(name: string, value: string) : void {
  document.cookie = `${name}=${value};path=/`;
}


export {
  readCookie,
  writeCookie,
}