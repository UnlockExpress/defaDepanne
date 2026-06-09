import { useState, useEffect, useMemo } from 'react'
import WhoWin from './WhoWin.js'

function generateBoard(manyCase) {
    const result = []
    for (let i = 0; i < manyCase; i++) {
        result.push({ value: 0, id: i + 1 })
    }
    return result
}

export function Board({ onCurrentPlayerChange, currentPlayer, manyCase, winnerState }) {
    const [board, setBoard] = useState(() => generateBoard(manyCase))

    // Réinitialise le plateau si le nombre de cases change
    useEffect(() => {
        setBoard(generateBoard(manyCase))
    }, [manyCase])
    
    // Calcul du gagnant
    const winner = useMemo(() => {
        const res = WhoWin(board, currentPlayer);
        // AJOUTE CE LOG POUR VERIFIER : Si "res" affiche un objet {} au lieu de "X" ou "O", 
        // c'est ton fichier WhoWin.js qu'il faut corriger.
        console.log("Résultat de WhoWin :", res); 
        return res;
    }, [board, currentPlayer])

    // Effet quand un joueur gagne
    useEffect(() => {
        // Assure-toi que winner est bien une string primitive ('X' ou 'O')
        if (winner === 'X' || winner === 'O') {
            setBoard((prev) => prev.map((current) => current.value === 0 ?
                { ...current, value: null } : current 
            ))
            winnerState(winner)
        }
    }, [winner, winnerState])
    
    function handleCaseClick(isfilled, position) {
        // On ne peut cliquer que si la case est vide ET qu'il n'y a pas encore de gagnant
        if (!isfilled && winner !== 'X' && winner !== 'O') {
            setBoard((prev) => prev.map((current) => current.id === position ?
                { ...current, value: currentPlayer } :
                current
            ))
            // On passe la main au joueur suivant
            onCurrentPlayerChange(currentPlayer === 'X' ? 'O' : 'X')
        }
    }

    // Composant Case interne (déclaré simplement pour le rendu)
    function Case({ isfilled, position, value }) {
        return (
            <button 
                role="button" 
                tabIndex={0}
                className={`bg-base-100 w-20 h-20 text-4xl font-bold rounded-lg ${isfilled ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center justify-center`}
                onClick={() => handleCaseClick(isfilled, position)}
            >
                {value === 0 || value === null ? '' : value}
            </button>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4">
                {board.map((row) => (
                    <Case isfilled={row.value !== 0} value={row.value} position={row.id} key={row.id} />
                ))}
            </div>
        </div>
    )
}