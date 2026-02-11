// public/hop.ts
var bind = (element) => {
  element.querySelectorAll("[data-get]").forEach((el) => {
    const route = el.dataset.get;
    if (el.tagName === "BUTTON") {
      el.addEventListener("click", () => {
        fetch(el.dataset.get).then((res) => {
          if (res.status === 404) {
            throw `Route ${route} not found`;
          }
          return res.text();
        }).then((html) => {
          const dom = new DOMParser().parseFromString(html, "text/html");
          const body = dom.querySelector("body");
          body.childNodes.forEach((el2) => {
            const target = document.getElementById(el2.id);
            const attrNames = el2.getAttributeNames();
            for (let attr of attrNames) {
              const value = el2.getAttribute(attr);
              target.setAttribute(attr, value);
              target.innerHTML = el2.innerHTML;
            }
          });
        }).catch((reason) => alert(reason));
      });
    }
  });
  return element;
};
bind(document.body);
