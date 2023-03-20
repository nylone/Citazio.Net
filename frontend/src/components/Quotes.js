export function AddQuote(board_path) {
    let text = document.getElementById("quote").value
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

    let path = 'http://localhost:3000/board/' + board_path + '/quotes/add'
    fetch(path, {
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
            this.$emit("close-modal")
        }
    })
}