import { Category } from '../models/category.model';

export const CATEGORIES: Category[] = [
    {
        title: 'all',
        value: '',
        icon: 'call'
    },
    {
        title: 'incoming',
        value: 'in',
        icon: 'call_received'
    },
    {
        title: 'outgoing',
        value: 'out',
        icon: 'call_made'
    }
];
