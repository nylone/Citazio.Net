export function AddEditQuote(board_path, field_count, operation, id) {
    let msg
    let ctx
    let by
    let q
    let general_ctx = document.getElementById("general_ctx")?.value

    if(general_ctx === "") general_ctx = undefined 

    const d = new Date();
    let date = d.getTime();
    let quote = { phrases: [], "ctx": general_ctx, "date": date}   // Quote object

    for(let i = 1; i <= field_count; i++) {  // Iterates for each message contained in the quote 
        // Finds the values
        msg = document.getElementById(`msg-${i}`).value
        by = document.getElementById(`by-${i}`).value
        ctx = document.getElementById(`ctx-${i}`).value

        if(by === "") by=undefined
        if(ctx === "") ctx=undefined

        // Creates the quote object 
        q = {"msg": msg, "by": by, "ctx": ctx}
        quote.phrases.push(q)
    }
    let route
    if(operation === 'Add') {
        route = `${this.$path}/board/${board_path}/quotes/add`
    }
    else if(operation === 'Edit') {
        route = `${this.$path}/board/${board_path}/quote/${id}/update`
    }

    fetch(route, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"quote": quote})
    })
    .then(response => {
        if(response.status === 200) {
            this.$emit("close:AddEditQuote")
        }
    })
}

export async function GetQuotes(board_path) {
    let response = await fetch(`${this.$path}/board/${board_path}/quotes/get`, {
        method: 'GET',
        credentials: 'include'
    });
    response = await response.json()
    
    return response
}

export function RmQuote(board_path, quote_id) {
    fetch(`${this.$path}/board/${board_path}/quotes/remove`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": quote_id })
    })
    .then(response => {
        if(response.status === 200) {
            this.$emit("rmquote:success")
        }
    })
}