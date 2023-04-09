<template>
    <div align="center">
        <h5 style="width: 50%">Board: {{ board_title }}</h5>
        <b-card no-body v-for="quote in quotes" :key=quote.name  class="theysa-shadow theysa-quote-card " >
            <b-card-body v-if="quote.quote != undefined">
                <b-container fluid>
                    <b-row>
                        <b-col><p align="left">ctx: {{ quote.quote.ctx }} </p></b-col>
                        <b-col><p align="right">By: {{ quote.username }}</p></b-col>
                    </b-row>
                </b-container>
                <div v-for="phrase in quote.quote.phrases" :key="phrase.count">
                    <p v-if="phrase.by != null">{{ phrase.by }}: "{{ phrase.msg }}"</p>
                    <p v-else> *{{ phrase.msg }}*</p>
                    
                    
                </div>
            </b-card-body>
        </b-card>
    </div>
    
</template>

<script>
import { GetQuotes } from './Quotes'

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
        }
    },
    data() {
        let quotes = {}
        return {
            GetQuotes,
            quotes
        }
    },
    created: async function () {
        this.$data.quotes= await GetQuotes(this.$props.board_path)
    }
}
</script>