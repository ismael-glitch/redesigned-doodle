from pathlib import Path

import pandas as pd


def main() -> None:
    """Charge le fichier Excel, filtre les données validées et sauvegarde le résultat."""
    dossier = Path(__file__).resolve().parent
    fichier_entree = dossier / "mon_fichier.xlsx"
    fichier_sortie = dossier / "resultat.xlsx"

    if not fichier_entree.is_file():
        print(f"Erreur : le fichier introuvable : {fichier_entree}")
        return

    try:
        # sheet_name=0 charge automatiquement la première feuille du classeur.
        donnees = pd.read_excel(fichier_entree, sheet_name=0)

        print("Noms des colonnes :", list(donnees.columns))
        print("\nCinq premières lignes :")
        print(donnees.head())

        if "Statut" not in donnees.columns:
            print("Erreur : la colonne « Statut » est absente du fichier.")
            return

        # Conserve uniquement les lignes dont le statut est exactement « Validé ».
        resultat = donnees.loc[donnees["Statut"] == "Validé"].copy()

        resultat.to_excel(fichier_sortie, index=False)
        print(f"\nRésultat sauvegardé dans : {fichier_sortie}")

    except (FileNotFoundError, pd.errors.EmptyDataError) as erreur:
        print(f"Erreur de fichier : {erreur}")
    except ImportError:
        print("Erreur : installez les dépendances avec « pip install pandas openpyxl ».")
    except Exception as erreur:
        print(f"Erreur inattendue : {erreur}")


if __name__ == "__main__":
    main()