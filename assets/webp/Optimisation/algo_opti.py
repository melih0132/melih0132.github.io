# Données constantes
prix_vente = {'cuisses_de_poulet': 4.66, 'tranches_de_jambon': 3.75, 'pate_de_porc': 1.83, 'terrines_de_volaille': 2.85, 'mousses_de_canard': 3.86}
cout_matiere_premiere = {'porc': 2.025, 'poulet': 2.97, 'canard': 4.428, 'plastique': 5.319, 'fer': 2.187}
capacites_machines = {'machine_1': 100, 'machine_2': 150, 'machine_3': 120, 'machine_4': 90, 'machine_5': 80}

proportions_matieres_premieres = {
    'cuisses_de_poulet': {'muscles': 0.15, 'chair_poulet': 0.62, 'plastique': 0.23},
    'tranches_de_jambon': {'muscles': 1, 'plastique': 0.407},
    'pate_de_porc': {'chair_porc': 1, 'fer': 0.75},
    'terrines_de_volaille': {'chair_porc': 0.5, 'chair_poulet': 0.15, 'chair_canard': 0.1, 'fer': 0.25},
    'mousses_de_canard': {'chair_porc': 0.4, 'poitral': 0.5, 'chair_canard': 0.1, 'plastique': 0.4}
}

quantites_extrait_matiere_premiere = {
    'cuisses_de_poulet': {'cuisses_de_poulet': 0.512, 'plastique': 0.064},
    'tranches_de_jambon': {'muscles': 0.180, 'plastique': 0.073},
    'pate_de_porc': {'chair_porc': 0.094, 'fer': 0.030},
    'terrines_de_volaille': {'chair_porc': 0.101, 'chair_poulet': 0.030, 'chair_canard': 0.020, 'fer': 0.080},
    'mousses_de_canard': {'chair_porc': 0.080, 'poitral': 0.045, 'chair_canard': 0.040, 'plastique': 0.056}
}

import random

# Fonction pour générer une solution aléatoire
def generer_solution_aleatoire():
    solution = {}
    for produit in prix_vente:
        solution[produit] = random.randint(0, capacites_machines['machine_1'])  # Choix aléatoire des niveaux de production
    return solution

# Fonction pour évaluer une solution
def evaluer_solution(solution):
    chiffre_affaires = 0
    for produit, quantite in solution.items():
        chiffre_affaires += quantite * prix_vente[produit]  # Calcul du chiffre d'affaires pour chaque produit
        for matiere, proportion in proportions_matieres_premieres[produit].items():
            quantite_matiere = quantite * proportion
            chiffre_affaires -= quantite_matiere * cout_matiere_premiere[matiere]  # Déduction des coûts des matières premières
    return chiffre_affaires

# Algorithme d'optimisation
def optimisation():
    meilleure_solution = generer_solution_aleatoire()
    meilleur_benefice = evaluer_solution(meilleure_solution)
    
    critere_arret = False
    while not critere_arret:
        # Modifier la solution actuelle pour essayer d'améliorer le bénéfice
        nouvelle_solution = modifier_solution(meilleure_solution)  # La fonction modifier_solution doit encore être définie
        nouveau_benefice = evaluer_solution(nouvelle_solution)
        
        if nouveau_benefice > meilleur_benefice:
            meilleure_solution = nouvelle_solution
            meilleur_benefice = nouveau_benefice
        else:
            critere_arret = True  # Un exemple de critère d'arrêt, à adapter selon le besoin
    
    return meilleure_solution, meilleur_benefice

# Exécution de l'algorithme
meilleure_solution, meilleur_benefice = optimisation()

# Analyse des résultats
print("Meilleure solution:", meilleure_solution)
print("Meilleur bénéfice:", meilleur_benefice)