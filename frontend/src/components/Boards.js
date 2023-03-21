import { store } from './store'

export async function GetBoards() {
    let response = await fetch("http://localhost:3000/boards/get", {
            method: 'GET',
            credentials: 'include',
    });
    response = await response.json()
    return response
}

export function EditBoard(board_path) {
    let title = document.getElementById("bname").value
    let pub = document.querySelector("#pub")
    fetch(`http://localhost:3000/board/${board_path}/update`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({"title": title, "pub": pub.checked})
        })
        .then(response => {
            if(response.status === 200) {
                this.$emit("close-modal") 
                GetBoards().then((res) => {store.boards=res; } )
            }
        })
}

export function RmBoard(board) {
    fetch(`http://localhost:3000/board/${board.path}/remove`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        if(response.status === 200) { 
            GetBoards().then((res) => {store.boards=res; } )
        }
    }) 	
}

export function TransferBoard(board_path) {
    let uname = document.getElementById("uname").value
    fetch(`http://localhost:3000/board/${board_path}/transfer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"uname": uname})
    })
}