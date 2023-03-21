<template>
    <div class="theysa-flex-col">
        <h3 class="theysa-shadow">Transfer Board</h3>
        <form id="form" action="javascript:void(0);" class="theysa-flex-col">
            <input
                    class="theysa-shadow grows"
                    id="uname"
                    placeholder="name"
                    type="text"
            />
        </form>
        <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="TransferBoard(board_path)" value="SUBMIT"/>
    </div>
</template>

<script>
import { TransferBoard } from './Boards';
    export default {
        name: 'TransferBoard',
        props: {
            board_path: String
        },
        setup() {
            return {
                TransferBoard
            }
        }

    }
</script>