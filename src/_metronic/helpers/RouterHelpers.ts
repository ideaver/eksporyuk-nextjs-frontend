export function getCurrentUrl(pathname: string) {
  return pathname.split('#')[0];
}

export function checkIsActive(pathname: string, url: string) {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  // Check if the pathnames are the same
  const [currentPathname] = current.split('?');
  const [urlPathname] = url.split('?');
  if (currentPathname === urlPathname) {
    return true;
  }

  // Check if the current URL starts with the url
  if (current.indexOf(url) === 0) {
    return true;
  }

  return false;
}