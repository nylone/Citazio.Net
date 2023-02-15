<template>
    <div>
        <div class="theysa-flex-col">
            <h3 class="theysa-shadow">Edit Board</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        id="bname"
                        placeholder="New title"
                        required
                        type="text"
                />
                <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                        <input id="pub" type="checkbox" style="width: auto;" value="true"/>
                        <p style="margin-bottom: 0; ">Public</p>
                </label>
                
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="EditBoard()" value="SUBMIT"/>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditBoard',
        setup() {
            
        }
    }
</script>