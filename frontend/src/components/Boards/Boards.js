export async function GetBoards() {
    let response = await fetch(`${this.$path}/boards/get`, {
        method: 'GET',
        credentials: 'include',
    });
    response = await response.json()
    return response
}

export async function EditBoard(board_path, pub) {
    let title = document.getElementById("bname").value
    let body
    if (title !== "") body= JSON.stringify({"pub": pub, "title": title})
    else body = JSON.stringify({"pub": pub})

    let response = await fetch(`${this.$path}/board/${board_path}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    })
    if (response.status === 200) {
        this.$emit('close:edit')
        return true
    }
    else {
        return false
    }
}

export async function AddBoard(pub) {
    let title = document.getElementById('bname').value
    let path = document.getElementById('bpath').value

    let response = await fetch(`${this.$path}/boards/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "title": title, "path": path, "pub": pub })
    })
    if (response.status === 200) {
        this.$emit("close:addboard")
        this.$emit("added")
        return null
    }
    else {
        return false
    }
}


export function RmBoard(board) {
    fetch(`${this.$path}/board/${board.path}/remove`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(response => {
        if (response.status === 200) {
            this.$emit("reload")
        }
    })
}

export async function TransferBoard(board_path) {
    let uname = document.getElementById("uname").value
    let response = await fetch(`${this.$path}/board/${board_path}/transfer`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname })
    })
    if (response.status === 200) {
        this.$emit('close:transfer')
        return null
    }
    else {
        return false;
    }
}

export async function AddUserBoard(board_path, lvl, uname) {
    let access_lvl = lvl

    let response = await fetch(`${this.$path}/board/${board_path}/users/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "uname": uname, "access_lvl": access_lvl })
    })
    if(response.status === 200) {
        this.$emit('close:AddEdituser')
        return null
    }
    else {
        return false
    }
}

export async function RmUserBoard(board_path, uname) {
    let response = await fetch(`${this.$path}/board/${board_path}/user/${uname}/remove`, {
        method: 'POST',
        credentials: 'include'
    })
    if(response.status === 200) {
        this.$emit('close:rmuser')
        return null
    }
    else {
        return false
    }
}


export async function EditUserBoard(board_path, access_lvl, uname) {
    let response = await fetch(`${this.$path}/board/${board_path}/user/${uname}/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"access_lvl": access_lvl })
    })
    if(response.status === 200) {
        this.$emit('close:AddEdituser')
        return null
    }
    else {
        return false
    }
}


export async function GetUserAccessLvl(board_path, user) {
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
        if(usersmap.get(user)) {
            return users.find(o => o.username === user).access_lvl
        }
        else {
            return 0
        }
    }

}

export async function GetBoardUsers(board_path) {
    let users = await fetch(`${this.$path}/board/${board_path}/users/get`, {
        method: 'GET',
        credentials: 'include',
    })
    users = await users.json()
    let levels = ["Read-Only", "Read/Write", "Admin"]
    let usersmap = users.map(e => {
        return {
            value: e.username,
            text: `${e.username} (lvl: ${levels[e.access_lvl]})`
        }
    });


    return usersmap
}

export async function GetBoardExternalUsers(board_path) {
    let boardUsers = await fetch(`${this.$path}/board/${board_path}/users/get`, {
        method: 'GET', 
        credentials: 'include',
    })
    let globalUsers = await fetch(`${this.$path}/users/get`, {
        method: 'GET',
        credentials: 'include',
    })
      
    boardUsers = await boardUsers.json()
    globalUsers = await globalUsers.json()
        
    const boardUserSet = new Map(boardUsers.map(e => [e.username, true]));
        
    let usersmap = globalUsers.filter(e => !boardUserSet.get(e.username)).map(e => {
        return {
            value: e.username,
            text: `${e.username}`    
        }
    });

    return usersmap    
}
