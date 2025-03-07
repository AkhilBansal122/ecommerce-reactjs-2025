const HandleError = error => {
    if (error?.message === "Unauthorized please login again!" || error?.message === "Unauthorized" || error?.message==='Token is invalid or expired') {
        localStorage.removeItem("security_data");
        // toast.error(error.message)
        setTimeout(() => {
            window.location.href = "/"
        }, 700);
    }
};

export default HandleError;