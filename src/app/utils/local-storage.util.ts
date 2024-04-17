export class LocalStorageUtil<T> {

    constructor(private readonly key: string) { }

    public save(data: T): void {
        localStorage.setItem(this.key, JSON.stringify(data));
    }

    public get(): T | undefined {
        const dataFromStorage = localStorage.getItem(this.key);

        return dataFromStorage
            ? JSON.parse(dataFromStorage) as T
            : undefined;
    }

    public clear(): void {
        localStorage.removeItem(this.key);
    }
}
