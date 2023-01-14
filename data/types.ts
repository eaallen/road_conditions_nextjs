export interface RoadImage {
    name: string
    imgSrc: string
    isSign?: boolean
    commonName?: string
}

export interface Route {
    roadImages: RoadImage[]
    name: string
}

export type Destination = string