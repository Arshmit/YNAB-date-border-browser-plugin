function applyTopBorders(){
    // fetch a list of all the date elements
    let dateElementsOnAccountPage = document.querySelectorAll('.ynab-grid-cell-date.user-data')
    // start from 1 instead of 0, because we compare current date with previous date to decide if we want to draw a top border
    for(let i = 1; i < dateElementsOnAccountPage .length; i++){
        if(dateElementsOnAccountPage[i-1].innerHTML.trim() !== dateElementsOnAccountPage [i].innerHTML.trim()){
            dateElementsOnAccountPage[i].parentElement.style.borderTop = '2px solid #405163'
        }
    }
}

function observeDateChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    // every time a new node is added to the DOM tree
                    // Checks if the node is an element node
                    if (node.nodeType === 1) {
                        // reapply all the borders 
                        if (node.classList.contains('ynab-grid-cell-date')) {
                            applyTopBorders()
                        }
                    }
                })
            }
        })
    })

    const config = {
        childList: true,
        subtree: true
    };

    observer.observe(document.body, config)
}

applyTopBorders()
observeDateChanges()
console.info('YNAB Date Borders plugin loaded successfully!')