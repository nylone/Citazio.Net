export let quotes;
export function AddQuote(board_path, field_count) {
    let text = document.getElementById("msg").value
    let context = document.getElementById("ctx").value
    let general_ctx = "test"
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
        for(let i = 1; i < field_count; i++) {
            let additional_text = document.getElementById(`msg${i}`).value
            quote.phrases.push({msg: additional_text})
        }
    }

    fetch(`http://localhost:3000/board/${board_path}/quotes/add`, {
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
    let response = await fetch(`http://localhost:3000/board/${board_path}/quotes/get`, {
        method: 'GET',
        credentials: 'include'
    });
    response = await response.json()
    console.log(response[0].quote.phrases[0])
    
    return response
}

