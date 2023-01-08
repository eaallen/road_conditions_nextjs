export interface RoadImage {
    name: string
    imgSrc: string
    isSign?: boolean
}

export interface Route {
    roadImages: RoadImage[]
    start: Destination
    end: Destination
    name: string
}

export type Destination = string