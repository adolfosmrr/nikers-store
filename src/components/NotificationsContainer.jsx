import { useState, useEffect } from "react";
import NotificationItem from "./NotificationItem";

function NotificationsContainer({ notifications, removeGlobalNotification }) {

    return (

        <div className="w-full h-full fixed z-999999999999 pointer-events-none">
            <div className="notifications__wrapper w-fit h-auto absolute bottom-0 right-0 pr-10 pb-10">

                {
                    notifications.map((notif, index) => {
                        return (
                            <NotificationItem
                                key={notif.id}
                                id={notif.id}
                                shoesImage={notif.shoesImage}
                                newShoesTitle={notif.newShoesTitle}
                                onDismiss={removeGlobalNotification}
                            />
                        )
                    })
                }

            </div>
        </div>

    )
}

export default NotificationsContainer;