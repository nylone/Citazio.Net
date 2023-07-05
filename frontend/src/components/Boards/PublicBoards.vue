<template >
    <div v-if="boards.length > 0 && (typeof boards != undefined)">
        <b-container fluid>
            <b-row cols="1" cols-md="3" align-h="center" align-content="center">
                <b-col style="max-width: 350px; margin-top: 10px;" col v-for="board in boards" :key="board.name">
                    <b-card class="theysa-shadow theysa-border">
                        <b-card-header class="theysa-card-actions" align="right">
                            <b-dropdown disabled id="dropdown-dropup" dropup variant="text-color" no-caret
                                toggle-class="text-decoration-none border-light: white">
                                <template #button-content >
                                    <b-icon-list style="border: none"/>
                                </template>
                            </b-dropdown>

                        </b-card-header>
                        <a href="#/quotes" @click="$emit('onpath', board.path, board.title)" style="margin:5px">
                            <b-card-title>
                                {{ board.title }}
                            </b-card-title>
                        </a>
                        <b-card-footer align="left" class="theysa-card-footer">
                            <b-row>
                                <b-col>
                                    <p> <b> Owner </b>: {{ board.owner }}</p>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <p><b> Last Update: </b></p>
                                    <p v-if="board.last_updated != ''"> {{ board.last_updated }}</p>
                                    <p v-else> None</p>
                                </b-col>
                            </b-row>

                        </b-card-footer>
                    </b-card>

                </b-col>
            </b-row>

        </b-container>

    </div>

    <div v-else>
        <center>
            <p>No Boards to show</p>
        </center>
    </div>
</template>
<script>
import { ref } from 'vue'
export default {
    name: 'PublicBoards',
    props: {
        boards: {
            type: Array,
            required: true,
            default() {
                return []
            }
        }
    },
    data() {
        let path = ref(" ")
        return {
            path,
        }
    },
}
</script>