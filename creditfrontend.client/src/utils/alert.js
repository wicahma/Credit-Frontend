import { Subject } from "rxjs";
import { filter } from "rxjs/operators";

export const alertService = {
    onAlert,
    success,
    error,
    info,
    warn,
    alert,
    clear,
};

export const AlertType = {
    Success: "Success",
    Error: "Error",
    Info: "Info",
    Warning: "Warning",
};

const alertSubject = new Subject();
const defaultId = "default-alert";

function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter((x) => x && x.id === id));
}

function success(message) {
    alert({ type: AlertType.Success, message });
}

function error(message) {
    alert({ type: AlertType.Error, message });
}

function info(message) {
    alert({ type: AlertType.Info, message });
}

function warn(message) {
    alert({ type: AlertType.Warning, message });
}

function alert(alert) {
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}

function clear(id = defaultId) {
    alertSubject.next({ id });
}
