<template>
    <div align="center">
        <h5 style="width: 50%">Board: {{ board_title }}</h5>
        <div  v-if="quotes.length > 0">
        <b-card v-for="quote in quotes" :key=quote.key  class="theysa-shadow theysa-quote-card " >
            <div v-if="quote.quote != undefined">
                <b-card-header>
                    <b-button-group >
                        <b-button :disabled="access_lvl < 1" @click="RmQuote(board_path, quote.id)" variant="text-color">Remove Quote 
                            <b-icon-trash />
                        </b-button>
                        <b-button :disabled="access_lvl < 1" @click="editquote=true; quote_id=quote.id" variant="text-color">Update Quote <b-icon-gear /></b-button>
                    </b-button-group>
                </b-card-header>
                <b-card-body >
                    <b-container fluid>
                        <b-row>
                            <b-col><p align="left"> <b> ctx </b>: {{ quote.quote.ctx }} </p></b-col>
                            <b-col><p align="right"> <b>By </b>: {{ quote.username }}</p></b-col>
                        </b-row>
                    </b-container>
                    <div v-for="phrase in quote.quote.phrases" :key="phrase.count">
                        <p v-if="phrase.by != null">{{ phrase.by }}: "{{ phrase.msg }}"</p>
                        <p v-else> *{{ phrase.msg }}*</p>
                    </div>
            </b-card-body>
            </div>
            
        </b-card>

        <editquotemodal :board_path="board_path" :quote_id="quote_id" :show="editquote" @success="refresh(); editquote=false" @close:editquote="editquote=false" />
        </div>
        <b-card align="center" class="theysa-quote-card" v-else>
            <p>No quotes to show</p>
        </b-card>
    </div>
    
    
</template>

<script>
import { GetQuotes, RmQuote } from './Quotes'
import { GetBoardUsers } from '../Boards/Boards'
import editquotemodal from '../Modals/EditQuoteModal.vue'

export default {
    name: "QuoteS",
    props: {
        board_path: {
            type: String,
            default: ""
        },
        board_title: {
            type: String,
            default: ""
        },
        update: {
            type: Boolean,
            default: false
        }
    },
    components: {
        editquotemodal
    },
    data() {
        let quotes = {}
        let quote_id = -1
        let editquote = false
        let access_lvl
        return {
            GetQuotes,
            RmQuote,
            GetBoardUsers,
            editquote,
            quote_id,
            quotes,
            access_lvl
        }
    },
    created: async function () {
        this.refresh()
        this.access_lvl = await this.GetBoardUsers(this.board_path, this.$user)
    },
    methods: {
        async refresh() {
            this.$data.quotes= await this.GetQuotes(this.$props.board_path)
        }
    },
    watch: {
        update() {
            if(this.$props.update) {
                this.refresh()
                this.$emit('done:update')
            }
        }
    }
}
</script>