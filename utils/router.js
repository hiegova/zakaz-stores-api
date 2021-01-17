const routesMap = {};

function addRoute(method, path, callback) {
  // routesMap[method][path] = callback;

  const pathParts = path.split('/').reverse();
  console.log("🚀 ~ file: router.js ~ line 7 ~ addRoute ~ pathParts", pathParts)

  let link = null;
  for (const part of pathParts) {
    
    link = {
      name: part,
      isParam: part[0] === ':',
      [part]: link,
    };
  }

  return link
}

const result = addRoute('GET', '/')
// const result = addRoute('GET', '/user/order/:id')
console.log("🚀 ~ file: router.js ~ line 22 ~ result", result)

function parsePath(path) {}
