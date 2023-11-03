export class Movie {

    id: number;
    titre: string;
    synopsis: string;
    genres: string;
    genre: Array<string>;
    casting: string;
    realisateur: string;
    covPortrait: string;
    covPaysage: string;
    year: number;
    pegi: string;
    avertissement: string;
    time: string;
    grade: Number;
    alloGrade: Number;
    imdbGrade: Number

    constructor(titre?: string, synopsis?: string, genres?: string, casting?: string,
        realisateur?: string, covPortrait?: string, covPaysage?: string,
        time?: string, year?: number, pegi?: string, avertissement?: string, id?: number,
        grade?: Number, alloGrade?: Number, imdbGrade?: Number) {

        this.titre = titre;
        this.synopsis = synopsis;
        this.id = id;
        this.genres = genres;
        this.casting = casting;
        this.realisateur = realisateur;
        this.covPortrait = covPortrait;
        this.covPaysage = covPaysage;
        this.time = time;
        this.year = year;
        this.pegi = pegi;
        this.avertissement = avertissement;
        this.grade = grade;
        this.alloGrade = alloGrade;
        this.imdbGrade = imdbGrade;
    }
}