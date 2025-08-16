export interface BlogFilters {
    category?: string | null;
    tag?: string | null;
    author?: string | null;
    search?: string | null;
    dateFrom?: string | null;
    dateTo?: string | null;
    featured?: boolean | null;
}