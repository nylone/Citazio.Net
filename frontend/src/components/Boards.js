import { store } from './store'

export function Logout() {
    fetch("http://localhost:3000/signout", {
            method: 'POST',
        }).then(()=> {this.$logged.value = false})
}

export async function GetBoards() {
    let response = await fetch("http://localhost:3000/boards/get", {
            method: 'GET',
            credentials: 'include',
    });
    response = await response.json()
    return response
}

export function RmBoard(b) {
    let delete_path = 'http://localhost:3000/board/' + b.path + '/remove'
    fetch(delete_path, {
            method: 'POST',
            credentials: 'include',
        }).then(response => {
            if(response.status === 200) { 
                    GetBoards().then((res) => {store.boards=res; } )
                }
            }) 	
}