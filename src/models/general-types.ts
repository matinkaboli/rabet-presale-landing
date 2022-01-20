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

export interface AssetType {
    asset_type: string,
    asset_code: string,
    asset_issuer: string,
}

export type Presale = 'unstarted' | 'progress' | 'over';

export interface TransactionType {
    Hash: string,
    Amount: number,
    UpdatedAt: string
}

export interface AccountType {
    Address: string,
    Amount: number,
}

export interface DashboardAPI {
    account: AccountType,
    transactions: TransactionType[],
}
