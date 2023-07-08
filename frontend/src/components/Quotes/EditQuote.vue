<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="theysa-shadow">Update Quote</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form id="form">
                        <!-- Fields -->
                        <div v-for="(phrase, index) in quote.quote.phrases" :key="phrase.key">
                            <p style="margin-top: 5px;"><b>Phrase {{ index+1 }}</b> </p>
                            <b-form-input 
                            placeholder="Context"
                            type="text"
                            size="lg"
                            :id=get_ctx_id(index+1)
                            :value=phrase.ctx
                            />
                            <b-form-input 
                            placeholder="By"
                            type="text"
                            size="lg"
                            :id=get_by_id(index+1)
                            :value=phrase.by
                            />
                            <b-form-input 
                            placeholder="Message"
                            type="text"
                            size="lg"
                            :id=get_msg_id(index+1)
                            :value=phrase.msg
                            required
                            />
                        </div>
                    </b-form>
                </b-col>
            </b-row>

            <!-- General context field -->
            <b-row>
                <b-col>
                    <b-form-input 
                    placeholder="General Context" 
                    type="text"
                    id="general_ctx" 
                    size="lg"
                    :value=quote.quote.ctx
                    required
                    />
                </b-col>
            </b-row>

            <!-- Submit button-->
            <b-row >
                <b-col align="center">
                    <input 
                    class="theysa-button theysa-shadow inputButton" 
                    type="submit" @click="AddEditQuote(board_path, count, 'Edit', quote.id)"
                    value="SUBMIT" 
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { AddEditQuote } from './Quotes'

export default {
    name: 'EditQuote',
    props: {
        board_path: {
            type: String,
            default: ''
        },
        quote: {
            type: Object
        }
    },
    data() {
        let count
        return {
            count,
            AddEditQuote
        }
    },
    methods: {
        get_msg_id(index) {
            this.count = index;
            return `msg-${index}`
        },
        get_ctx_id(index) {
            return `ctx-${index}`
        },
        get_by_id(index) {
            return `by-${index}`
        },
    },
}
</script>