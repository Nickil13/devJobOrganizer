export interface Application {
    _id?: number;
    name: string;
    position: string;
    date: string;
    location: {
        city: string;
        province: string;
        address?: string;
        postalCode?: string;
        remote: boolean;
    };
    stack: string[];
    stage: string;
    listingURL: string;
    websiteURL: string;
    notes?: string[];
}
