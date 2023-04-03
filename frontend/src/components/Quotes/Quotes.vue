<template>
    <div align="center">
        <b-card no-body v-for="quote in quotes" :key=quote.name  class="theysa-shadow theysa-quote-card " >
            <b-card-header header-border-variant="white"  header-bg-variant="white">
                <b-container fluid>
                    <b-row>
                        <b-col><p align="left">ctx: {{ quote.quote.ctx }} </p></b-col>
                        <b-col><p align="right">By: {{ quote.username }}</p></b-col>
                    </b-row>
                    
                </b-container>
                
                
            </b-card-header>
            <b-card-body>
                <p v-for="phrase in quote.quote.phrases" :key="phrase.count">
                    Msg: "{{ phrase.msg }}"
                </p>
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
        }
    },
    data() {
        let quotes
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