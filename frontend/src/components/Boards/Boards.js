export async function GetBoards() {
    let response = await fetch("http://localhost:3000/boards/get", {
        method: 'GET',
        credentials: 'include',
    });
    response = await response.json()
    return response
}

export function EditBoard(board_path, pub) {
    let title = document.getElementById("bname").value
    fetch(`http://localhost:3000/board/${board_path}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": title, "pub": pub })
    })
        .then(response => {
            if (response.status === 200) {
                this.$emit('close:edit')
            }
        })
}

export function AddBoard(pub) {
    let title = document.getElementById('bname').value
    let path = document.getElementById('bpath').value

    fetch("http://localhost:3000/boards/add", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": title, "path": path, "pub": pub })
    })
        .then(response => {
            if (response.status === 200) {
                this.$emit("close:addboard")
                this.$emit("close:added")
            }
        })
}


export function RmBoard(board) {
    fetch(`http://localhost:3000/board/${board.path}/remove`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(response => {
            if (response.status === 200) {
                this.$emit("rmboardsuccess")
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
        body: JSON.stringify({ "uname": uname })
    })
        .then(response => {
            if (response.status === 200) {
                this.$emit('close:transfer')
            }
        })
}

export function AddUserBoard(board_path, lvl) {
    let uname = document.getElementById("uname").value
    let access_lvl

    // checks if the lvl is a valid number
    if(lvl === null) {
        access_lvl = 0
    }
    else {
        access_lvl = lvl
    }

    fetch(`http://localhost:3000/board/${board_path}/users/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "access_lvl": access_lvl })
    })
        .then(response => {
            if (response.status === 200) {
                this.$emit('close:adduser')
            }
        })
}

export function RmUserBoard(board_path) {
    let uname = document.getElementById('user').value
    fetch(`http://localhost:3000/board/${board_path}/user/${uname}/remove`, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if(response.status === 200) {
            this.$emit('close:rmuser')
        }
    })
}