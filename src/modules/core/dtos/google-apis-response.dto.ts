export default interface GoogleApisResponseDto<TItem> {
    kind: string;
    totalItems: number;
    items: TItem[];
}