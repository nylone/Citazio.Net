<template>
    <div align="center">
        <h5 style="width: 50%; margin-top: 5px;">Board: {{ board_title }}</h5>
        <div  v-if="quotes.length > 0">
        <b-card v-for="quote in quotes" :key=quote.key  class="theysa-shadow theysa-quote-card " >
            <div v-if="quote.quote != undefined">
                <b-card-header>
                    <b-button-group >
                        <b-button :disabled="access_lvl < 1" @click="RmQuote(board_path, quote.id)"> <p>Remove Quote </p>
                            <b-icon-trash />
                        </b-button>
                        <b-button :disabled="access_lvl < 1" @click="editquote=true; curr_quote=quote"> <p>Update Quote</p> <b-icon-gear /></b-button>
                    </b-button-group>
                </b-card-header>
                <b-card-body >
                    <b-container fluid>
                        <b-row>
                            <b-col v-if="quote.quote.ctx != undefined "><p align="left" > <b> ctx </b>: {{ quote.quote.ctx }} </p></b-col>
                            <b-col><p align="right"> <b>By </b>: {{ quote.username }}</p></b-col>
                        </b-row>
                    </b-container>
                    <div v-for="(phrase, index) in quote.quote.phrases" :key="phrase.count">
                        <p :id=get_phrase_id(index) v-if="phrase.by != null">{{ phrase.by }}: "{{ phrase.msg }}"</p>
                        <p :id="get_phrase_id(index)" v-else> *{{ phrase.msg }}*</p>

                        <b-tooltip
                         v-if="phrase.ctx != '' "
                         :target=get_phrase_id(index)
                         trigger="focus"
                         >
                         {{ phrase.ctx }}
                        </b-tooltip>
                    </div>
            </b-card-body>
            </div>
            
        </b-card>

        <editquotemodal :board_path="board_path" :quote="curr_quote" :show="editquote" @success="refresh(); editquote=false" @close:AddEditQuote="editquote=false" />
        </div>
        <b-card align="center" class="theysa-quote-card" v-else>
            <p>No quotes to show</p>
        </b-card>
    </div>
    
    
</template>

<script>
import { GetQuotes, RmQuote } from './Quotes'
import { GetUserAccessLvl } from '../Boards/Boards'
import { get_session_info } from '../User/user'
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
        let curr_quote
        let access_lvl
        return {
            editquote,
            curr_quote,
            quote_id,
            quotes,
            access_lvl,
            GetQuotes,
            RmQuote,
            GetUserAccessLvl,
            get_session_info,
        }
    },
    created: async function () {
        this.refresh()
        let user= (await this.get_session_info()).username
        this.access_lvl = await this.GetUserAccessLvl(this.board_path, user)
        history.replaceState(null, null, `#/quotes?path=${this.board_path}`)
    },
    methods: {
        async refresh() {
            this.$data.quotes= await this.GetQuotes(this.$props.board_path)
        },
        get_phrase_id(index) {
            return `phrase-${index}`
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