export interface Graduated {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    gender: string;
    imageUrl: string;
    linkedinUrl: string;
    jobTitle: string;
    graduationYearFromBachelor: string;
    graduationYearFromMaster: string;
    graduationYearFromOrkSpecialist: string;
    works: {
        id: number;
        company: string;
        position: string;
        startWork: string;
        endWork: string;
        graduatedId: number;
      };
    created: string;
    updated: string;
}