import React, { createContext, useContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
const NotificationContext = createContext();

const Alert = forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      sx={{
        position: "fixed",
        top: "5rem",
        right: "1rem",
        zIndex: 9999,
      }}
      {...props}
    />
  );
});

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, severity = "info") => {
    setNotification({ message, severity });
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, closeNotification }}
    >
      {children}
      {notification && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={closeNotification}
        >
          <Alert onClose={closeNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
