
import { useEffect, useState } from 'react'

function Horloge() {
  const [maintenant, setMaintenant] = useState(() => new Date())

  useEffect(() => {
    // Démarrer un intervalle de 1 seconde
    const intervalle = setInterval(() => {
      setMaintenant(new Date())
    }, 1000)

    // Nettoyer l'intervalle
    return () => {
      clearInterval(intervalle)
    }
  }, [])

  return (
    <p className="horloge">
      {maintenant.toLocaleTimeString('fr-FR')}
    </p>
  )
}

export default Horloge
