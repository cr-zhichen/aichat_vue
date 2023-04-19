<script setup>

import {useDark, useToggle} from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>

    <router-link to="/">首页</router-link>
    <router-view/>
    <div>
        <button @click="toggleDark()">
            <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
    </div>

</template>

<style scoped>

</style>
