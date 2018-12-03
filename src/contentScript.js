chrome.storage.local.get(['hide', 'highlight', 'highlightFontFamily'],
    function(result) {
        let titles = document.getElementsByClassName("title");
        let keywordsToHide = result['hide'];
        let keywordsToHighlight = result['highlight'];
        
        let highlightFontFamily = result['highlightFontFamily'];
        
        let hideRe = new RegExp(keywordsToHide.join("|"), "i");
        let highlightRe = new RegExp(keywordsToHighlight.join("|"), "i");

        for (let title of titles) {
            if (highlightRe.test(title.textContent)) {
                for (let c of title.children) {
                    if (c.tagName === "A") {
                        c.style.fontWeight = "bold";
                        c.style.fontFamily = highlightFontFamily;
                    }
                }
            } else if (hideRe.test(title.textContent)) {
                // If something is highlighted, show it even if it passes the
                // check for hiding it
                title.addEventListener("mouseenter", function(event) {
                    showItem(event.target);
                })
                title.addEventListener("mouseleave", function(event) {
                    hideItem(event.target);
                });
                hideItem(title);
            }
        }
    }
);

function showItem(target) {
    if (target.tagName === "TD") {
        target.style.backgroundColor = "";
        for (let c of target.children) {
            c.style.visibility = "visible";
        }
    }
}

function hideItem(target) {
    if (target.tagName === "TD") {
        target.style.backgroundColor = "black"; 
        for (let c of target.children) {
            c.style.visibility = "hidden";
        }   
    }
}