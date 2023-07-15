<template>
    <div align="center">
        <h5 style="width: 50%; margin-top: 5px;">Board: {{ board_title }}</h5>
        <div  v-if="quotes.length > 0">
        <b-card v-for="(quote, quote_index) in quotes" :key=quote.key  class="theysa-shadow theysa-quote-card " >
            <div v-if="quote.quote != undefined">
                <b-card-header>
                    <b-button-group >
                        <b-button :disabled="access_lvl < 2 && quote.username != user" @click="Remove_quote(quote)"> <p>Remove Quote </p>
                            <b-icon-trash />
                        </b-button>
                        <b-button :disabled="access_lvl < 1 || quote.username!= user" @click="editquote=true; curr_quote=quote"> <p>Update Quote</p> <b-icon-gear /></b-button>
                    </b-button-group>
                </b-card-header>
                <b-card-body >
                    <b-container fluid>
                        <b-row>
                            <b-col v-if="quote.quote.ctx != undefined "><p align="left" > <b> ctx </b>: {{ quote.quote.ctx }} </p></b-col>
                            <b-col><p align="right"> <b>By </b>: {{ quote.username }}</p></b-col>
                        </b-row>
                    </b-container>
                    <div v-for="(phrase, phrase_index) in quote.quote.phrases" :key="phrase.count">
                        <div :id="`phrase-${(quote_index+phrase_index)+1}`">
                            <p v-if="phrase.by != null">{{ phrase.by }}: "{{ phrase.msg }}"</p>
                            <p v-else> *{{ phrase.msg }}*</p>
                        </div>
                        <p align="right">{{ convert_time_toISO(quote.quote.date) }}</p>
                        <b-tooltip
                         v-if="phrase.ctx?.replace(/\s/g, '').length"
                         :target="`phrase-${(quote_index+phrase_index)+1}` "
                         trigger="focus"
                         >
                         {{ phrase.ctx }}
                        </b-tooltip>
                    </div>
            </b-card-body>
            </div>
            
        </b-card>

        <editquotemodal :board_path="board_path" :quote="curr_quote" :show="editquote" @success="refresh(); editquote=false" @close:AddEditQuote="editquote=false" />
        <confirmmodal :show=remove @close:No="remove=false" @close:Yes="RmQuote(board_path, quote_id); $emit('reload'); remove=false" />
    </div>
        <b-card align="center" class="theysa-quote-card" v-else>
            <p>No quotes to show</p>
        </b-card>
    </div>
    
    
</template>

<script>
import { GetQuotes, RmQuote } from './Quotes'
import { GetUserAccessLvl } from '../Boards/Boards'
import { get_session_info, convert_time_toISO } from '../User/user'
import editquotemodal from '../Modals/EditQuoteModal.vue'
import confirmmodal from '../Modals/ConfirmModal.vue'

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
        editquotemodal,
        confirmmodal
    },
    data() {
        let quotes = {}
        let quote_id = -1
        let editquote = false
        let user
        let remove = false
        let curr_quote
        let access_lvl
        return {
            editquote,
            user,
            remove,
            curr_quote,
            quote_id,
            quotes,
            access_lvl,
            GetQuotes,
            RmQuote,
            GetUserAccessLvl,
            get_session_info,
            convert_time_toISO,
        }
    },
    created: async function () {
        this.refresh()
        this.user = (await this.get_session_info()).username
        if(!this.user) this.user = ''
        this.access_lvl = await this.GetUserAccessLvl(this.board_path, this.user)
        history.replaceState(null, null, `#/quotes?path=${this.board_path}`)
    },
    methods: {
        async refresh() {
            this.$data.quotes= await this.GetQuotes(this.$props.board_path)
        },
        Remove_quote(quote) {
            this.quote_id = quote.id
            this.remove=true
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