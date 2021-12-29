export type CustomLink = {
    id: number
    text: string | JSX.Element
    link: string
    external: boolean
}

export type ParticipateItem = {
    id: number
    text: string | JSX.Element
}

export type Presale = 'unstarted' | 'progress' | 'over'
