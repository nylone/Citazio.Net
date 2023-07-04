export async function GetBoards() {
    let response = await fetch(`${this.$path}/boards/get`, {
        method: 'GET',
        credentials: 'include',
    });
    response = await response.json()
    return response
}

export function EditBoard(board_path, pub) {
    let title = document.getElementById("bname").value
    let body
    if (title !== "") body= JSON.stringify({"pub": pub, "title": title})
    else body = JSON.stringify({"pub": pub})

    fetch(`${this.$path}/board/${board_path}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
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

    fetch(`${this.$path}/boards/add`, {
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
                return true
            }
            else {
                return false
            }
        })

    return false
}


export function RmBoard(board) {
    fetch(`${this.$path}/board/${board.path}/remove`, {
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
    fetch(`${this.$path}/board/${board_path}/transfer`, {
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
                return true
            }
            else {
                return false;
            }
        })
    return false
}

export function AddUserBoard(board_path, lvl) {
    let uname = document.getElementById("uname").value
    let access_lvl = lvl

    fetch(`${this.$path}/board/${board_path}/users/add`, {
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
                return true
            }
            else {
                return false
            }
        })
    return false
}

export function RmUserBoard(board_path) {
    let uname = document.getElementById('user').value
    fetch(`${this.$path}/board/${board_path}/user/${uname}/remove`, {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => {
        if(response.status === 200) {
            this.$emit('close:rmuser')
        }
    })
}


export async function GetBoardUsers(board_path, user) {
    let users = await fetch(`${this.$path}/board/${board_path}/users/get`, {
        method: 'GET',
        credentials: 'include',
    })
    users = await users.json();
    if(users === null) {
        return 0
    }
    else {
        let usersmap = new Map(users.map(e => [e.username, true]))
        if(usersmap.get(user.value)) {
            return users.find(o => o.username === user.value).access_lvl
        }
        else {
            return 0
        }
    }

}