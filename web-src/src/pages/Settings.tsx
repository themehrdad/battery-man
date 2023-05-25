import {useState} from "react";
import {useQueryString} from "../hooks/useQueryString";
export default function Settings() {
    const qs = useQueryString();
    const json = qs.data as any || "{}";
    const data = JSON.parse(json);
    const [ip, setIp] = useState<string>(data.ip);

    const save = () => {
        const w = window as any;
        w.electron.invoke("save-settings", {ip});
    }

    return (
        <div className="Settings p-3">
            <div>
                <h1>Settings</h1>
            </div>
            <div className={"pb-3"}>
                <p>Power plug IP address:</p>
                <input
                    className={"form-control w-100"}
                    type={"text"}
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                />
            </div>
            <div>
                <button className={"btn btn-primary"} onClick={save}>Save</button>
            </div>
        </div>
    );
}