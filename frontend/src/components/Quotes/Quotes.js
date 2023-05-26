export function AddQuote(board_path, field_count) {
    let text = document.getElementById("msg-1").value
    let context = document.getElementById("ctx").value
    let general_ctx = context
    const d = new Date();
    let time = d.getTime();
    let quote = {
        phrases: [
            {
                msg: text,
                by: this.$user.value,
                ctx: context,
            }
        ],
        ctx: general_ctx,
        date: time
    }
    if(field_count > 1) {
        for(let i = 2; i <= field_count; i++) {
            let additional_text = document.getElementById(`msg-${i}`).value
            quote.phrases.push({msg: additional_text})
        }
    }

    fetch(`${this.$path}/board/${board_path}/quotes/add`, {
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
            this.$emit("close:addquote")
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

export function UpdateQuote(board_path, field_count, quote_id) {
    let ctx = document.getElementById("ctx").value
    let msg1 = document.getElementById("msg-1").value
    const d = new Date();
    let time = d.getTime();
    let quote = {
        phrases: [
            {
                msg: msg1,
                by: this.$user.value,
                ctx: ctx,
            }
        ],
        ctx: ctx,
        date: time
    }
    if(field_count > 1) {
        for(let i = 2; i <= field_count; i++) {
            let additional_text = document.getElementById(`msg-${i}`).value
            quote.phrases.push({msg: additional_text})
        }
    }

    fetch(`${this.$path}/board/${board_path}/quotes/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"quote": quote, "id": quote_id})
    })
    .then(response => {
        if(response.status === 200) {
            this.$emit("editquote:success")
        }
    })
}

