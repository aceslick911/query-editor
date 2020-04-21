import {create as createQueryEditor} from "./components/query-editor/query-editor"

import {create as createVirtualScroll} from "./components/virtual-scroll/virtual-scroll"

import {API as QDSApi} from "./helpers/qds-api"

export const queryEditor = {
    create: createQueryEditor,
}

export const virtualScroller = {
    create: createVirtualScroll
}

export const API = QDSApi