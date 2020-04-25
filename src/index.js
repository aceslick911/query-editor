import { API as QDSApi } from "./helpers/qds-api"

import { create as createQueryEditor } from "./components/query-editor/query-editor"
import { create as createVirtualScroll } from "./components/virtual-scroll/virtual-scroll"

import { create as createProgress } from "./components/progress/progress"

export const queryEditor = {
    create: createQueryEditor,
}

export const virtualScroller = {
    create: createVirtualScroll
}

export const progress = {
    create: createProgress
}

export const API = QDSApi