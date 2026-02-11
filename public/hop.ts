const bind = (element: HTMLElement) => {    
    element.querySelectorAll("[data-get]").forEach((el: any) => {
        
        const route = el.dataset.get;
        if(el.tagName === "BUTTON") {
            el.addEventListener("click", () => {
                fetch(el.dataset.get)
                .then(res => {

                    if(res.status === 404){
                        throw `Route ${route} not found`
                    }

                    return res.text()
                })
                .then(html => {
                    const dom = new DOMParser().parseFromString(html, "text/html");
                    const body = dom.querySelector('body');
                    
                    body.childNodes.forEach((el: HTMLElement) => {

                        const target = document.getElementById(el.id);
                        const attrNames = el.getAttributeNames();
                        
                        for(let attr of attrNames){                           
                            const value = el.getAttribute(attr)
                            target.setAttribute(attr, value);
                            target.innerHTML = el.innerHTML;
                        }

                        
                        
                    })
                })
                .catch((reason: any) => alert(reason))
            })
        }
    })
    return element;
}

bind(document.body)