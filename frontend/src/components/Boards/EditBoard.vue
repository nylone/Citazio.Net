<template>
    <div>
        <b-container>
            <b-row>
                <b-col> 
                    <h3 class="theysa-shadow">Edit Board</h3>
                </b-col>
            </b-row>
            <b-row >
                
                <b-col align="center">
                    <b-form>
                        <b-form-input 
                            placeholder="New Name" 
                            type="text" 
                            id="bname" 
                            size="lg" 
                            required>
                        </b-form-input>

                        <b-form-checkbox
                        id="public"
                        v-model="status"
                        name="checkbox"
                        value="true"
                        unchecked-value="false"
                        size="lg">
                        Public
                        </b-form-checkbox>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input class="theysa-button theysa-shadow inputButton" type="submit" @click="EditBoard(board_path, status)" value="SUBMIT" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { EditBoard } from './Boards';
import {ref} from 'vue'
export default {
    name: 'EditBoard',
    props: {
        board_path: String
    },
    data() {
        let status = ref(false)
        return {
            status,
            EditBoard,
        }
    }
}
</script>