import { Bounds } from './Bounds'
import { Geometry } from './Geometry'
import { Node } from './Node'
import { Tags } from './Tags'
import { Type } from './Type'

export type Element = {
    bounds: Bounds
    geometry: Geometry[]
    id: number
    nodes: Node[]
    tags: Tags
    type: Type
    lat?: number
    lon?: number
}
