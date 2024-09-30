import { useEffect, useRef, useState } from "react";
import { alertService, AlertType } from "../utils/alert";
export { Alert };

const Alert = ({ id = "default-alert", fade = true }) => {
    const mounted = useRef(false);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        mounted.current = true;

        const subscription = alertService.onAlert(id).subscribe((alert) => {
            if (!alert.message) {
                setAlerts((alerts) => {
                    const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

                    return omit(filteredAlerts, "keepAfterRouteChange");
                });
            } else {
                alert.itemId = Math.random();
                setAlerts((alerts) => [...alerts, alert]);

                setTimeout(() => removeAlert(alert), 3000);
            }
        });

        const clearAlerts = () => alertService.clear(id);

        return () => {
            mounted.current = false;

            subscription.unsubscribe();
            clearAlerts;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function omit(arr, key) {
        return arr.map((obj) => {
            const { [key]: omitted, ...rest } = obj;
            return rest;
        });
    }

    function removeAlert(alert) {
        if (!mounted.current) return;

        if (fade) {
            setAlerts((alerts) =>
                alerts.map((x) =>
                    x.itemId === alert.itemId ? { ...x, fade: true } : x
                )
            );

            setTimeout(() => {
                setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
            }, 250);
        } else {
            setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ["alert"];

        const alertTypeClass = {
            [AlertType.Success]: "alert-success",
            [AlertType.Error]: "alert-error",
            [AlertType.Info]: "alert-info",
            [AlertType.Warning]: "alert-warning",
        };

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push("animate-bounce-out");
        }

        return classes.join(" ");
    }

    if (!alerts.length) return null;

    return (
        <div className="transition-all space-y-2">
            {alerts.map((alert, index) => (
                <div
                    role="alert"
                    key={index}
                    className={`flex animate-bounce-in rounded-lg border-gray-900 min-w-80 min-h-12 gap-2 ps-5 justify-between items-center ${cssClasses(
                        alert
                    )}`}
                >
                    <span
                        className="py-2"
                        dangerouslySetInnerHTML={{ __html: alert.message }}
                    ></span>
                    <button
                        className="cursor-pointer aspect-square min-h-12 h-[70%] hover:bg-black/15 transition-colors duration-300 flex items-center justify-center bg-black/10 text-black/80"
                        onClick={() => removeAlert(alert)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
                        </svg>
                    </button>
                </div>
            ))}
        </div>
    );
};
