import { Menu } from 'electron';
import { Application } from "./Application";
export declare class TrayMenu {
    private application;
    private menu?;
    constructor(application: Application);
    get Menu(): Menu | undefined;
    init(): void;
}
