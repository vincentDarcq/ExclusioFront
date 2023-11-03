export enum GenresSimples {
    ANIMATION = 1,
    BIOPIC,
    COMEDIE,
    DOCUMENTAIRE,
    DRAME,
    HISTOIRE,
    THRILLER,
    EPOUVANTE_HORREUR,
    SCIENCE_FICTION,
    AVENTURE,
    JEUNESSE,
    ACTION,
    ROMANCE,
    FANTASY,
}

export interface GenresSimplesModel {
    ANIMATION: string,
    BIOPIC:  string,
    COMEDIE: string,
    DOCUMENTAIRE: string,
    DRAME: string,
    HISTOIRE: string,
    THRILLER: string,
    EPOUVANTE_HORREUR: string,
    SCIENCE_FICTION: string,
    AVENTURE: string,
    JEUNESSE: string,
    ACTION: string,
    Romance: string,
    FANTASY: string,
}

export const genresSimples: GenresSimplesModel = {
    ANIMATION: "Animation",
    BIOPIC:  "Biopic",
    COMEDIE: "Comédie",
    DOCUMENTAIRE: "Documentaire",
    DRAME: "Drame",
    HISTOIRE: "Historique",
    THRILLER: "Thriller",
    EPOUVANTE_HORREUR: "Epouvante-horreur",
    SCIENCE_FICTION: "Science Fiction",
    AVENTURE: "Aventure",
    JEUNESSE: "Jeunesse",
    ACTION: "Action",
    Romance: "Romance",
    FANTASY: "Fantastique",
}

export const genresAvances = [
    "FRANCAIS",
    "MUSICAL",
    "GUERRE",
    "POLICIER",
    "SUPER_HEROS",
]