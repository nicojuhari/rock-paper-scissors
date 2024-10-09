const playerId = ref('')

export const usePlayer = () => {

    const createPlayerId = () => {
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        const newUserId = head + tail
        localStorage.setItem('rps-player-id', newUserId)
        playerId.value = newUserId
    }

    //check if we are in browser

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        //create unique id for the user, if not exist
        playerId.value = localStorage.getItem('rps-player-id') || ''

        if (!playerId.value) {
        //without crypto, just use a random number and date
            createPlayerId()
        }
    }
    

    return {
        playerId,
        createPlayerId,
    }
}