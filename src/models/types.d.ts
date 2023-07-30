export type Skill = {
    name: string,
    config: {
        [key: string]: number,
    }
}

export type Project = {
    name: string;
    industry?: string;
    link?: string;
    role: string;
    techStack: string[];
    year: number;
    description: string;
}
