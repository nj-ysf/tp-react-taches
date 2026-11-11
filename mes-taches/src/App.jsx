
import { useState } from 'react'

import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'

// Données initiales
const TACHES_INITIALES = [
  {
    id: 1,
    titre: 'Installer Node.js et Vite',
    terminee: true
  },
  {
    id: 2,
    titre: 'Comprendre les composants',
    terminee: true
  },
  {
    id: 3,
    titre: 'Passer des données avec les props',
    terminee: false
  },
  {
    id: 4,
    titre: "Gérer l'état avec useState",
    terminee: false
  },
]

function App() {

  // État des tâches
  const [taches, setTaches] = useState(TACHES_INITIALES)

  // État du filtre
  const [filtre, setFiltre] = useState('toutes')

  // Ajouter une tâche
  function ajouterTache(titre) {
    setTaches((anciennesTaches) => [
      ...anciennesTaches,
      {
        id: Date.now(),
        titre: titre,
        terminee: false
      }
    ])
  }

  // Cocher ou décocher une tâche
  function basculerTache(id) {
    setTaches(
      (anciennesTaches) =>
        anciennesTaches.map((tache) =>
          tache.id === id
            ? { ...tache, terminee: !tache.terminee }
            : tache
        )
    )
  }

  // Supprimer une tâche
  function supprimerTache(id) {
    setTaches(
      (anciennesTaches) =>
        anciennesTaches.filter((tache) => tache.id !== id)
    )
  }

  // Calculer les tâches visibles selon le filtre
  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') {
      return !tache.terminee
    }

    if (filtre === 'terminees') {
      return tache.terminee
    }

    return true
  })

  return (
    <div className="app">

      <Entete
        titre="Mes tâches"
        sousTitre="Mon premier projet React"
      />

      {/* Compteur */}
      <Carte titre="Compteur">
        <Compteur />
      </Carte>

      {/* Formulaire d'ajout */}
      <Carte titre="Nouvelle tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>

      {/* Liste et filtres */}
      <Carte titre="Ma liste">

        <Filtres
          filtre={filtre}
          onChanger={setFiltre}
        />

        <ListeTaches
          taches={tachesVisibles}
          onBasculer={basculerTache}
          onSupprimer={supprimerTache}
        />

      </Carte>

      {/* Statistiques */}
      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>

      <Pied auteur="Youssef Naji" />

    </div>
  )
}

export default App
