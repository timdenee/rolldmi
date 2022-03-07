import axios from 'axios'
import { API_FQDN } from './constants'
import { DicePool, HarmTagType } from './contests'

export interface Strife {
    strifeLevel: number
    dicePool: DicePool
    harmTags: HarmTagType[]
    targetNumber: number | undefined
}

export const update = async (gameId: string, contestId: string, strife: Strife): Promise<Strife> => {
    const timestamp = new Date().toISOString()
    const response = await axios.put(`${API_FQDN}/api/games/${gameId}/contests/${contestId}/strife`, { ...strife, timestamp })
    return response.data
}
